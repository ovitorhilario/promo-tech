import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Navigate, useParams } from "react-router";
import EditCouponForm from "./components/edit-form";
import { useCoupons } from "~/hooks/use-coupons";
import { useStores } from "~/hooks/use-stores";

export default function EditCoupon() {
  const { data: stores } = useStores();
  const { data: coupons } = useCoupons();

  const params = useParams();
  const targetCoupon = coupons?.find((p) => p.id === params.slug);

  if (!targetCoupon) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-full flex flex-col">
      <Card className="w-full max-w-2xl mx-auto my-12">
        <CardHeader>
          <CardTitle>Editar Cupom</CardTitle>
          <CardDescription>Preencha todos os campos abaixo.</CardDescription>
        </CardHeader>
        <CardContent>
          <EditCouponForm
            coupon={targetCoupon}
            stores={stores || []}
          />
        </CardContent>
      </Card>
    </div>
  );
}