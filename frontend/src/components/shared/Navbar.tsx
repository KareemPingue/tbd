
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="h-16 border-b border-border fixed top-0 right-0 left-0 z-10 glassmorphism">
      <div className="h-full flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <div className="hidden lg:flex relative rounded-md overflow-hidden">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[300px] pl-8 bg-background/50"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"></span>
          </Button>
          <div className="lg:hidden">
            <ThemeToggle />
          </div>
          <div className="hidden lg:flex items-center space-x-3">
            <span className="text-sm font-medium">Jane Smith</span>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="text-xs font-medium">JS</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
