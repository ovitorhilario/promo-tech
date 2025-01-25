import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  IconChevronRight,
  IconClock,
} from '@tabler/icons-react';
import { Promotion } from '~/types/actions/promotion';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
import { Edit, Link, ShoppingBag, Trash, User } from 'lucide-react';
import { DeleteDialog } from '~/components/delete-dialog';
import { useToast } from '~/hooks/use-toast';
import dayjs from 'dayjs';
import React from 'react';

interface PromotionCardProps {
  promotion: Promotion;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function PromotionCard({
  promotion,
  onEdit,
  onDelete
}: PromotionCardProps) {
  const { toast } = useToast();

  // Form date to time ago, ex: 5min, 1h, 2d, 3w
  function getTimesAgo(dateISO: string) {
    const now = dayjs();
    const date = dayjs(dateISO);
    const units = [
      { name: 'minute', limit: 60, suffix: 'min' },
      { name: 'hour', limit: 24, suffix: 'h' },
      { name: 'day', limit: 7, suffix: 'd' },
      { name: 'week', limit: Infinity, suffix: 'sem' },
    ];

    for (const unit of units) {
      const diff = now.diff(date, unit.name as dayjs.OpUnitType);
      if (diff < unit.limit) {
        return `${diff}${unit.suffix}`;
      }
    }
  }

  function handleCopyLink(text: string) {
    try {
      navigator.clipboard.writeText(text);
      toast({ title: 'Link copiado', description: text.substring(0, 32) + '...' });
    } catch (_) {
      toast({ title: 'Erro ao copiar link', variant: 'destructive' });
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between gap-2">

          {/* Left: Title Store */}
          <div className="flex flex-1 flex-row flex-nowrap items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage 
                src={promotion.store.img_url} 
                alt={promotion.store.name} 
              />
              <AvatarFallback>
                <div className="flex items-center justify-center rounded-full bg-muted">
                  <ShoppingBag className="size-4 text-muted-foreground stroke-[1.5]" />
                </div>
              </AvatarFallback>
            </Avatar>
            <span className="max-w-32 truncate text-sm">
              {promotion.store.name}
            </span>
          </div>

          {/* Right : Hour */}
          <div className="flex flex-row items-center gap-1.5">
            <IconClock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {getTimesAgo(promotion.created_at)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>

        {/* Banner of *PROMOTION* */}
        <div className="group/img flex items-center justify-center overflow-hidden rounded-[12px] border">
          <img
            src={promotion.img_url}
            alt={promotion.title}
            className="object-cover max-h-48 min-h-48"
          />
        </div>

        {/* Content *Promotion* */}
        <span className="line-clamp-2 min-h-[2.5rem] leading-[1.25rem]  w-full text-base font-medium text-foreground">
          {promotion.title}
        </span>
        <span className="-mt-2 line-clamp-2 min-h-[2rem] leading-[1rem] w-full text-ellipsis text-xs text-muted-foreground">
          {promotion.description}
        </span>

        {/* Price */}
        <div className="mt-4 flex items-stretch gap-2.5 flex-col sm:flex-row bg-secondary rounded-xl pt-2 sm:pt-0">
          <div className="flex items-center justify-center gap-2 flex-1">
            <span className='text-lg font-semibold text-foreground font-poppins'>
              {`R$ ${promotion.price.toFixed(0)}`}
            </span>
          </div>
          <a href={promotion.link_url} target='_blank' className='sm:ml-auto flex-1'>
            <Button className='w-full'>
              Ver promo
              <IconChevronRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </CardContent>
      <CardFooter>

        <div className="w-full flex flex-row items-center gap-1.5 border-t pt-4 border-gray-200/60">
          {/* User info */}
          <div className="flex flex-1 flex-row flex-nowrap items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage 
                src={undefined} 
                alt={promotion.store.name} 
              />
              <AvatarFallback>
                <div className="flex items-center justify-center rounded-full bg-muted">
                  <User className="size-4 text-muted-foreground stroke-[1.5]" />
                </div>
              </AvatarFallback>
            </Avatar>
            <span className="max-w-24 font-medium truncate text-sm text-muted-foreground">
              {promotion.user.username}
            </span>
          </div>
          
          {onEdit ? (
            <Button 
              className="h-8 gap-1.5 border-none p-0 px-2.5 text-muted-foreground" 
              variant="ghost"
              onClick={() => onEdit()}
            >
              <Edit className="h-6 w-6 text-muted-foreground" />
              <span className='hidden sm:block'>Editar</span>
            </Button>
          ) : null}
          {onDelete ? (
            <React.Fragment>
              {/* Delete */}
              <DeleteDialog 
                item={promotion.title}
                onConfirm={() => onDelete()}
              >
                <Button 
                  className="h-8 gap-1.5 border-none p-0 px-2.5" 
                  variant="destructive"
                >
                  <Trash className="h-6 w-6" />
                  <span className='hidden sm:block'>Excluir</span>
                </Button>
              </DeleteDialog>
            </React.Fragment>
          ) : (
            <Button 
              className="h-8 gap-1.5 border-none p-0 px-2.5 text-muted-foreground" 
              variant="ghost"
              onClick={() => handleCopyLink(promotion.link_url)}
            >
              <Link className="max-w-4 max-h-4 text-muted-foreground" />
              <span className='hidden sm:block'>Compartilhar</span>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
