import { useState, useEffect } from "react";
import { DashboardNav } from "@/components/DashboardNav";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Plus, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO } from "date-fns";

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  event_type: string;
  start_time: string;
  end_time: string;
  location: string;
  all_day: boolean;
  courses?: { course_name: string };
}

export default function CalendarView() {
  const { user } = useAuth();
  const { isFaculty, isAdmin } = useUserRole();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_type: "class",
    start_time: "",
    end_time: "",
    location: "",
    all_day: false,
  });

  useEffect(() => {
    if (user) {
      loadEvents();
    }
  }, [user, selectedDate]);

  const loadEvents = async () => {
    setLoading(true);
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);

    const { data: calendarEvents } = await supabase
      .from("calendar_events")
      .select("*, courses(course_name)")
      .gte("start_time", start.toISOString())
      .lte("start_time", end.toISOString());

    const { data: assignments } = await supabase
      .from("assignments")
      .select("*, courses(course_name)")
      .gte("due_date", start.toISOString())
      .lte("due_date", end.toISOString());

    const { data: chapelEvents } = await supabase
      .from("chapel_attendance")
      .select("*")
      .gte("event_date", start.toISOString().split("T")[0])
      .lte("event_date", end.toISOString().split("T")[0]);

    const allEvents: CalendarEvent[] = [
      ...(calendarEvents || []),
      ...(assignments?.map(a => ({
        id: a.id,
        title: `Due: ${a.title}`,
        description: a.description,
        event_type: "assignment",
        start_time: a.due_date,
        end_time: a.due_date,
        location: "",
        all_day: false,
        courses: a.courses,
      })) || []),
      ...(chapelEvents?.map(c => ({
        id: c.id,
        title: c.event_name,
        description: c.event_type,
        event_type: "chapel",
        start_time: c.event_date,
        end_time: c.event_date,
        location: "",
        all_day: true,
      })) || []),
    ];

    setEvents(allEvents);
    setLoading(false);
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from("calendar_events")
      .insert([{ ...formData, created_by: user?.id }]);

    if (error) {
      toast.error("Failed to create event");
    } else {
      toast.success("Event created successfully");
      loadEvents();
      setDialogOpen(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      event_type: "class",
      start_time: "",
      end_time: "",
      location: "",
      all_day: false,
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "class":
        return "default";
      case "assignment":
        return "destructive";
      case "chapel":
        return "secondary";
      case "exam":
        return "outline";
      default:
        return "default";
    }
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  });

  const getEventsForDay = (day: Date) => {
    return events.filter(event =>
      isSameDay(parseISO(event.start_time), day)
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="text-muted-foreground">View all your events and deadlines</p>
          </div>
          {(isFaculty || isAdmin) && (
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Button>
          )}
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{format(selectedDate, "MMMM yyyy")}</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedDate(new Date())}
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="text-center font-semibold text-sm p-2">
                  {day}
                </div>
              ))}
              {daysInMonth.map((day, idx) => {
                const dayEvents = getEventsForDay(day);
                const isToday = isSameDay(day, new Date());
                return (
                  <div
                    key={idx}
                    className={`min-h-24 border rounded-lg p-2 ${
                      isToday ? "bg-accent border-primary" : ""
                    }`}
                  >
                    <div className="text-sm font-medium mb-1">{format(day, "d")}</div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map(event => (
                        <div
                          key={event.id}
                          className="text-xs p-1 rounded bg-primary/10 truncate"
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading events...</div>
            ) : events.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="mx-auto h-12 w-12 mb-2" />
                <p>No events scheduled</p>
              </div>
            ) : (
              <div className="space-y-4">
                {events.slice(0, 10).map(event => (
                  <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{event.title}</h3>
                        <Badge variant={getEventTypeColor(event.event_type)}>
                          {event.event_type}
                        </Badge>
                      </div>
                      {event.description && (
                        <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {format(parseISO(event.start_time), "PPp")}
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateEvent} className="space-y-4">
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
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event_type">Event Type</Label>
                  <Select value={formData.event_type} onValueChange={(value) => setFormData({ ...formData, event_type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class">Class</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_time">Start Time</Label>
                  <Input
                    id="start_time"
                    type="datetime-local"
                    value={formData.start_time}
                    onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_time">End Time</Label>
                  <Input
                    id="end_time"
                    type="datetime-local"
                    value={formData.end_time}
                    onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Event</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
