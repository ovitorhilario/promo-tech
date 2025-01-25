import { CirclePlus, ShoppingBag } from "lucide-react";
import { useSearchParams } from "react-router";
import { ProtectedRouteTrigger } from "~/components/protected-route-button";
import { Combobox } from "~/components/combo-box";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useCategories } from "~/hooks/use-categories";
import { useStores } from "~/hooks/use-stores";

export function FilterHeader() {
  const [searchParams, setSearchParams] = useSearchParams();
  const stores = useStores();
  const categories = useCategories();

  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="flex w-full gap-4 flex-wrap flex-col items-stretch md:flex-row md:items-center">
      <Input
        placeholder="O que você está procurando?"
        className="w-auto sm:min-w-[400px] sm:flex-grow xl:flex-grow-0"
        value={searchParams.get("q") || ""}
        onChange={(e) => updateSearchParams("q", e.target.value)}
      />
      <Combobox
        items={categories?.data?.map(c => ({ value: c.tag, label: c.name })) || []}
        setValue={(value) => updateSearchParams("category", value)}
        value={searchParams.get("category") || ""}
        placeholder="Categoria"
      />
      {stores?.data && stores?.data?.length > 0 ? (
        <Combobox 
          items={stores?.data?.map(c => ({ value: c.tag, label: c.name })) || []}
          setValue={(value) => updateSearchParams("store", value)}
          value={searchParams.get("store") || ""}
          placeholder="Loja"
        />
      ) : (
        <ProtectedRouteTrigger path="/criar/loja">
          <Button 
            className="gap-4"
            variant="secondary"
          >
            Criar loja
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </ProtectedRouteTrigger>
      )}
      <ProtectedRouteTrigger path="/criar/promocao">
        <Button className="gap-4 w-full md:w-auto">
          Criar promoção
          <CirclePlus className="h-5 w-5" />
        </Button>
      </ProtectedRouteTrigger>
    </div>
  );
}