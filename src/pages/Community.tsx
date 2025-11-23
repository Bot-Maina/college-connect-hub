import { DashboardNav } from "@/components/DashboardNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Users, Calendar, Heart as PrayIcon } from "lucide-react";

const Community = () => {
  const discussions = [
    {
      author: "Sarah Martinez",
      initials: "SM",
      topic: "Question about Soteriology",
      content: "Can someone explain the difference between Arminianism and Calvinism in simple terms? I'm preparing for my exam...",
      course: "Systematic Theology I",
      time: "2 hours ago",
      replies: 12,
      likes: 8,
    },
    {
      author: "David Kim",
      initials: "DK",
      topic: "Study Group for Greek Finals",
      content: "Looking to form a study group for the upcoming Greek final. Anyone interested in meeting this weekend?",
      course: "Biblical Greek",
      time: "5 hours ago",
      replies: 6,
      likes: 15,
    },
    {
      author: "Rebecca Johnson",
      initials: "RJ",
      topic: "Sermon Feedback Needed",
      content: "Just finished my first sermon outline for Homiletics. Would love constructive feedback from classmates!",
      course: "Homiletics & Preaching",
      time: "1 day ago",
      replies: 9,
      likes: 11,
    },
  ];

  const prayerRequests = [
    {
      author: "Michael Chen",
      initials: "MC",
      request: "Please pray for my grandmother who is in the hospital. Also praying for clarity about my calling to missions.",
      time: "3 hours ago",
      prayers: 24,
    },
    {
      author: "Emily Davis",
      initials: "ED",
      request: "Asking for prayer as I prepare for ordination interviews next week. Feeling nervous but trusting God.",
      time: "1 day ago",
      prayers: 31,
    },
  ];

  const events = [
    {
      title: "Chapel Service - Guest Speaker",
      date: "Nov 26, 2024",
      time: "10:00 AM",
      location: "Main Chapel",
      attendees: 156,
    },
    {
      title: "Ministry Fair",
      date: "Nov 29, 2024",
      time: "2:00 PM",
      location: "Student Center",
      attendees: 89,
    },
    {
      title: "Prayer & Worship Night",
      date: "Dec 1, 2024",
      time: "7:00 PM",
      location: "Worship Hall",
      attendees: 67,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Community</h1>
          <p className="text-muted-foreground">Connect with fellow students, share prayer requests, and join discussions</p>
        </div>

        <Tabs defaultValue="discussions" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="discussions" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Discussions
            </TabsTrigger>
            <TabsTrigger value="prayer" className="gap-2">
              <Heart className="h-4 w-4" />
              Prayer Wall
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="discussions">
            <div className="mb-6">
              <Button className="w-full sm:w-auto gap-2">
                <MessageCircle className="h-4 w-4" />
                Start New Discussion
              </Button>
            </div>
            
            <div className="space-y-4">
              {discussions.map((discussion, index) => (
                <Card key={index} className="hover:shadow-soft transition-all">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12 bg-gradient-accent flex-shrink-0">
                        <AvatarFallback className="text-accent-foreground font-semibold">
                          {discussion.initials}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{discussion.topic}</h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <span>{discussion.author}</span>
                              <span>•</span>
                              <span>{discussion.course}</span>
                              <span>•</span>
                              <span>{discussion.time}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">{discussion.content}</p>
                        
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="gap-2">
                            <MessageCircle className="h-4 w-4" />
                            {discussion.replies} replies
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Heart className="h-4 w-4" />
                            {discussion.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Share2 className="h-4 w-4" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prayer">
            <div className="mb-6">
              <Button className="w-full sm:w-auto gap-2 bg-gradient-accent hover:opacity-90">
                <Heart className="h-4 w-4" />
                Share Prayer Request
              </Button>
            </div>
            
            <div className="space-y-4">
              {prayerRequests.map((prayer, index) => (
                <Card key={index} className="hover:shadow-soft transition-all border-l-4 border-l-accent">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12 bg-gradient-hero flex-shrink-0">
                        <AvatarFallback className="text-primary-foreground font-semibold">
                          {prayer.initials}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{prayer.author}</h3>
                            <p className="text-xs text-muted-foreground">{prayer.time}</p>
                          </div>
                        </div>
                        
                        <p className="text-sm text-foreground mb-4 leading-relaxed">{prayer.request}</p>
                        
                        <Button variant="outline" size="sm" className="gap-2">
                          <Heart className="h-4 w-4 text-accent" />
                          Praying ({prayer.prayers})
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="space-y-4">
              {events.map((event, index) => (
                <Card key={index} className="hover:shadow-elevated transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{event.title}</h3>
                        <div className="space-y-1 text-sm text-muted-foreground mb-4">
                          <p className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {event.date} at {event.time}
                          </p>
                          <p className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {event.location} • {event.attendees} attending
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="gap-2">
                            <Calendar className="h-4 w-4" />
                            Register
                          </Button>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Community;
