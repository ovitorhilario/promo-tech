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
import { Store } from "~/types/actions/store"
import { Category } from "~/types/actions/category"
import { createPromotion, CreatePromotionPayload } from "~/services/api/actions/promotion/create"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ErrorEmptyStores } from "~/components/error-empty-stores"
import { FormComboBox } from "~/components/form-combo-box"
import { useToast } from "~/hooks/use-toast"
import { useNavigate } from "react-router"
import { X } from "lucide-react"
import * as z from "zod"

const formSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  price: z.coerce.number().min(0, "O preço deve ser um número positivo"),
  img_url: z.string().url("Deve ser uma URL válida"),
  link_url: z.string().url("Deve ser uma URL válida"),
  category_id: z.string().min(1, "Categoria é obrigatória"),
  store_id: z.string().min(1, "Loja é obrigatória"),
})

interface PromotionFormProps {
  categories: Category[]
  stores: Store[]
}

export default function CreatePromotionForm({ 
  categories, 
  stores 
} : PromotionFormProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<CreatePromotionPayload>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      img_url: "",
      link_url: "",
      category_id: "",
      store_id: ""
    },
  })
  
  const createMutation = useMutation({
    mutationKey: ["create-promotion"],
    mutationFn: createPromotion,
    onSuccess: async () => {
      form.reset();
      toast({ title: "Promoção criada com sucesso" });
      await queryClient.invalidateQueries({ queryKey: ["promotions"] });
      setTimeout(() =>  navigate("/"), 1000);
    }
  })

  async function onSubmit(values: CreatePromotionPayload) {
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
                  placeholder="Digite o título da promoção"
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
                  placeholder="Digite a descrição da promoção"
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  maxLength={12}
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
          name="img_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da Imagem</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Digite a URL da imagem" 
                  maxLength={2048}
                  {...field} 
                />
              </FormControl>
              {field.value ? (
                <div className="relative size-32 rounded-lg border">
                  <Button 
                    onClick={() => field.onChange("")} 
                    className="rounded-full bg-red-50 p-0 size-8 absolute -right-10 top-0"
                    variant="destructive"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  <img 
                    src={field.value} 
                    alt="Preview" 
                    className="object-cover rounded-lg size-full" 
                  />
                </div>
              ) : null}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Categoria</FormLabel>
              <FormComboBox 
                items={categories.map((category) => ({ value: category.id, label: category.name }))}
                setValue={(value) => form.setValue("category_id", value)}
                value={field.value}
              />
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
                value={field.value}
                setValue={(value) => form.setValue("store_id", value)}
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
          {createMutation.isPending ? "Criando..." : "Criar Promoção"}
        </Button>
      </form>
    </Form>
  )
}