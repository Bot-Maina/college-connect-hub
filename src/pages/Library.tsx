import { DashboardNav } from "@/components/DashboardNav";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Filter, Download, ExternalLink } from "lucide-react";

const Library = () => {
  const categories = [
    { name: "All", count: 284 },
    { name: "Theology", count: 87 },
    { name: "Biblical Studies", count: 65 },
    { name: "Church History", count: 42 },
    { name: "Pastoral Care", count: 38 },
    { name: "Ministry", count: 52 },
  ];

  const resources = [
    {
      title: "Systematic Theology: An Introduction to Biblical Doctrine",
      author: "Wayne Grudem",
      category: "Theology",
      type: "E-Book",
      year: 2020,
      pages: 1291,
      isbn: "978-0310517849",
      description: "A comprehensive systematic theology reference work.",
    },
    {
      title: "The New Testament: A Historical Introduction",
      author: "Bart D. Ehrman",
      category: "Biblical Studies",
      type: "E-Book",
      year: 2019,
      pages: 528,
      isbn: "978-0190203825",
      description: "An introduction to the books of the New Testament.",
    },
    {
      title: "Church History in Plain Language",
      author: "Bruce L. Shelley",
      category: "Church History",
      type: "E-Book",
      year: 2013,
      pages: 576,
      isbn: "978-0718025533",
      description: "A comprehensive overview of church history.",
    },
    {
      title: "The Contemplative Pastor",
      author: "Eugene H. Peterson",
      category: "Pastoral Care",
      type: "E-Book",
      year: 1989,
      pages: 192,
      isbn: "978-0802806284",
      description: "Reflections on pastoral ministry and spirituality.",
    },
    {
      title: "The Purpose Driven Church",
      author: "Rick Warren",
      category: "Ministry",
      type: "E-Book",
      year: 1995,
      pages: 416,
      isbn: "978-0310201069",
      description: "Growth strategies for healthy churches.",
    },
    {
      title: "The Cost of Discipleship",
      author: "Dietrich Bonhoeffer",
      category: "Theology",
      type: "E-Book",
      year: 1959,
      pages: 320,
      isbn: "978-0684815008",
      description: "Classic work on Christian discipleship and grace.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">E-Library</h1>
          <p className="text-muted-foreground">Access our digital theological library collection</p>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search books, authors, topics..." 
              className="pl-10 py-6 text-lg"
            />
          </div>
          <Button variant="outline" size="lg" className="gap-2">
            <Filter className="h-5 w-5" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category.name} value={category.name.toLowerCase()}>
                {category.name}
                <Badge variant="secondary" className="ml-2 bg-accent/20">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <Card key={index} className="hover:shadow-elevated transition-all">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-20 h-28 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-10 w-10 text-accent-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{resource.author}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {resource.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary">{resource.category}</Badge>
                          <Badge variant="outline">{resource.type}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center">
                            {resource.pages} pages • {resource.year}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Read
                          </Button>
                          <Button size="sm" variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <section className="mt-12">
          <Card className="bg-gradient-hero text-primary-foreground">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-2">
                Can't Find What You Need?
              </h3>
              <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                Request new resources or ask our librarians for assistance in finding specific materials for your studies.
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Request Resource
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Library;
