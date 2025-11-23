import { DashboardNav } from "@/components/DashboardNav";
import { ClassCard } from "@/components/ClassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";

const Classes = () => {
  const allClasses = [
    {
      title: "Systematic Theology I",
      instructor: "Dr. Sarah Johnson",
      time: "MWF 10:00 AM",
      nextSession: "Today at 10:00 AM",
      status: "upcoming" as const,
      progress: 68,
    },
    {
      title: "Biblical Greek",
      instructor: "Prof. Michael Chen",
      time: "TTh 2:00 PM",
      nextSession: "Tomorrow at 2:00 PM",
      status: "upcoming" as const,
      progress: 45,
    },
    {
      title: "Church History",
      instructor: "Dr. Robert Williams",
      time: "MWF 1:00 PM",
      nextSession: "Today at 1:00 PM",
      status: "live" as const,
      progress: 72,
    },
    {
      title: "Pastoral Counseling",
      instructor: "Dr. Emily Davis",
      time: "TTh 11:00 AM",
      nextSession: "Thursday at 11:00 AM",
      status: "upcoming" as const,
      progress: 58,
    },
    {
      title: "Homiletics & Preaching",
      instructor: "Rev. James Thompson",
      time: "MW 3:00 PM",
      nextSession: "Wednesday at 3:00 PM",
      status: "upcoming" as const,
      progress: 81,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Classes</h1>
          <p className="text-muted-foreground">Manage your enrolled courses and class schedules</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search classes..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Classes</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {allClasses.map((classData, index) => (
                <ClassCard key={index} {...classData} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="active">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {allClasses.map((classData, index) => (
                <ClassCard key={index} {...classData} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="text-center py-12 text-muted-foreground">
              No completed classes this semester
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Classes;
