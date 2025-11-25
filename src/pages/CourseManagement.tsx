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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Users, BookOpen, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Course {
  id: string;
  course_code: string;
  course_name: string;
  description: string;
  credits: number;
  semester: string;
  year: number;
  max_students: number;
  status: string;
  enrollment_count?: number;
}

export default function CourseManagement() {
  const { user } = useAuth();
  const { isFaculty, isAdmin } = useUserRole();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    course_code: "",
    course_name: "",
    description: "",
    credits: 3,
    semester: "Fall",
    year: new Date().getFullYear(),
    max_students: 30,
    status: "active",
  });

  useEffect(() => {
    if (user && (isFaculty || isAdmin)) {
      loadCourses();
    }
  }, [user, isFaculty, isAdmin]);

  const loadCourses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("courses")
      .select(`
        *,
        course_enrollments(count)
      `)
      .eq("instructor_id", user?.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load courses");
      console.error(error);
    } else {
      const coursesWithCount = data?.map(course => ({
        ...course,
        enrollment_count: course.course_enrollments?.[0]?.count || 0
      }));
      setCourses(coursesWithCount || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCourse) {
      const { error } = await supabase
        .from("courses")
        .update(formData)
        .eq("id", editingCourse.id);

      if (error) {
        toast.error("Failed to update course");
        console.error(error);
      } else {
        toast.success("Course updated successfully");
        loadCourses();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from("courses")
        .insert([{ ...formData, instructor_id: user?.id }]);

      if (error) {
        toast.error("Failed to create course");
        console.error(error);
      } else {
        toast.success("Course created successfully");
        loadCourses();
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    const { error } = await supabase
      .from("courses")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete course");
      console.error(error);
    } else {
      toast.success("Course deleted successfully");
      loadCourses();
    }
  };

  const resetForm = () => {
    setFormData({
      course_code: "",
      course_name: "",
      description: "",
      credits: 3,
      semester: "Fall",
      year: new Date().getFullYear(),
      max_students: 30,
      status: "active",
    });
    setEditingCourse(null);
    setDialogOpen(false);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      course_code: course.course_code,
      course_name: course.course_name,
      description: course.description,
      credits: course.credits,
      semester: course.semester,
      year: course.year,
      max_students: course.max_students,
      status: course.status,
    });
    setDialogOpen(true);
  };

  if (!isFaculty && !isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Access denied. Faculty and admin only.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Course Management</h1>
            <p className="text-muted-foreground">Manage your courses and enrollments</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingCourse(null)}>
                <Plus className="mr-2 h-4 w-4" />
                New Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingCourse ? "Edit Course" : "Create New Course"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course_code">Course Code</Label>
                    <Input
                      id="course_code"
                      value={formData.course_code}
                      onChange={(e) => setFormData({ ...formData, course_code: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="credits">Credits</Label>
                    <Input
                      id="credits"
                      type="number"
                      value={formData.credits}
                      onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course_name">Course Name</Label>
                  <Input
                    id="course_name"
                    value={formData.course_name}
                    onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
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
                    <Label htmlFor="semester">Semester</Label>
                    <Select value={formData.semester} onValueChange={(value) => setFormData({ ...formData, semester: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fall">Fall</SelectItem>
                        <SelectItem value="Spring">Spring</SelectItem>
                        <SelectItem value="Summer">Summer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max_students">Max Students</Label>
                    <Input
                      id="max_students"
                      type="number"
                      value={formData.max_students}
                      onChange={(e) => setFormData({ ...formData, max_students: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingCourse ? "Update" : "Create"} Course
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading courses...</div>
        ) : courses.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No courses yet. Create your first course!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{course.course_name}</CardTitle>
                      <CardDescription>{course.course_code}</CardDescription>
                    </div>
                    <Badge variant={course.status === "active" ? "default" : "secondary"}>
                      {course.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.enrollment_count}/{course.max_students}</span>
                    </div>
                    <div>{course.credits} credits</div>
                    <div>{course.semester} {course.year}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(course)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(course.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
