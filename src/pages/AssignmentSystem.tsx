import { useState, useEffect } from "react";
import { DashboardNav } from "@/components/DashboardNav";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { FileText, Upload, CheckCircle, Clock, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Assignment {
  id: string;
  title: string;
  description: string;
  due_date: string;
  points: number;
  assignment_type: string;
  course_id: string;
  courses?: { course_name: string; course_code: string };
  submission?: { status: string; grade: number; submitted_at: string };
}

export default function AssignmentSystem() {
  const { user } = useAuth();
  const { isFaculty, isAdmin, isStudent } = useUserRole();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submissionDialog, setSubmissionDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [formData, setFormData] = useState({
    course_id: "",
    title: "",
    description: "",
    due_date: "",
    points: 100,
    assignment_type: "homework",
  });
  const [submissionText, setSubmissionText] = useState("");

  useEffect(() => {
    if (user) {
      if (isFaculty || isAdmin) {
        loadFacultyCourses();
        loadFacultyAssignments();
      } else if (isStudent) {
        loadStudentAssignments();
      }
    }
  }, [user, isFaculty, isAdmin, isStudent]);

  const loadFacultyCourses = async () => {
    const { data } = await supabase
      .from("courses")
      .select("*")
      .eq("instructor_id", user?.id);
    setCourses(data || []);
  };

  const loadFacultyAssignments = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("assignments")
      .select(`
        *,
        courses(course_name, course_code)
      `)
      .eq("created_by", user?.id)
      .order("due_date", { ascending: true });

    setAssignments(data || []);
    setLoading(false);
  };

  const loadStudentAssignments = async () => {
    setLoading(true);
    const { data: enrollments } = await supabase
      .from("course_enrollments")
      .select("course_id")
      .eq("student_id", user?.id);

    const courseIds = enrollments?.map(e => e.course_id) || [];

    if (courseIds.length > 0) {
      const { data } = await supabase
        .from("assignments")
        .select(`
          *,
          courses(course_name, course_code),
          assignment_submissions!left(status, grade, submitted_at)
        `)
        .in("course_id", courseIds)
        .order("due_date", { ascending: true });

      const assignmentsWithSubmission = data?.map(a => ({
        ...a,
        submission: a.assignment_submissions?.[0] || null
      }));
      setAssignments(assignmentsWithSubmission || []);
    }
    setLoading(false);
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from("assignments")
      .insert([{ ...formData, created_by: user?.id }]);

    if (error) {
      toast.error("Failed to create assignment");
    } else {
      toast.success("Assignment created successfully");
      loadFacultyAssignments();
      setDialogOpen(false);
      resetForm();
    }
  };

  const handleSubmitAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from("assignment_submissions")
      .insert([{
        assignment_id: selectedAssignment?.id,
        student_id: user?.id,
        submission_text: submissionText,
        status: "submitted"
      }]);

    if (error) {
      toast.error("Failed to submit assignment");
    } else {
      toast.success("Assignment submitted successfully");
      loadStudentAssignments();
      setSubmissionDialog(false);
      setSubmissionText("");
    }
  };

  const resetForm = () => {
    setFormData({
      course_id: "",
      title: "",
      description: "",
      due_date: "",
      points: 100,
      assignment_type: "homework",
    });
  };

  const getStatusBadge = (assignment: Assignment) => {
    if (!assignment.submission) {
      return <Badge variant="secondary">Not Submitted</Badge>;
    }
    if (assignment.submission.grade !== null) {
      return <Badge variant="default">Graded: {assignment.submission.grade}%</Badge>;
    }
    return <Badge>Submitted</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Assignments</h1>
            <p className="text-muted-foreground">
              {isFaculty || isAdmin ? "Manage course assignments" : "View and submit your assignments"}
            </p>
          </div>
          {(isFaculty || isAdmin) && (
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Assignment
            </Button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-8">Loading assignments...</div>
        ) : assignments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No assignments yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {assignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{assignment.title}</CardTitle>
                      <CardDescription>
                        {assignment.courses?.course_code} - {assignment.courses?.course_name}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {isStudent && getStatusBadge(assignment)}
                      <Badge variant="outline">{assignment.points} pts</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{assignment.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Due: {format(new Date(assignment.due_date), "PPp")}</span>
                      </div>
                      <Badge variant="secondary">{assignment.assignment_type}</Badge>
                    </div>
                    {isStudent && !assignment.submission && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedAssignment(assignment);
                          setSubmissionDialog(true);
                        }}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Submit
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Create Assignment Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select value={formData.course_id} onValueChange={(value) => setFormData({ ...formData, course_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.course_code} - {course.course_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="due_date">Due Date</Label>
                  <Input
                    id="due_date"
                    type="datetime-local"
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="points">Points</Label>
                  <Input
                    id="points"
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.assignment_type} onValueChange={(value) => setFormData({ ...formData, assignment_type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homework">Homework</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Assignment</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Submit Assignment Dialog */}
        <Dialog open={submissionDialog} onOpenChange={setSubmissionDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Assignment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitAssignment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="submission">Your Submission</Label>
                <Textarea
                  id="submission"
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  rows={8}
                  placeholder="Enter your assignment submission here..."
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setSubmissionDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
