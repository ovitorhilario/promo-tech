import { PropsWithChildren } from "react";
import { useAuth } from "~/context/auth";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"

export interface ProtectedRouteTriggerProps extends PropsWithChildren {
  path: string;
}

export function ProtectedRouteTrigger({ path, children }: ProtectedRouteTriggerProps) {
  const auth = useAuth();
  const canAccess = !!auth?.token && !!auth?.session;
  const navigate = useNavigate();

  if (canAccess) {
    return (
      <Link to={path}>
        {children}
      </Link>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Autenticação necessária</DialogTitle>
          <DialogDescription>
            Você precisar realizar o login para acessar essa página.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="outline"
            onClick={() => navigate("/sign-in")}
          >
            Criar conta
          </Button>
          <Button 
            onClick={() => navigate("/sign-in")}
          >
            Entrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}