import { DashboardNav } from "@/components/DashboardNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const Schedule = () => {
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  const schedule = {
    Monday: [
      { time: "10:00 AM - 11:30 AM", class: "Systematic Theology I", instructor: "Dr. Sarah Johnson", room: "Room 204", type: "lecture" },
      { time: "1:00 PM - 2:30 PM", class: "Church History", instructor: "Dr. Robert Williams", room: "Room 301", type: "lecture" },
      { time: "3:00 PM - 4:30 PM", class: "Homiletics & Preaching", instructor: "Rev. James Thompson", room: "Chapel", type: "workshop" },
    ],
    Tuesday: [
      { time: "11:00 AM - 12:30 PM", class: "Pastoral Counseling", instructor: "Dr. Emily Davis", room: "Room 105", type: "seminar" },
      { time: "2:00 PM - 3:30 PM", class: "Biblical Greek", instructor: "Prof. Michael Chen", room: "Room 208", type: "lecture" },
    ],
    Wednesday: [
      { time: "9:00 AM - 10:00 AM", class: "Chapel Service", instructor: "Guest Speaker", room: "Main Chapel", type: "chapel" },
      { time: "10:00 AM - 11:30 AM", class: "Systematic Theology I", instructor: "Dr. Sarah Johnson", room: "Room 204", type: "lecture" },
      { time: "1:00 PM - 2:30 PM", class: "Church History", instructor: "Dr. Robert Williams", room: "Room 301", type: "lecture" },
      { time: "3:00 PM - 4:30 PM", class: "Homiletics & Preaching", instructor: "Rev. James Thompson", room: "Chapel", type: "workshop" },
    ],
    Thursday: [
      { time: "11:00 AM - 12:30 PM", class: "Pastoral Counseling", instructor: "Dr. Emily Davis", room: "Room 105", type: "seminar" },
      { time: "2:00 PM - 3:30 PM", class: "Biblical Greek", instructor: "Prof. Michael Chen", room: "Room 208", type: "lecture" },
    ],
    Friday: [
      { time: "10:00 AM - 11:30 AM", class: "Systematic Theology I", instructor: "Dr. Sarah Johnson", room: "Room 204", type: "lecture" },
      { time: "1:00 PM - 2:30 PM", class: "Church History", instructor: "Dr. Robert Williams", room: "Room 301", type: "lecture" },
    ],
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "lecture": return "bg-primary/10 text-primary";
      case "seminar": return "bg-accent/10 text-accent";
      case "workshop": return "bg-secondary/10 text-secondary";
      case "chapel": return "bg-gradient-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Class Schedule</h1>
          <p className="text-muted-foreground">View your weekly class schedule and upcoming events</p>
        </div>

        <Card className="mb-8 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Week of November 25, 2024</h2>
                  <p className="text-sm text-muted-foreground">Fall Semester 2024</p>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Video className="h-4 w-4" />
                  Virtual Classes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {weekDays.map((day) => (
            <Card key={day} className="hover:shadow-soft transition-all">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-4 pb-2 border-b border-border">
                  {day}
                </h3>
                <div className="space-y-3">
                  {schedule[day as keyof typeof schedule]?.map((item, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg border border-border hover:shadow-sm transition-all cursor-pointer ${
                        item.type === 'chapel' ? 'bg-gradient-accent' : 'bg-card'
                      }`}
                    >
                      <div className={`text-xs px-2 py-1 rounded-md inline-block mb-2 ${getTypeColor(item.type)}`}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </div>
                      <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.time}
                      </p>
                      <p className={`text-sm font-semibold mb-1 ${item.type === 'chapel' ? 'text-accent-foreground' : 'text-foreground'}`}>
                        {item.class}
                      </p>
                      <p className={`text-xs ${item.type === 'chapel' ? 'text-accent-foreground/80' : 'text-muted-foreground'}`}>
                        {item.instructor}
                      </p>
                      <p className={`text-xs flex items-center gap-1 mt-1 ${item.type === 'chapel' ? 'text-accent-foreground/80' : 'text-muted-foreground'}`}>
                        <MapPin className="h-3 w-3" />
                        {item.room}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-gradient-hero text-primary-foreground">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Office Hours & Academic Support</h3>
                <p className="opacity-90">
                  Need help with coursework? Visit your professors during office hours or schedule tutoring sessions.
                </p>
              </div>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                View Office Hours
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Schedule;
