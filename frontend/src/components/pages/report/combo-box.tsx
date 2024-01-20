import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

export function ComboboxDemo({
  location,
  setLocation,
  arrValues,
}: {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  arrValues: { label: string; value: string }[];

}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(location);

  useEffect(() => {
    setLocation(value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant="outline"
          role="combobox"
          type="button"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? arrValues.find((district) => district.value === value)?.label
            : "Select district..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search district..." className="h-9" />
          <CommandEmpty>No district found.</CommandEmpty>
          <CommandGroup>
            {arrValues.map((district) => (
              <CommandItem
                key={district.value}
                value={district.value}
                onSelect={(currentValue: React.SetStateAction<string>) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {district.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === district.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
