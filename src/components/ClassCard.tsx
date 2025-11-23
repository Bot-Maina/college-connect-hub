import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Clock, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ClassCardProps {
  title: string;
  instructor: string;
  time: string;
  nextSession: string;
  status: "live" | "upcoming" | "completed";
  progress?: number;
}

export const ClassCard = ({ 
  title, 
  instructor, 
  time, 
  nextSession, 
  status,
  progress = 0
}: ClassCardProps) => {
  return (
    <Card className="hover:shadow-elevated transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{instructor}</p>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {time}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {nextSession}
              </span>
            </div>
          </div>
          {status === "live" && (
            <Badge className="bg-destructive text-destructive-foreground animate-pulse">
              Live
            </Badge>
          )}
          {status === "upcoming" && (
            <Badge variant="secondary" className="bg-accent/10 text-accent">
              Upcoming
            </Badge>
          )}
        </div>
        
        {progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {status === "live" ? (
            <Button className="w-full bg-destructive hover:bg-destructive/90 gap-2">
              <Video className="h-4 w-4" />
              Join Now
            </Button>
          ) : (
            <>
              <Button variant="outline" className="flex-1 gap-2">
                <BookOpen className="h-4 w-4" />
                Materials
              </Button>
              <Button className="flex-1 gap-2 bg-primary hover:bg-primary/90">
                View Details
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
