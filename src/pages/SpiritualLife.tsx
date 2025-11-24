import { DashboardNav } from "@/components/DashboardNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart,
  Users, 
  Calendar,
  MapPin,
  Clock,
  TrendingUp,
  CheckCircle
} from "lucide-react";

const SpiritualLife = () => {
  const chapelEvents = [
    {
      title: "Weekly Chapel Service",
      speaker: "Dr. James Wilson",
      date: "2025-11-25",
      time: "10:00 AM",
      location: "Main Chapel",
      type: "Chapel",
      attended: false,
    },
    {
      title: "Praise & Worship Night",
      speaker: "Worship Team",
      date: "2025-11-26",
      time: "7:00 PM",
      location: "Student Center",
      type: "Worship",
      attended: false,
    },
    {
      title: "Guest Speaker Series",
      speaker: "Rev. Sarah Mitchell",
      date: "2025-11-28",
      time: "11:00 AM",
      location: "Main Chapel",
      type: "Special",
      attended: false,
    },
  ];

  const ministryOpportunities = [
    {
      title: "Youth Ministry Internship",
      type: "Local Church",
      location: "Grace Community Church",
      duration: "8 weeks",
      hours: 120,
      spots: 3,
      description: "Work with youth groups, plan events, and develop leadership skills.",
    },
    {
      title: "Summer Mission Trip - Guatemala",
      type: "International",
      location: "Guatemala City",
      duration: "2 weeks",
      hours: 80,
      spots: 15,
      description: "Construction, VBS, and community outreach in rural communities.",
    },
    {
      title: "Campus Ministry Assistant",
      type: "On Campus",
      location: "College Campus",
      duration: "Semester",
      hours: 60,
      spots: 5,
      description: "Support campus spiritual life programs and student events.",
    },
  ];

  const attendanceStats = {
    total: 45,
    attended: 38,
    percentage: 84,
    streak: 12,
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Spiritual Life</h1>
          <p className="text-muted-foreground">
            Chapel services, ministry opportunities, and spiritual formation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Attended</p>
                  <p className="text-2xl font-bold text-foreground">
                    {attendanceStats.attended}/{attendanceStats.total}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Attendance</p>
                  <p className="text-2xl font-bold text-foreground">
                    {attendanceStats.percentage}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Streak</p>
                  <p className="text-2xl font-bold text-foreground">
                    {attendanceStats.streak} weeks
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ministry Hours</p>
                  <p className="text-2xl font-bold text-foreground">84</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="chapel" className="mb-8">
          <TabsList>
            <TabsTrigger value="chapel">Chapel & Events</TabsTrigger>
            <TabsTrigger value="ministry">Ministry Opportunities</TabsTrigger>
          </TabsList>

          <TabsContent value="chapel" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Chapel Services & Events</CardTitle>
                <CardDescription>
                  Track your attendance and stay connected to campus spiritual life
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chapelEvents.map((event, index) => (
                    <Card key={index} className="hover:shadow-soft transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-foreground">
                                {event.title}
                              </h3>
                              <Badge variant="secondary">{event.type}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              Speaker: {event.speaker}
                            </p>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                  {new Date(event.date).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{event.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{event.location}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant={event.attended ? "outline" : "default"}>
                            {event.attended ? "Attended" : "Mark Attended"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ministry" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ministryOpportunities.map((opportunity, index) => (
                <Card key={index} className="hover:shadow-elevated transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center flex-shrink-0">
                        <Heart className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          {opportunity.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="secondary">{opportunity.type}</Badge>
                          <Badge variant="outline">{opportunity.spots} spots left</Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {opportunity.description}
                    </p>
                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-semibold text-foreground">
                          {opportunity.duration}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Hours</p>
                        <p className="font-semibold text-foreground">
                          {opportunity.hours}h
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-semibold text-foreground text-xs">
                          {opportunity.location}
                        </p>
                      </div>
                    </div>
                    <Button className="w-full">Apply Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card className="bg-gradient-hero text-primary-foreground">
          <CardContent className="p-8 text-center">
            <Heart className="h-16 w-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">
              Grow in Your Faith Journey
            </h3>
            <p className="mb-6 opacity-90 max-w-2xl mx-auto">
              Connect with our spiritual formation team for guidance, prayer support, and personalized discipleship opportunities.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Schedule a Meeting
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SpiritualLife;
