import { Navigate, useParams } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import EditStoreForm from "./components/edit-form";
import { useStores } from "~/hooks/use-stores";

export default function EditStore() {
  const params = useParams();
  const { data: stores } = useStores();
  const targetStore = stores?.find((store) => store.tag === params.slug);

  if (!targetStore) {
    return <Navigate to="/lojas" replace={true} />;
  }

  return (
    <div className="w-full flex flex-col">
      <Card className="w-full max-w-2xl mx-auto my-12">
        <CardHeader>
          <CardTitle>Editar Loja</CardTitle>
          <CardDescription>Preencha todos os campos abaixo.</CardDescription>
        </CardHeader>
        <CardContent>
          <EditStoreForm 
            store={targetStore}
          />
        </CardContent>
      </Card>
    </div>
  );
}