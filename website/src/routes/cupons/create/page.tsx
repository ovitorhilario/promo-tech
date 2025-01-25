import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import CreatePromotionForm from "./components/create-form";
import { useStores } from "~/hooks/use-stores";

export default function CreateCoupon() {
  const { data: stores } = useStores();

  return (
    <div className="w-full flex flex-col">
      <Card className="w-full max-w-2xl mx-auto my-12">
        <CardHeader>
          <CardTitle>Criar novo Cupom</CardTitle>
          <CardDescription>Preencha todos os campos abaixo.</CardDescription>
        </CardHeader>
        <CardContent>
          <CreatePromotionForm 
            stores={stores || []}
          />
        </CardContent>
      </Card>
    </div>
  );
}