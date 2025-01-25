import { Copy, ExternalLink, Pencil, ShoppingBag, Trash, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { DeleteDialog } from "~/components/delete-dialog";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Coupon } from "~/types/actions/coupon";
import { useToast } from "~/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export interface CouponCardProps {
  coupon: Coupon;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function CouponCard({ 
  coupon,
  onEdit,
  onDelete
}: CouponCardProps) {
  const { toast } = useToast();

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: `Copiado: ${coupon.code}`,
        description: "Código do cupom copiado para a área de transferência.",
      });
    } catch (_) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o código do cupom.",
        variant: "destructive",
      }); 
    }
  }

  return (
    <Card className={`${coupon.is_expired ? "opacity-60" : ""}`}>
      <CardHeader>
        {/* User info */}
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="size-7">
              <AvatarImage src={coupon.store.img_url} alt={coupon.store.name} />
              <AvatarFallback>
                <div className="size-7 flex items-center justify-center rounded-full bg-muted">
                  <ShoppingBag className="size-4 text-muted-foreground stroke-[1.5]" />
                </div>
              </AvatarFallback>
            </Avatar>
            <span className="text-sm max-w-32 truncate">
              {coupon.store.name}
            </span>
            {coupon.is_expired ? (
              <span className="text-sm font-bold">{"(Expirado)"}</span>
            ) : null}
          </div>
      
          <a href={`${coupon.link_url}`} target="_blank">
            <div className="flex gap-2 items-center">
              <span className="underline text-sm">
                Ver oferta
              </span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>
        </div>
        <CardTitle className="truncate leading-normal">
          {coupon.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-ellipsis">
          {coupon.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Input
            id="link"
            className={`bg-secondary border-none focus-visible:ring-0 ${coupon.is_expired ? "line-through" : ""}`}
            defaultValue={coupon.code}
            readOnly
          />
          <Button 
            onClick={() => copyToClipboard(coupon.code)} 
            className="flex items-center gap-2"
          >
            Copiar
            <Copy />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">

        {/* User info */}
        <div className="flex items-center gap-2">
          <div className="size-7 flex items-center justify-center rounded-full bg-muted">
            <User className="size-4 text-muted-foreground stroke-[1.5]" />
          </div>
          <span className="text-sm max-w-24 truncate">
            {coupon.user.username}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Excluir */}
          {onDelete ? (
            <DeleteDialog
              item={coupon.title}
              onConfirm={onDelete}
            >
              <Button variant="destructive">
                <span className="hidden sm:block">Excluir</span>
                <Trash className="w-4 h-4" />
              </Button>
            </DeleteDialog>
          ) : null}

          {/* Editar */}
          {onEdit ? (
            <Button 
              onClick={() => onEdit()}
              variant="ghost"
            >
              <span className="hidden sm:block">Editar</span>
              <Pencil className="w-4 h-4" />
            </Button>
          ) : null}
        </div>

      </CardFooter>
    </Card>
  );
}