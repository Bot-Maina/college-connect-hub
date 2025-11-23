import { DashboardNav } from "@/components/DashboardNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Mail, Phone, MapPin, Calendar, Award, BookOpen, Edit } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Student Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and academic profile</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-elevated">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <Avatar className="w-32 h-32 bg-gradient-accent">
                      <AvatarFallback className="text-4xl font-bold text-accent-foreground">
                        JS
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      size="icon" 
                      className="absolute bottom-0 right-0 rounded-full w-10 h-10 shadow-lg"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-foreground mb-1">John Smith</h2>
                  <p className="text-muted-foreground mb-4">Theology Major</p>
                  
                  <div className="w-full space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">john.smith@college.edu</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">Atlanta, GA</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">Enrolled: Fall 2023</span>
                    </div>
                  </div>

                  <Button className="w-full gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  Academic Standing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Current GPA</p>
                    <p className="text-3xl font-bold text-foreground">3.78</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Credits Earned</p>
                    <p className="text-2xl font-semibold text-foreground">64 / 120</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Expected Graduation</p>
                    <p className="text-lg font-semibold text-foreground">May 2026</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-elevated">
              <CardContent className="p-6">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="academic">Academic Info</TabsTrigger>
                    <TabsTrigger value="ministry">Ministry Profile</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Smith" className="mt-2" />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="john.smith@college.edu" className="mt-2" />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="mt-2" />
                      </div>
                      
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue="123 Main St, Atlanta, GA 30303" className="mt-2" />
                      </div>
                      
                      <div>
                        <Label htmlFor="emergency">Emergency Contact</Label>
                        <Input id="emergency" defaultValue="Jane Smith - (555) 987-6543" className="mt-2" />
                      </div>

                      <Button className="w-full sm:w-auto">Save Changes</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="academic">
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input id="studentId" defaultValue="STU-2023-1234" disabled className="mt-2" />
                      </div>
                      
                      <div>
                        <Label htmlFor="major">Major</Label>
                        <Input id="major" defaultValue="Theology" className="mt-2" />
                      </div>
                      
                      <div>
                        <Label htmlFor="minor">Minor (Optional)</Label>
                        <Input id="minor" defaultValue="Biblical Greek" className="mt-2" />
                      </div>
                      
                      <div>
                        <Label htmlFor="advisor">Academic Advisor</Label>
                        <Input id="advisor" defaultValue="Dr. Sarah Johnson" disabled className="mt-2" />
                      </div>
                      
                      <div>
                        <Label htmlFor="enrollment">Enrollment Status</Label>
                        <Input id="enrollment" defaultValue="Full-time" disabled className="mt-2" />
                      </div>

                      <Button className="w-full sm:w-auto">Update Academic Info</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="ministry">
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="calling">Ministry Calling</Label>
                        <Input id="calling" defaultValue="Pastoral Ministry" className="mt-2" />
                      </div>
                      
                      <div>
                        <Label htmlFor="denomination">Denomination</Label>
                        <Input id="denomination" defaultValue="Non-denominational" className="mt-2" />
                      </div>
                      
                      <div>
                        <Label htmlFor="church">Home Church</Label>
                        <Input id="church" defaultValue="Grace Community Church" className="mt-2" />
                      </div>
                      
                      <div>
                        <Label htmlFor="experience">Ministry Experience</Label>
                        <Input id="experience" defaultValue="Youth Pastor - 2 years" className="mt-2" />
                      </div>
                      
                      <div>
                        <Label htmlFor="interests">Ministry Interests</Label>
                        <Input id="interests" defaultValue="Preaching, Counseling, Missions" className="mt-2" />
                      </div>

                      <Button className="w-full sm:w-auto">Save Ministry Profile</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="settings">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h3>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm text-foreground">Email notifications for assignments</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm text-foreground">Push notifications for live classes</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm text-foreground">Weekly grade reports</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm text-foreground">Prayer request updates</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">Privacy Settings</h3>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm text-foreground">Show profile to other students</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm text-foreground">Allow study group invitations</span>
                          </label>
                        </div>
                      </div>

                      <Button className="w-full sm:w-auto">Save Preferences</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
