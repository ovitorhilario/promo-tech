import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"

export interface ComboBoxProps {
  items: { value: string; label: string }[];
  placeholder?: string;
  searchPlaceholder?: string;
  value: string;
  disabled?: boolean;
  setValue: (value: string) => void;
}

export function Combobox({ 
  items, 
  placeholder = 'Selecione um item',
  searchPlaceholder = 'Pesquisar...',
  value,
  disabled,
  setValue 
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false)

  const doFilter = (value: string, search: string): number => {
    const valueObject = items.find((item) => item.value === value);
    return (valueObject?.label.toLowerCase().includes(search.toLowerCase()) ?? 0) ? 1 : 0;
  }
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="min-w-[200px] justify-between"
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command filter={(value, search) => doFilter(value, search)}>
          <CommandInput 
            placeholder={searchPlaceholder} className="h-10" 
          />
          <CommandList>
            <CommandEmpty>Nenhum item encotrado.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
