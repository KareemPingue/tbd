
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Mail, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  BarChart3,
  BrainCircuit,
  Megaphone
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Campaigns", icon: Megaphone, path: "/campaigns" },
    { name: "Segmentation", icon: Users, path: "/segmentation" },
    { name: "Predictions", icon: BrainCircuit, path: "/predictions" },
    { name: "Email Marketing", icon: Mail, path: "/email" },
    { name: "Analytics", icon: BarChart3, path: "/analytics" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div 
      className={cn(
        "h-screen transition-all duration-300 ease-in-out fixed bg-sidebar border-r border-border py-6 flex flex-col z-10",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="px-4 flex items-center justify-between mb-8">
        {!collapsed && (
          <div className="font-semibold text-xl tracking-tight text-primary">
            MarketSync
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-sidebar-foreground hover:text-sidebar-foreground",
                collapsed && "justify-center"
              )
            }
          >
            <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")} />
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-4 pb-2 flex items-center justify-between">
        <ThemeToggle />
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="text-xs font-medium">JS</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
