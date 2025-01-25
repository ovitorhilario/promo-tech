import { UserNav } from '~/components/user-nav';
import {
  HandCoins,
  ShoppingBag,
  TicketIcon
} from 'lucide-react';
import { LogoApp } from '~/components/logo-app';
import { Link, NavLink } from 'react-router';
import { cn } from '~/lib/utils';

export function Navbar() {

  return (
    <nav className="flex w-full bg-white border-b flex-col">
      <div className="flex h-[72px] items-center gap-4 container mx-auto px-4 sm:p-0">

        {/* Site Logo */}
        <Link to="/" className="flex items-center">
          <LogoApp />
        </Link>

        <div className='items-center gap-2.5 ml-4 hidden sm:flex'>
          <NavLink to="/" className={({ isActive }) => cn('py-1.5 px-4 rounded-full', isActive ? 'bg-red-50' : undefined)}>
            <span className='flex items-center gap-2 text-sm font-medium'>
              <HandCoins className='h-4 w-4 text-muted-foreground' />
              Promoções
            </span>
          </NavLink>
          <NavLink to="/cupons" className={({ isActive }) => cn('py-1.5 px-4 rounded-full', isActive ? 'bg-red-50' : undefined)}>
            <span className='flex items-center gap-2 text-sm font-medium'>
              <TicketIcon className='h-4 w-4 text-muted-foreground' />
              Cupons
            </span>
          </NavLink>
          <NavLink to="/lojas" className={({ isActive }) => cn('py-1.5 px-4 rounded-full', isActive ? 'bg-red-50' : undefined)}>
            <span className='flex items-center gap-2 text-sm font-medium'>
              <ShoppingBag className='h-4 w-4 text-muted-foreground' />
              Lojas
            </span>
          </NavLink>
        </div>

        <div className="ml-auto flex items-center gap-3">
          
          {/* <ThemeToggle /> */}
          {/* <Button
            className="h-10 min-w-10 rounded-full p-0 shadow-none"
            variant="secondary"
          >
            <IconBellFilled className="h-5 w-5 text-muted-foreground" />
          </Button> */}

          <UserNav />
        </div>
      </div>
      <div className='flex flex-col items-stretch gap-2.5 px-4 pb-4 sm:hidden'>
          <NavLink to="/" className={({ isActive }) => cn('py-1.5 px-4 rounded-full', isActive ? 'bg-red-50' : undefined)}>
            <span className='flex items-center gap-2 text-sm font-medium'>
              <HandCoins className='h-4 w-4 text-muted-foreground' />
              Promoções
            </span>
          </NavLink>
          <NavLink to="/cupons" className={({ isActive }) => cn('py-1.5 px-4 rounded-full', isActive ? 'bg-red-50' : undefined)}>
            <span className='flex items-center gap-2 text-sm font-medium'>
              <TicketIcon className='h-4 w-4 text-muted-foreground' />
              Cupons
            </span>
          </NavLink>
          <NavLink to="/lojas" className={({ isActive }) => cn('py-1.5 px-4 rounded-full', isActive ? 'bg-red-50' : undefined)}>
            <span className='flex items-center gap-2 text-sm font-medium'>
              <ShoppingBag className='h-4 w-4 text-muted-foreground' />
              Lojas
            </span>
          </NavLink>
        </div>
    </nav>
  );
}
