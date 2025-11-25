import { useEffect, useState } from "react";
import { DashboardNav } from "@/components/DashboardNav";
import { WelcomeBanner } from "@/components/WelcomeBanner";
import { NewsCard } from "@/components/NewsCard";
import { ClassCard } from "@/components/ClassCard";
import { StatsCard } from "@/components/StatsCard";
import { BookOpen, Award, Clock, TrendingUp, Megaphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      loadRecentAnnouncements();
    }
  }, [user]);

  const loadRecentAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      console.error("Error loading announcements:", error);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <WelcomeBanner />

        {/* Quick Actions */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-hero p-6 rounded-xl shadow-soft hover:shadow-elevated transition-shadow cursor-pointer" onClick={() => navigate("/assignments")}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-card/20 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-card" />
              </div>
              <div>
                <h3 className="text-card font-semibold text-lg">Assignments</h3>
                <p className="text-card/80 text-sm">3 pending submissions</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-accent p-6 rounded-xl shadow-soft hover:shadow-elevated transition-shadow cursor-pointer" onClick={() => navigate("/schedule")}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-card/20 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-card" />
              </div>
              <div>
                <h3 className="text-card font-semibold text-lg">Today's Schedule</h3>
                <p className="text-card/80 text-sm">2 classes upcoming</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-6 rounded-xl shadow-soft hover:shadow-elevated transition-shadow border border-border cursor-pointer" onClick={() => navigate("/library")}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-lg">E-Library</h3>
                <p className="text-muted-foreground text-sm">Browse resources</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <StatsCard
            title="Current GPA"
            value="3.8"
            icon={Award}
            trend="+0.2 from last semester"
            trendUp={true}
          />
          <StatsCard
            title="Classes Enrolled"
            value="5"
            icon={BookOpen}
          />
          <StatsCard
            title="Hours Studied"
            value="24"
            icon={Clock}
            trend="This week"
          />
          <StatsCard
            title="Completion Rate"
            value="92%"
            icon={TrendingUp}
            trend="+5% this month"
            trendUp={true}
          />
        </div>

        {/* My Classes Section */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">My Classes</h2>
            <button 
              onClick={() => navigate("/classes")}
              className="text-sm text-primary hover:underline font-medium"
            >
              View all →
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ClassCard
              title="Systematic Theology I"
              instructor="Dr. Sarah Johnson"
              time="MWF 10:00 AM"
              nextSession="Today at 10:00 AM"
              status="upcoming"
              progress={68}
            />
            <ClassCard
              title="Biblical Greek"
              instructor="Prof. Michael Chen"
              time="TTh 2:00 PM"
              nextSession="Tomorrow at 2:00 PM"
              status="upcoming"
              progress={45}
            />
            <ClassCard
              title="Church History"
              instructor="Dr. Robert Williams"
              time="MWF 1:00 PM"
              nextSession="Today at 1:00 PM"
              status="live"
              progress={72}
            />
            <ClassCard
              title="Pastoral Counseling"
              instructor="Dr. Emily Davis"
              time="TTh 11:00 AM"
              nextSession="Thursday at 11:00 AM"
              status="upcoming"
              progress={58}
            />
          </div>
        </section>

        {/* Recent Announcements */}
        {announcements.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Megaphone className="h-6 w-6 text-primary" />
                Latest Announcements
              </h2>
              <button 
                onClick={() => navigate("/announcements")}
                className="text-sm text-primary hover:underline font-medium"
              >
                View all →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className="hover:shadow-elevated transition-shadow cursor-pointer" onClick={() => navigate("/announcements")}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{announcement.category}</Badge>
                      {announcement.priority === "high" && (
                        <Badge className="bg-destructive/10 text-destructive">High Priority</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(announcement.created_at), "MMM d, yyyy")}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {announcement.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* News & Updates */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Campus News</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <NewsCard
              title="New Chapel Service Schedule"
              excerpt="Starting next week, chapel services will be held every Tuesday and Thursday at 9:00 AM. All students are encouraged to attend."
              author="Administration Office"
              time="2 hours ago"
              category="Campus News"
            />
            <NewsCard
              title="Spring Semester Registration Opens"
              excerpt="Early registration for Spring semester begins November 15th. Meet with your academic advisor to plan your courses."
              author="Registrar's Office"
              time="5 hours ago"
              category="Academic"
            />
            <NewsCard
              title="Mission Trip Applications Due"
              excerpt="Applications for the summer mission trip to Guatemala are due by December 1st. Don't miss this opportunity to serve."
              author="Mission Department"
              time="1 day ago"
              category="Ministry"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
