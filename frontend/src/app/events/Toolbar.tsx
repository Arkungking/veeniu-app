"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListFilter } from "lucide-react";
import { catDropdown, locDropdown } from "@/lib/const-data";

interface ToolbarProps {
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setCity: (city: string) => void;
}

export default function Toolbar({
  setSearch,
  setCategory,
  setCity,
}: ToolbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="hidden gap-5 md:flex">
        <Input
          placeholder="Search"
          className="w-100"
          onChange={(e) => setSearch(e.target.value)}
        />
        <FilterDropdown data={catDropdown} onChange={setCategory} />
        <FilterDropdown data={locDropdown} onChange={setCity} />
      </section>

      <section className="flex gap-3 md:hidden">
        <Input
          placeholder="Search"
          className="flex-1"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <ListFilter className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Filter</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-5">
              <FilterDropdown data={catDropdown} onChange={setCategory} />
              <FilterDropdown data={locDropdown} onChange={setCity} />
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
}

interface DropdownProps {
  data: {
    title: string;
    items: string[];
  };
  onChange: (value: string) => void;
}

const FilterDropdown = ({ data, onChange }: DropdownProps) => (
  <Select
    onValueChange={(val) =>
      val === "LOCATION" || val === "CATEGORY" ? onChange("") : onChange(val)
    }
  >
    <SelectTrigger className="w-full md:w-[140px]">
      <SelectValue placeholder={data.title} />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {data.items.map((item) => (
          <SelectItem key={item} value={item.toUpperCase()}>
            {item}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);
