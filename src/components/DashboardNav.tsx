import { Button } from "@/components/ui/button";
import { BookOpen, Home, Calendar, Users, Settings, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: any;
  label: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: BookOpen, label: "My Classes" },
  { icon: Calendar, label: "Schedule" },
  { icon: Users, label: "Community" },
  { icon: Settings, label: "Settings" },
];

export const DashboardNav = () => {
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Ministry College</h1>
                <p className="text-xs text-muted-foreground">Learning Portal</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant={item.active ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "gap-2",
                    item.active && "bg-primary text-primary-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            </Button>
            <div className="flex items-center gap-3 ml-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">John Smith</p>
                <p className="text-xs text-muted-foreground">Theology Major</p>
              </div>
              <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                JS
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
