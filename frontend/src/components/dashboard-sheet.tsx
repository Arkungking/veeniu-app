import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";

interface DashboardSheetProps {
  trigger: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function DashboardSheet({
  trigger,
  title,
  children,
  className,
  open,
  setOpen
}: DashboardSheetProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>{trigger}</Button>
      </SheetTrigger>
      <SheetContent className={className}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
