import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "~/components/ui/select"
import { FormComboBox } from "~/components/form-combo-box"
import { updateCoupon } from "~/services/api/actions/coupon/update"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Coupon } from "~/types/actions/coupon"
import { Store } from "~/types/actions/store"
import { useToast } from "~/hooks/use-toast"
import { useNavigate } from "react-router"
import * as z from "zod"

const formSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  code: z.string().min(1, "Código é obrigatório"),
  link_url: z.string().url("Deve ser uma URL válida"),
  store_id: z.string().min(1, "Loja é obrigatória"),
  is_expired: z.enum(["yes", "no"])
})
type FormSchemaType = z.infer<typeof formSchema>

interface EditCouponFormProps {
  coupon: Coupon;
  stores: Store[]
}

export default function EditCouponForm({
  coupon,
  stores 
} : EditCouponFormProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: coupon.title,
      description: coupon.description,
      code: coupon.code,
      is_expired: "no",
      link_url: coupon.link_url,
      store_id: coupon.store.id
    },
  })
  
  const updateMutation = useMutation({
    mutationKey: ["update-coupon"],
    mutationFn: updateCoupon,
    onSuccess: async () => {
      form.reset();
      toast({ title: "Cupom atualizado com sucesso" });
      await queryClient.invalidateQueries({ queryKey: ["coupons"] });
      setTimeout(() =>  navigate("/cupons"), 1000);
    },
    onError: () => {
      toast({ title: "Erro ao atualizar cupom", variant: "destructive" });
    }
  })

  async function onSubmit(values: FormSchemaType) {
    updateMutation.mutateAsync({ 
      id: coupon.id,
      payload: {
        ...values,
        is_expired: values.is_expired === "yes" ? true : false
      } 
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Digite o título do cupom"
                  maxLength={256} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Digite a descrição do cupom"
                  maxLength={512}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código/Voucher</FormLabel>
              <FormControl>
                <Input 
                  maxLength={100}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_expired"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cupom Expirado?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione se o cupom já expirou" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="yes">Sim</SelectItem>
                  <SelectItem value="no">Não</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL do Link</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Digite a URL do link"
                  maxLength={2048}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="store_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Loja</FormLabel>
              <FormComboBox
                items={stores.map((store) => ({ value: store.id, label: store.name }))}
                setValue={(value) => form.setValue("store_id", value)}
                value={field.value}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          disabled={updateMutation.isPending} 
          className="w-full"
        >
          {updateMutation.isPending ? "Editando..." : "Editar Cupom"}
        </Button>
      </form>
    </Form>
  )
}