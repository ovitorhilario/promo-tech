import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import { IconLogin, IconUser } from '@tabler/icons-react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '~/context/auth';

export function UserNav() {
  const auth = useAuth();
  const navigate = useNavigate();
  const isSignedIn = !!auth?.token && !!auth?.session;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="group/trigger rounded-full p-0 gap-2 hover:bg-transparent focus-visible:ring-0"
        >
          <Avatar className="size-10">
            <AvatarImage
              src={undefined}
              alt="user avatar"
            />
            <AvatarFallback>
              <div className="flex items-center justify-center rounded-full bg-muted w-full">
                <IconUser className="min-w-6 min-h-6 text-muted-foreground stroke-[1.5]" />
              </div>
            </AvatarFallback>
          </Avatar>
          <div className='hidden md:flex flex-col gap-1'>
            <span className="text-sm font-medium text-muted-foreground">
              {auth?.session?.username || "Visitante"}
            </span>
          </div>
          <ChevronDown className="size-5 stroke-[2.5] text-muted-foreground group-focus-visible/trigger:text-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 px-1.5 py-2.5" align="end" forceMount>
        {!isSignedIn ? (
          <React.Fragment>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium leading-none">
                  Entrar ou criar conta
                </p>
                <p className="text-xs text-muted-foreground">
                  Acesse sua conta ou crie uma nova.
                </p>
                <Button
                  className="mt-2.5 h-8 w-full rounded-sm text-xs"
                  variant="secondary"
                  onClick={() => navigate("/sign-up")}
                >
                  Criar conta
                </Button>
                <Button 
                  className="mt-1.5 h-8 w-full rounded-sm text-xs" 
                  onClick={() => navigate("/sign-in")}
                >
                  Entrar
                  <IconLogin className="ml-2 inline-block h-4 w-4" />
                </Button>
              </div>
            </DropdownMenuLabel>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {auth?.session?.full_name || ""}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {auth?.session?.username || ""}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuSeparator /> */}
              <DropdownMenuItem onClick={() => auth?.logOut()}>
                Sair
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </React.Fragment>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
