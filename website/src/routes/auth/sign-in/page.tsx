import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import { Navigate, useNavigate } from 'react-router'
import { useToast } from '~/hooks/use-toast'
import { useAuth } from '~/context/auth'
import * as z from 'zod'

const formSchema = z.object({
  username: z.string().min(4, { message: "Usuário inválido" }),
  password: z.string().min(4, { message: "A senha deve ter pelo menos 4 caracteres" }),
})

export default function SignIn() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { toast } = useToast();

  if (!!auth?.token) {
    return <Navigate to="/" replace />;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await auth?.login({ ...values });
      navigate('/', { replace: true })
    } catch (_) {
      toast({ 
        title: "Erro ao fazer login",
         description: "Usuário ou senha inválidos", 
         variant: "destructive" 
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Digite suas credenciais para acessar sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuário</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu usuário" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Digite sua senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <a href="/sign-up" className="text-blue-600 hover:underline">
              Cadastre-se
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}