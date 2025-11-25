import { useState, useEffect } from "react";
import { DashboardNav } from "@/components/DashboardNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Bell, Lock, Palette } from "lucide-react";

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    student_id: "",
    program: "",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    assignments: true,
    grades: true,
    announcements: true,
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      if (data) {
        setProfile({
          full_name: data.full_name || "",
          phone: data.phone || "",
          student_id: data.student_id || "",
          program: data.program || "",
        });
      }
    } catch (error: any) {
      console.error("Error loading profile:", error);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("id", user?.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and academic details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={profile.full_name}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student_id">Student ID</Label>
                      <Input
                        id="student_id"
                        value={profile.student_id}
                        onChange={(e) => setProfile({ ...profile, student_id: e.target.value })}
                        placeholder="STU-2024-001"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="program">Program of Study</Label>
                    <Input
                      id="program"
                      value={profile.program}
                      onChange={(e) => setProfile({ ...profile, program: e.target.value })}
                      placeholder="Bachelor of Theology"
                    />
                  </div>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="assignment-notifications">Assignment Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about new assignments and deadlines</p>
                  </div>
                  <Switch
                    id="assignment-notifications"
                    checked={notifications.assignments}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, assignments: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="grade-notifications">Grade Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts when grades are posted</p>
                  </div>
                  <Switch
                    id="grade-notifications"
                    checked={notifications.grades}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, grades: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="announcement-notifications">Announcements</Label>
                    <p className="text-sm text-muted-foreground">Stay updated with school announcements</p>
                  </div>
                  <Switch
                    id="announcement-notifications"
                    checked={notifications.announcements}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, announcements: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Change Password</h3>
                    <Button variant="outline">Update Password</Button>
                  </div>
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground mb-3">Add an extra layer of security to your account</p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium mb-2">Active Sessions</h3>
                    <p className="text-sm text-muted-foreground mb-3">Manage devices where you're currently signed in</p>
                    <Button variant="outline">View Sessions</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of your dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base mb-3 block">Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline" className="h-24 flex-col">
                      <div className="w-8 h-8 rounded bg-background border mb-2"></div>
                      Light
                    </Button>
                    <Button variant="outline" className="h-24 flex-col">
                      <div className="w-8 h-8 rounded bg-foreground mb-2"></div>
                      Dark
                    </Button>
                    <Button variant="outline" className="h-24 flex-col">
                      <div className="w-8 h-8 rounded bg-gradient-to-r from-background to-foreground mb-2"></div>
                      Auto
                    </Button>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Label className="text-base mb-3 block">Display Density</Label>
                  <div className="flex gap-4">
                    <Button variant="outline">Comfortable</Button>
                    <Button variant="outline">Compact</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
