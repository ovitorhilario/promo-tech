import { CouponCard } from "./components/coupon-card";
import { FilterHeader } from "./components/filter-header";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import { deleteCoupon } from "~/services/api/actions/coupon/delete";
import { useToast } from "~/hooks/use-toast";
import { useCoupons } from "~/hooks/use-coupons";
import { Coupon } from "~/types/actions/coupon";
import { useAuth } from "~/context/auth";
import { EmptyList } from "./components/empty-list";

export default function Coupons() {
  const [searchParams] = useSearchParams();
  const { data: coupons } = useCoupons();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const auth = useAuth();

  const deleteMutation = useMutation({
    mutationKey: ["delete-coupon"],
    mutationFn: deleteCoupon,
    onMutate: async (id: string) => {
      const previousStores = queryClient.getQueryData(["coupons"]);

      queryClient.setQueryData<Coupon[]>(["coupons"], (oldData) => {
        return oldData ? oldData.filter(coupon => coupon.id !== id) : [];
      });
      return { previousStores };
    },
    onError: (_, __, context) => {
      if (context?.previousStores) {
        queryClient.setQueryData(["coupon"], context.previousStores);
      }
      toast({ 
        title: "Erro ao excluir cupom", 
        variant: "destructive" 
      });
    },
    onSuccess: () => {
      toast({ title: "Cupom excluído com sucesso" });
    }
  });

  const finalCoupons = coupons?.filter(coupon => {
    const storeTagParam = searchParams.get("store");
    const queryParam = searchParams.get("q")?.toLocaleLowerCase();
    
    const matchStore = storeTagParam 
      ? storeTagParam === coupon.store.tag : true;
    const matchQuery = queryParam && queryParam?.length > 0 
      ? coupon.title.toLocaleLowerCase().includes(queryParam) : true;

    return matchStore && matchQuery;
  }) || [];

  return (
    <main className="flex w-full flex-col gap-6 container mx-auto px-4 py-8 sm:px-0">
      <FilterHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {finalCoupons.map((coupon) => {
          const belongsToUser = coupon.user.id === auth?.session?.id;
          const isAdmin = auth?.isAdmin ?? false;
          
          const callbackDelete = () => {
            deleteMutation.mutateAsync(coupon.id);
          }
          const callbackEdit = () => {
            navigate(`/editar/cupom/${coupon.id}`);
          }

          return (
            <CouponCard 
              key={coupon.id}
              coupon={coupon}
              onEdit={belongsToUser ? callbackEdit : undefined}
              onDelete={belongsToUser || isAdmin ? callbackDelete : undefined}
            />
          );
        })}
      </div>
      {finalCoupons.length === 0 ? (
        <EmptyList 
          title="Nenhum cupom encontrado"
          message="Você pode começar criando um novo cupom"
        />
      ) : null}
    </main>
  );
}