import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import CreateStoreForm from "./components/create-form";

export default function CreateStore() {

  return (
    <div className="w-full flex flex-col">
      <Card className="w-full max-w-2xl mx-auto my-12">
        <CardHeader>
          <CardTitle>Criar nova Loja</CardTitle>
          <CardDescription>Preencha todos os campos abaixo.</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateStoreForm />
        </CardContent>
      </Card>
    </div>
  );
}