import { Ticket } from "lucide-react";
import { Card } from "~/components/ui/card";

export interface EmptyListProps {
  title: string;
  message?: string;
}

export function EmptyList({
  title,
  message
}: EmptyListProps) {
  return (
    <Card>
      <div className="flex flex-col items-center justify-center gap-2 p-8">
        <Ticket className="size-12 text-muted-foreground stroke-[1.25]" />
        <h2 className="text-lg font-semibold text-center">{title}</h2>
        {message && <p className="text-sm text-center text-muted-foreground">{message}</p>}
      </div>
    </Card>
  )
}
