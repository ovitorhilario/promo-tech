import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import { FormControl } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";

export interface FormComboBoxProps {
  items: { value: string; label: string }[];
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
}

export function FormComboBox({ 
  items, 
  placeholder = 'Selecione um item',
  value,
  setValue 
}: FormComboBoxProps) {

  const doFilter = (value: string, search: string): number => {
    const valueObject = items.find((item) => item.value === value);
    return (valueObject?.label.toLowerCase().includes(search.toLowerCase()) ?? 0) ? 1 : 0;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "min-w-[200px] justify-between",
              !value && "text-muted-foreground"
            )}
          >
            {value ? items.find((item) => item.value === value)?.label 
              : placeholder || "Selecionar item"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command filter={(value, search) => doFilter(value, search)}>
          <CommandInput placeholder="Procurar..." />
          <CommandList>
            <CommandEmpty>Sem resultados.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  value={item.value}
                  key={item.value}
                  onSelect={() => {
                    if (value === item.value) {
                      setValue("");
                      return;
                    }
                    setValue(item.value)
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      item.value === value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}