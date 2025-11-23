import { DashboardNav } from "@/components/DashboardNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, TrendingUp, TrendingDown } from "lucide-react";

const Grades = () => {
  const currentSemester = [
    { course: "Systematic Theology I", grade: "A", percentage: 92, credits: 4, trend: "up" },
    { course: "Biblical Greek", grade: "B+", percentage: 87, credits: 3, trend: "up" },
    { course: "Church History", grade: "A-", percentage: 90, credits: 3, trend: "stable" },
    { course: "Pastoral Counseling", grade: "A", percentage: 95, credits: 3, trend: "up" },
    { course: "Homiletics & Preaching", grade: "B+", percentage: 88, credits: 4, trend: "down" },
  ];

  const gpaHistory = [
    { semester: "Fall 2024", gpa: 3.78, credits: 17 },
    { semester: "Spring 2024", gpa: 3.65, credits: 16 },
    { semester: "Fall 2023", gpa: 3.82, credits: 15 },
    { semester: "Spring 2023", gpa: 3.71, credits: 16 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Academic Performance</h1>
          <p className="text-muted-foreground">Track your grades and GPA</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current GPA</p>
                  <p className="text-4xl font-bold text-foreground">3.78</p>
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +0.13 from last semester
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elevated">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Cumulative GPA</p>
              <p className="text-4xl font-bold text-foreground">3.74</p>
              <p className="text-xs text-muted-foreground mt-2">
                64 total credits earned
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-elevated">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Class Rank</p>
              <p className="text-4xl font-bold text-foreground">12th</p>
              <p className="text-xs text-muted-foreground mt-2">
                Out of 156 students
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="current">Current Semester</TabsTrigger>
            <TabsTrigger value="history">GPA History</TabsTrigger>
            <TabsTrigger value="transcript">Unofficial Transcript</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current">
            <Card>
              <CardHeader>
                <CardTitle>Fall 2024 Grades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentSemester.map((course, index) => (
                    <div key={index} className="border-b border-border pb-6 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{course.course}</h3>
                          <p className="text-sm text-muted-foreground">{course.credits} Credits</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-foreground">{course.grade}</p>
                          <p className="text-sm text-muted-foreground">{course.percentage}%</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Progress value={course.percentage} className="h-2" />
                        <div className="flex items-center gap-2 text-xs">
                          {course.trend === "up" && (
                            <span className="text-green-600 flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              Improving
                            </span>
                          )}
                          {course.trend === "down" && (
                            <span className="text-amber-600 flex items-center gap-1">
                              <TrendingDown className="h-3 w-3" />
                              Needs attention
                            </span>
                          )}
                          {course.trend === "stable" && (
                            <span className="text-muted-foreground">
                              Consistent performance
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Semester GPA History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gpaHistory.map((semester, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-semibold text-foreground">{semester.semester}</p>
                        <p className="text-sm text-muted-foreground">{semester.credits} Credits</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">{semester.gpa}</p>
                        <p className="text-xs text-muted-foreground">GPA</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transcript">
            <Card>
              <CardContent className="p-8 text-center">
                <Award className="h-16 w-16 mx-auto mb-4 text-accent" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Official Transcript Request
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Request your official transcript for transfer applications, employment, or personal records.
                </p>
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Request Transcript
                </button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Grades;
