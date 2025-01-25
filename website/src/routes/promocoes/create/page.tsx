import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import CreatePromotionForm from "./components/create-form";
import { useCategories } from "~/hooks/use-categories";
import { useStores } from "~/hooks/use-stores";

export default function CreatePromotion() {
  const { data: stores } = useStores();
  const { data: categories } = useCategories();

  return (
    <div className="w-full flex flex-col">
      <Card className="w-full max-w-2xl mx-auto my-12">
        <CardHeader>
          <CardTitle>Criar nova promoção</CardTitle>
          <CardDescription>Preencha todos os campos abaixo.</CardDescription>
        </CardHeader>
        <CardContent>
          <CreatePromotionForm 
            categories={categories || []} 
            stores={stores || []}
          />
        </CardContent>
      </Card>
    </div>
  );
}