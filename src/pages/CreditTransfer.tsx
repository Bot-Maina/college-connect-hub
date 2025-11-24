import { DashboardNav } from "@/components/DashboardNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  Plus, 
  FileText,
  Award,
  GraduationCap
} from "lucide-react";

const CreditTransfer = () => {
  const applications = [
    {
      id: 1,
      institution: "University of Biblical Studies",
      course: "Old Testament Survey",
      code: "BIB101",
      credits: 3,
      grade: "A",
      date: "2023-05-15",
      status: "approved",
    },
    {
      id: 2,
      institution: "Christian Leadership Academy",
      course: "Ministry Leadership",
      code: "MIN201",
      credits: 4,
      grade: "B+",
      date: "2023-08-20",
      status: "pending",
    },
    {
      id: 3,
      institution: "Theological Seminary",
      course: "Systematic Theology",
      code: "THE301",
      credits: 3,
      grade: "A-",
      date: "2023-02-10",
      status: "under_review",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "under_review":
        return <FileText className="h-5 w-5 text-blue-500" />;
      default:
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", text: string }> = {
      approved: { variant: "default", text: "Approved" },
      pending: { variant: "secondary", text: "Pending" },
      under_review: { variant: "outline", text: "Under Review" },
      rejected: { variant: "destructive", text: "Rejected" },
    };
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Recognition of Prior Learning (RPL)
          </h1>
          <p className="text-muted-foreground">
            Transfer credits from previous theological education and life experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Applied</p>
                  <p className="text-2xl font-bold text-foreground">10</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Credits Earned</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Applications</CardTitle>
                <CardDescription>
                  Track the status of your credit transfer requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((app) => (
                    <Card key={app.id} className="hover:shadow-soft transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-3">
                            {getStatusIcon(app.status)}
                            <div>
                              <h3 className="font-semibold text-foreground mb-1">
                                {app.course}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {app.institution} • {app.code}
                              </p>
                            </div>
                          </div>
                          {getStatusBadge(app.status)}
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Credits</p>
                            <p className="font-semibold text-foreground">{app.credits}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Grade</p>
                            <p className="font-semibold text-foreground">{app.grade}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Completed</p>
                            <p className="font-semibold text-foreground">
                              {new Date(app.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Apply for Credit Transfer</CardTitle>
                <CardDescription>
                  Submit a new credit transfer request
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution Name</Label>
                    <Input id="institution" placeholder="Previous institution" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Course Name</Label>
                    <Input id="course" placeholder="Course title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Course Code</Label>
                    <Input id="code" placeholder="e.g., BIB101" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="credits">Credits</Label>
                      <Input id="credits" type="number" placeholder="3" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade</Label>
                      <Input id="grade" placeholder="A" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Completion Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Any relevant information about the course..."
                      rows={3}
                    />
                  </div>
                  <Button className="w-full gap-2">
                    <Plus className="h-4 w-4" />
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="mt-6 bg-blue-500/5 border-blue-500/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  RPL Guidelines
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Maximum 30 credits transferable</li>
                  <li>• Minimum grade of C required</li>
                  <li>• Courses must be from accredited institutions</li>
                  <li>• Life experience may qualify for up to 15 credits</li>
                  <li>• Processing time: 2-4 weeks</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreditTransfer;
