import { Navigate, useParams } from "react-router";
import EditPromotionForm from "./components/update-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { usePromotions } from "~/hooks/use-promotions";
import { useCategories } from "~/hooks/use-categories";
import { useStores } from "~/hooks/use-stores";

export default function EditPromotion() {
  const { data: stores } = useStores();
  const { data: categories } = useCategories();
  const { data: promotions } = usePromotions();

  const params = useParams();
  const targetPromotion = promotions?.find((p) => p.id === params.slug);
 
  if (!targetPromotion) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-full flex flex-col">
      <Card className="w-full max-w-2xl mx-auto my-12">
        <CardHeader>
          <CardTitle>Editar promoção</CardTitle>
          <CardDescription>Preencha todos os campos abaixo.</CardDescription>
        </CardHeader>
        <CardContent>
          <EditPromotionForm
            promotion={targetPromotion}
            categories={categories || []} 
            stores={stores || []}
          />
        </CardContent>
      </Card>
    </div>
  );
}