import { FilterHeader } from "./components/filter-header";
import { PromotionCard } from "./components/promotion-card";
import { usePromotions } from "~/hooks/use-promotions";
import { useNavigate, useSearchParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePromotion } from "~/services/api/actions/promotion/delete";
import { EmptyList } from "./components/empty-list";
import { Promotion } from "~/types/actions/promotion";
import { useToast } from "~/hooks/use-toast";
import { useAuth } from "~/context/auth";

export default function Promotions() {
  const [searchParams] = useSearchParams();
  const { data: promotions } = usePromotions();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const auth = useAuth();

  const deleteMutation = useMutation({
    mutationKey: ["delete-promotion"],
    mutationFn: deletePromotion,
    onMutate: async (id: string) => {
      const previousStores = queryClient.getQueryData(["promotions"]);

      queryClient.setQueryData<Promotion[]>(["promotions"], (oldData) => {
        return oldData ? oldData.filter(p => p.id !== id) : [];
      });

      return { previousStores };
    },
    onError: (_, __, context) => {
      if (context?.previousStores) {
        queryClient.setQueryData(["promotions"], context.previousStores);
      }
      toast({ title: "Erro ao excluir promoção", variant: "destructive" });
    },
    onSuccess: () => {
      toast({ title: "Promoção excluida com sucesso" });
    }
  });

  const finalPromotions = promotions?.filter(promotion => {
    const storeTagParam = searchParams.get("store");
    const categoryParam = searchParams.get("category");
    const queryParam = searchParams.get("q")?.toLocaleLowerCase();

    const matchStore = storeTagParam 
      ? storeTagParam === promotion.store.tag : true;
    const matchCategory = categoryParam
      ? categoryParam === promotion.category.tag : true;
    const matchQuery = queryParam && queryParam?.length > 0 
      ? promotion.title.toLocaleLowerCase().includes(queryParam) : true;

    return matchStore && matchCategory && matchQuery;
  }) || [];

  return (
    <main className="flex w-full flex-col gap-6 container mx-auto px-4 py-8 sm:px-0">
      <FilterHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {finalPromotions.map((promotion) => {
          const belongsToUser = auth?.session?.id === promotion.user.id;
          const isAdmin = auth?.isAdmin ?? false;

          const onEdit = () => navigate(`/editar/promocao/${promotion.id}`);
          const onDelete = () => deleteMutation.mutateAsync(promotion.id);

          return (
            <PromotionCard
              key={promotion.id}
              promotion={promotion}
              onDelete={belongsToUser || isAdmin ? onDelete : undefined}
              onEdit={belongsToUser ? onEdit : undefined}
            />
          );
        })}
      </div>
      {finalPromotions.length === 0 ? (
        <EmptyList
          title="Nenhuma promoção encontrada"
          message="Que tal começar a criar novas promoções?"
        />
      ) : null}
    </main>
  );
}