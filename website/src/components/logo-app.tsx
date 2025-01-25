export interface LogoAppProps {
  darkBackground?: boolean;
}

export function LogoApp({ darkBackground }: LogoAppProps) {
  return (
    <div className={`flex items-center gap-1.5 text-nowrap font-league text-2xl font-bold ${darkBackground ? ' text-white' : 'text-foreground'}`}>
      <span>promo<span className='text-xl'>🕹️</span>tech</span>
    </div>
  );
}