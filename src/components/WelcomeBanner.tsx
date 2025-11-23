import { Button } from "@/components/ui/button";
import { Calendar, Video } from "lucide-react";
import heroCampus from "@/assets/hero-campus.jpg";

export const WelcomeBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-hero shadow-elevated animate-fade-in">
      <div className="absolute inset-0 opacity-10">
        <img 
          src={heroCampus} 
          alt="Campus" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative px-8 py-12 md:px-12 md:py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
            Welcome Back, John!
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-6">
            You have 3 upcoming classes today and 2 assignments due this week.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 shadow-lg"
            >
              <Video className="h-5 w-5" />
              Join Live Class
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-background/95 hover:bg-background border-primary-foreground/20 text-foreground gap-2"
            >
              <Calendar className="h-5 w-5" />
              View Schedule
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
