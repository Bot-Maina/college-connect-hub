import { useEffect } from "react";
import { DashboardNav } from "@/components/DashboardNav";
import { WelcomeBanner } from "@/components/WelcomeBanner";
import { NewsCard } from "@/components/NewsCard";
import { ClassCard } from "@/components/ClassCard";
import { StatsCard } from "@/components/StatsCard";
import { BookOpen, Award, Clock, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);
  
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeBanner />

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
              className="text-sm text-primary hover:underline"
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

        {/* News & Announcements */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">News & Announcements</h2>
            <a href="#" className="text-sm text-primary hover:underline">View all →</a>
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
