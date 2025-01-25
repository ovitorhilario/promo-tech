import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ErrorEmptyStores } from "~/components/error-empty-stores"
import { FormComboBox } from "~/components/form-combo-box"
import { Textarea } from "~/components/ui/textarea"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Store } from "~/types/actions/store"
import { createCoupon, CreateCouponPayload } from "~/services/api/actions/coupon/create"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "~/hooks/use-toast"
import { useNavigate } from "react-router"
import * as z from "zod"

const formSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  code: z.string().min(1, "Código é obrigatório"),
  link_url: z.string().url("Deve ser uma URL válida"),
  store_id: z.string().min(1, "Loja é obrigatória"),
})

interface CreateCouponFormProps {
  stores: Store[]
}

export default function CreateCouponForm({
  stores 
} : CreateCouponFormProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<CreateCouponPayload>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      code: "",
      link_url: "",
      store_id: ""
    },
  })
  
  const createMutation = useMutation({
    mutationKey: ["create-coupon"],
    mutationFn: createCoupon,
    onSuccess: async () => {
      form.reset();
      toast({ title: "Cupom criada com sucesso" });
      await queryClient.invalidateQueries({ queryKey: ["coupons"] });
      setTimeout(() =>  navigate("/cupons"), 1000);
    }
  })

  async function onSubmit(values: CreateCouponPayload) {
    createMutation.mutateAsync(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {stores.length === 0 ? (
          <ErrorEmptyStores />
        ) : null}
        
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
          disabled={createMutation.isPending || stores.length === 0} 
          className="w-full"
        >
          {createMutation.isPending ? "Criando..." : "Criar Cupom"}
        </Button>
      </form>
    </Form>
  )
}