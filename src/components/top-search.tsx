import {
  CounterClockwiseClockIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { PrimitiveAtom, useAtom } from "jotai";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
export interface TopSearchFormInput {
  value: string;
}

interface TopSearchProps {
  onSubmit: SubmitHandler<TopSearchFormInput>;
  historyAtom: PrimitiveAtom<string[]>;
}

export function TopSearch({ onSubmit, historyAtom }: TopSearchProps) {
  const { register, handleSubmit } = useForm<TopSearchFormInput>();
  const [searchHistory, setSearchHistory] = useAtom(historyAtom);

  const onSubmitWithHistory = async (data: TopSearchFormInput) => {
    onSubmit(data);
    await new Promise((resolve) => setTimeout(resolve, 500));
    // wait for dropdown close animation to finish
    setSearchHistory([data.value, ...searchHistory]);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitWithHistory)}
      className="flex w-full gap-2 bg-background border-b h-16 drop-shadow-sm p-4 sticky top-0 z-10 items-center"
    >
      <Button variant={"ghost"} size={"icon"}>
        <MagnifyingGlassIcon className="w-4 h-4" />
      </Button>
      <Input
        className="w-full bg-background border-none shadow-none text-sm"
        placeholder="Search..."
        autoFocus={true}
        {...register("value", { required: true })}
      />

      {searchHistory.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <CounterClockwiseClockIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Search history</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {searchHistory.map((search, idx) => (
              <DropdownMenuItem
                key={idx}
                onSelect={() => onSubmitWithHistory({ value: search })}
              >
                {search}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </form>
  );
}
