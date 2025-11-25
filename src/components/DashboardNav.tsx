import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Home, 
  Calendar, 
  Users, 
  Bell, 
  LogOut,
  GraduationCap,
  FileText,
  Library,
  Award,
  Heart,
  Settings,
  HelpCircle,
  UserCog
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { NotificationCenter } from "./NotificationCenter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  icon: any;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: GraduationCap, label: "Classes", path: "/classes" },
  { icon: FileText, label: "Assignments", path: "/assignments" },
  { icon: Calendar, label: "Schedule", path: "/schedule" },
  { icon: Library, label: "E-Library", path: "/library" },
  { icon: Award, label: "RPL/Credits", path: "/credit-transfer" },
  { icon: Heart, label: "Spiritual Life", path: "/spiritual-life" },
  { icon: Users, label: "Community", path: "/community" },
];

export const DashboardNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Ministry College</h1>
                <p className="text-xs text-muted-foreground">Learning Portal</p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-1">
              {navItems.slice(0, 5).map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.label}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "gap-2",
                      isActive && "bg-primary text-primary-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    More
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {navItems.slice(5).map((item) => (
                    <DropdownMenuItem
                      key={item.label}
                      onClick={() => navigate(item.path)}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/announcements")}>
                    <Bell className="h-4 w-4 mr-2" />
                    Announcements
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/grades")}>
                    <Award className="h-4 w-4 mr-2" />
                    Grades
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/resources")}>
                    <FileText className="h-4 w-4 mr-2" />
                    Resources
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <NotificationCenter />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-3 ml-4 cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium text-foreground">
                        {user.user_metadata?.full_name || "Student"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                      {(user.user_metadata?.full_name?.[0] || user.email?.[0] || "S").toUpperCase()}
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/grades")}>
                    Grades
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/support")}>
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Support
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/student-management")}>
                    <UserCog className="h-4 w-4 mr-2" />
                    Student Management
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => navigate("/auth")}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
