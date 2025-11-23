import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";

interface NewsCardProps {
  title: string;
  excerpt: string;
  author: string;
  time: string;
  category: string;
  categoryColor?: string;
}

export const NewsCard = ({ 
  title, 
  excerpt, 
  author, 
  time, 
  category,
  categoryColor = "default"
}: NewsCardProps) => {
  return (
    <Card className="hover:shadow-elevated transition-all duration-300 cursor-pointer group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">
            {category}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {time}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {excerpt}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <User className="h-3 w-3" />
          <span>{author}</span>
        </div>
      </CardContent>
    </Card>
  );
};
