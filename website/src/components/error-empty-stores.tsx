import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function ErrorEmptyStores() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Erro</AlertTitle>
      <AlertDescription>
        Você precisa ter lojas cadastradas para criar um cupom ou promoção.
      </AlertDescription>
    </Alert>
  );
}