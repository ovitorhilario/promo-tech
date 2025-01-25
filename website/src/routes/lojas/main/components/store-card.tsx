import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  IconChevronRight
} from "@tabler/icons-react";
import { Store } from "~/types/actions/store";
import { Pencil, ShoppingBag, Trash } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Link } from "react-router";
import { DeleteDialog } from "~/components/delete-dialog";

interface StoreCardProps {
  store: Store;
  userIsAdmin: boolean;
  onDelete: (id: string) => void;
}

export function StoreCard({
  store,
  userIsAdmin,
  onDelete,
}: StoreCardProps) {

  return (
    <Card>
      <CardHeader>

        {/* Store image and title */}
        <CardTitle className="truncate">
          <div className="flex items-center gap-2">
            <Avatar className="size-10">
              <AvatarImage src={store.img_url} alt={store.name} />
              <AvatarFallback>
                <div className="flex items-center justify-center rounded-full bg-muted">
                  <ShoppingBag className="size-5 text-muted-foreground stroke-[1.5]" />
                </div>
              </AvatarFallback>
            </Avatar>
            <span className="text-base">{store.name}</span>
          </div>
        </CardTitle>

        {/* Store description */}
        <CardDescription className="line-clamp-2 leading-normal min-h-[3rem]">
          {store.description}
        </CardDescription>

      </CardHeader>
      <CardContent className="flex flex-col gap-3 md:flex-row md:justify-end">

        {userIsAdmin ? (
          <>
            {/* Excluir loja */}
            <DeleteDialog 
              item={store.name} 
              onConfirm={() => onDelete(store.id)}
            >
              <Button className="flex items-center gap-2 w-full md:w-auto" variant="destructive">
                Excluir
                <Trash className="h-5 w-5" />
              </Button>
            </DeleteDialog>

            {/* Editar loja */}
            <Link to={`/editar/loja/${store.tag}`}>
              <Button className="flex items-center gap-2 w-full md:w-auto" variant="secondary">
                Editar
                <Pencil className="h-5 w-5" />
              </Button>
            </Link>
          </>
        ) : null}

        {/* Button to access store */}
        <a href={store.link_url} target="_blank">
          <Button className="flex items-center gap-2 w-full md:w-auto">
            Acessar loja
            <IconChevronRight className="h-5 w-5" />
          </Button>
        </a>
    
      </CardContent>
    </Card>
  );
}
