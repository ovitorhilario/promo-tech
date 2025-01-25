import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import { register } from '~/services/api/actions/auth/register'
import { useToast } from '~/hooks/use-toast'
import { Link, Navigate, useNavigate } from 'react-router'
import { useAuth } from '~/context/auth'
import * as z from 'zod'

const formSchema = z.object({
  username: z.string().min(4, { message: "Usuário inválido" }),
  fullName: z.string().min(4, { message: "Nome inválido" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(4, { message: "A senha deve ter pelo menos 4 caracteres" }),
})

export default function SignUp() {
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
      fullName: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await register({ 
        username: values.username,
        full_name: values.fullName,
        email: values.email,
        password: values.password,
      });
      toast({
        title: "Conta criada com sucesso",
        description: "você será redirecionado para a página de login",
      });

      setTimeout(() => {
        navigate('/sign-in', { replace: true });
      }, 1500);
    } catch (_) {
      toast({
        title: "Erro ao criar conta",
        description: "Tente outro usuário.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Cadastro</CardTitle>
          <CardDescription>Digite suas credenciais para criar uma conta</CardDescription>
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
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Digite seu email" {...field} />
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
                {form.formState.isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link to="/sign-in" className="text-blue-600 hover:underline">
              Faça login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}