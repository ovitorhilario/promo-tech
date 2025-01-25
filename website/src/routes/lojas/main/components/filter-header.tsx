import { CirclePlus } from "lucide-react";
import { useSearchParams } from "react-router";
import { ProtectedRouteTrigger } from "~/components/protected-route-button";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export interface FilterHeaderProps {
  userIsAdmin?: boolean;
}

export function FilterHeader({ userIsAdmin }: FilterHeaderProps) {
  const [searchParams, setSearchParams] = useSearchParams();

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
      {userIsAdmin ? (
        <ProtectedRouteTrigger path="/criar/loja">
          <Button className="gap-4">
            Criar loja
            <CirclePlus className="h-5 w-5" />
          </Button>
        </ProtectedRouteTrigger>
      ) :  null}
    </div>
  );
}