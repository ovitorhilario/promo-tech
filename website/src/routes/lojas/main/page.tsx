import { FilterHeader } from "./components/filter-header";
import { StoreCard } from "./components/store-card";
import { useStores } from "~/hooks/use-stores";
import { useSearchParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStore } from "~/services/api/actions/store/delete";
import { Store } from "~/types/actions/store";
import { useToast } from "~/hooks/use-toast";
import { useAuth } from "~/context/auth";
import { EmptyList } from "./components/empty-list";

export default function Stores() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { data: stores } = useStores();
  const { toast } = useToast();
  const auth = useAuth();

  const deleteMutation = useMutation({
    mutationKey: ["delete-store"],
    mutationFn: deleteStore,
    onMutate: async (id: string) => {
      const previousStores = queryClient.getQueryData(["stores"]);

      queryClient.setQueryData<Store[]>(["stores"], (oldData) => {
        return oldData ? oldData.filter(store => store.id !== id) : [];
      });

      return { previousStores };
    },
    onError: (_, __, context) => {
      if (context?.previousStores) {
        queryClient.setQueryData(["stores"], context.previousStores);
      }
      toast({ title: "Erro ao excluir loja", variant: "destructive" });
    },
    onSuccess: () => {
      toast({ title: "Loja excluída com sucesso" });

      // revalida, pois a loja excluída pode estar em promoções ou cupons
      queryClient.invalidateQueries({ queryKey: ["promotions", "coupons"] });
    }
  });

  const finalStores = stores?.filter(store => {
    const queryParam = searchParams.get("q")?.toLocaleLowerCase();
    const matchQuery = queryParam && queryParam?.length > 0 
      ? store.name.toLocaleLowerCase().includes(queryParam) : true;

    return matchQuery;
  }) || [];

  return (
    <main className="flex w-full flex-col gap-6 container mx-auto px-4 py-8 sm:px-0">
      <FilterHeader 
        userIsAdmin={auth?.isAdmin ?? false}	
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {finalStores.map((store) => (
          <StoreCard 
            key={store.id} 
            store={store}
            userIsAdmin={auth?.isAdmin ?? false}
            onDelete={() => deleteMutation.mutateAsync(store.id)}
          />
        ))}
      </div>
      {finalStores.length === 0 ? (
        <EmptyList 
          title="Nenhuma loja encontrada"
          message="Você pode começar criando uma nova loja"
        />
      ) : null}
    </main>
  );
}