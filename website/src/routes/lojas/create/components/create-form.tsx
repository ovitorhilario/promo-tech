import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createStore, CreateStorePayload } from "~/services/api/actions/store/create"
import { useToast } from "~/hooks/use-toast"
import { useNavigate } from "react-router"
import { X } from "lucide-react"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  description: z.string().nonempty("Descrição é obrigatório"),
  img_url: z.string().url("URL da imagem inválida"),
  link_url: z.string().url("URL do link inválida"),
  tag: z.string().nonempty("Tag é obrigatório"),
})

export default function CreateStoreForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<CreateStorePayload>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      img_url: "",
      link_url: "",
      tag: "",
    },
  })
  
  const createMutation = useMutation({
    mutationKey: ["create-store"],
    mutationFn: createStore,
    onSuccess: async () => {
      form.reset();
      toast({ title: "Loja criada com sucesso" });
      await queryClient.invalidateQueries({ queryKey: ["stores"] });
      setTimeout(() =>  navigate("/lojas"), 1000);
    }
  })

  async function onSubmit(values: CreateStorePayload) {
    createMutation.mutateAsync(values);
  }

  function formatToSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Digite o nome da loja"
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Digite a descrição da loja"
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
          name="link_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL do link da loja</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Digite a URL do link da loja"
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
              <FormLabel>URL da imagem</FormLabel>
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
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug da loja</FormLabel>
              <FormControl>
                <Input 
                  placeholder="ex. loja-do-jose"
                  maxLength={256}
                  {...field} 
                  onChange={(e) => field.onChange(formatToSlug(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          disabled={createMutation.isPending} 
          className="w-full"
        >
          {createMutation.isPending ? "Criando..." : "Criar Loja"}
        </Button>
      </form>
    </Form>
  )
}