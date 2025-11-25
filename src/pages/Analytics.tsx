import { useState, useEffect } from "react";
import { DashboardNav } from "@/components/DashboardNav";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, FileText, TrendingUp, GraduationCap, Award } from "lucide-react";

export default function Analytics() {
  const { user } = useAuth();
  const { isAdmin, isFaculty } = useUserRole();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalAssignments: 0,
    activeEnrollments: 0,
    submissionRate: 0,
    averageGrade: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && (isAdmin || isFaculty)) {
      loadAnalytics();
    }
  }, [user, isAdmin, isFaculty]);

  const loadAnalytics = async () => {
    setLoading(true);

    const [
      { count: studentCount },
      { count: courseCount },
      { count: assignmentCount },
      { count: enrollmentCount },
      { data: submissions },
      { data: graded },
    ] = await Promise.all([
      supabase.from("user_roles").select("*", { count: "exact", head: true }).eq("role", "student"),
      supabase.from("courses").select("*", { count: "exact", head: true }),
      supabase.from("assignments").select("*", { count: "exact", head: true }),
      supabase.from("course_enrollments").select("*", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("assignment_submissions").select("id"),
      supabase.from("assignment_submissions").select("grade").not("grade", "is", null),
    ]);

    const submissionRate = assignmentCount && submissions
      ? (submissions.length / (assignmentCount * (studentCount || 1))) * 100
      : 0;

    const averageGrade = graded && graded.length > 0
      ? graded.reduce((sum, s) => sum + (s.grade || 0), 0) / graded.length
      : 0;

    setStats({
      totalStudents: studentCount || 0,
      totalCourses: courseCount || 0,
      totalAssignments: assignmentCount || 0,
      activeEnrollments: enrollmentCount || 0,
      submissionRate: Math.round(submissionRate),
      averageGrade: Math.round(averageGrade),
    });

    setLoading(false);
  };

  if (!isAdmin && !isFaculty) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Access denied. Admin and faculty only.</p>
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
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Overview of institutional performance</p>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading analytics...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalStudents}</div>
                <p className="text-xs text-muted-foreground">Active student accounts</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCourses}</div>
                <p className="text-xs text-muted-foreground">Available courses</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalAssignments}</div>
                <p className="text-xs text-muted-foreground">Across all courses</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Enrollments</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeEnrollments}</div>
                <p className="text-xs text-muted-foreground">Current semester</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Submission Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.submissionRate}%</div>
                <p className="text-xs text-muted-foreground">Assignment completion</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averageGrade}%</div>
                <p className="text-xs text-muted-foreground">Across graded work</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
