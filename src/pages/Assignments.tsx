import { DashboardNav } from "@/components/DashboardNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, FileText, Upload, CheckCircle2 } from "lucide-react";

const Assignments = () => {
  const assignments = [
    {
      title: "Theological Essay: The Doctrine of Grace",
      course: "Systematic Theology I",
      dueDate: "Nov 28, 2024",
      dueTime: "11:59 PM",
      points: 100,
      status: "pending",
      priority: "high",
    },
    {
      title: "Greek Translation: John 3:16-21",
      course: "Biblical Greek",
      dueDate: "Nov 25, 2024",
      dueTime: "11:59 PM",
      points: 50,
      status: "pending",
      priority: "high",
    },
    {
      title: "Church History Timeline Project",
      course: "Church History",
      dueDate: "Dec 5, 2024",
      dueTime: "11:59 PM",
      points: 150,
      status: "in-progress",
      priority: "medium",
    },
    {
      title: "Sermon Outline & Delivery",
      course: "Homiletics & Preaching",
      dueDate: "Dec 1, 2024",
      dueTime: "11:59 PM",
      points: 200,
      status: "in-progress",
      priority: "medium",
    },
    {
      title: "Counseling Case Study Analysis",
      course: "Pastoral Counseling",
      dueDate: "Nov 20, 2024",
      dueTime: "11:59 PM",
      points: 75,
      status: "submitted",
      priority: "low",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Assignments</h1>
          <p className="text-muted-foreground">Track and submit your coursework</p>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="pending">Pending ({assignments.filter(a => a.status === 'pending').length})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="graded">Graded</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-4">
            {assignments.filter(a => a.status === 'pending').map((assignment, index) => (
              <Card key={index} className="hover:shadow-elevated transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{assignment.title}</h3>
                        {assignment.priority === 'high' && (
                          <Badge variant="destructive">High Priority</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{assignment.course}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Due: {assignment.dueDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {assignment.dueTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {assignment.points} points
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="gap-2">
                      <FileText className="h-4 w-4" />
                      View Details
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Submit Work
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            {assignments.filter(a => a.status === 'in-progress').map((assignment, index) => (
              <Card key={index} className="hover:shadow-elevated transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{assignment.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{assignment.course}</p>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Progress</span>
                          <span>60%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-accent w-[60%]" />
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Due: {assignment.dueDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {assignment.points} points
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="gap-2">
                      Continue Working
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Submit Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="submitted" className="space-y-4">
            {assignments.filter(a => a.status === 'submitted').map((assignment, index) => (
              <Card key={index} className="hover:shadow-soft transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <h3 className="text-lg font-semibold text-foreground">{assignment.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{assignment.course}</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Submitted - Awaiting Grade
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="graded">
            <div className="text-center py-12 text-muted-foreground">
              No graded assignments yet
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Assignments;
