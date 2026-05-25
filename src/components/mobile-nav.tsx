"use client";

import { useState } from "react";
import { Menu, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { SidebarContent } from "@/components/sidebar";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" className="md:hidden" />
          }
        >
          <Menu className="size-5" />
          <span className="sr-only">打开导航</span>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">导航菜单</SheetTitle>
          <div onClick={() => setOpen(false)}>
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>

      <span className="ml-3 text-sm text-foreground flex items-center gap-2">
        <img src="/logo.png" alt="logo" className="h-5 w-auto" />
        <span className="font-semibold">AI 漫剧工作台</span>
      </span>
    </div>
  );
}
