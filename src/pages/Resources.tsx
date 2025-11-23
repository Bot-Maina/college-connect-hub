import { DashboardNav } from "@/components/DashboardNav";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Video, FileText, Headphones, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Resources = () => {
  const resourceCategories = [
    {
      title: "Digital Library",
      icon: BookOpen,
      description: "Access thousands of theological books and journals",
      items: ["E-Books", "Journals", "Commentaries", "Reference Works"],
    },
    {
      title: "Video Lectures",
      icon: Video,
      description: "Recorded lectures and educational content",
      items: ["Course Recordings", "Guest Speakers", "Chapel Services", "Tutorials"],
    },
    {
      title: "Study Materials",
      icon: FileText,
      description: "Notes, guides, and supplementary materials",
      items: ["Study Guides", "Lecture Notes", "Practice Exams", "Templates"],
    },
    {
      title: "Audio Resources",
      icon: Headphones,
      description: "Sermons, podcasts, and audio teachings",
      items: ["Sermon Archive", "Podcasts", "Bible Audio", "Music"],
    },
  ];

  const recentResources = [
    {
      title: "Systematic Theology Study Guide",
      type: "PDF Document",
      course: "Systematic Theology I",
      size: "2.4 MB",
    },
    {
      title: "Greek Grammar Reference",
      type: "PDF Document",
      course: "Biblical Greek",
      size: "5.1 MB",
    },
    {
      title: "Church History Timeline",
      type: "Interactive PDF",
      course: "Church History",
      size: "8.3 MB",
    },
    {
      title: "Counseling Case Studies",
      type: "Video Collection",
      course: "Pastoral Counseling",
      size: "156 MB",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Learning Resources</h1>
          <p className="text-muted-foreground">Access course materials, library resources, and study aids</p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search resources, books, videos..." 
            className="pl-10 py-6 text-lg"
          />
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resourceCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-elevated transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <category.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                  <ul className="space-y-1">
                    {category.items.map((item, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 bg-accent rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Recently Accessed</h2>
          <div className="space-y-4">
            {recentResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-soft transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{resource.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span>{resource.type}</span>
                          <span>•</span>
                          <span>{resource.course}</span>
                          <span>•</span>
                          <span>{resource.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Open
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <Card className="bg-gradient-hero text-primary-foreground">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-2">
                Need Help Finding Resources?
              </h3>
              <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                Our library staff and academic advisors are here to help you find the materials you need for your studies.
              </p>
              <div className="flex gap-3 justify-center">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Contact Librarian
                </Button>
                <Button size="lg" variant="outline" className="bg-background/95 hover:bg-background text-foreground border-primary-foreground/20">
                  Request Material
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Resources;
