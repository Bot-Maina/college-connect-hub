import { useState } from "react";
import { DashboardNav } from "@/components/DashboardNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  HelpCircle, 
  BookOpen, 
  Video,
  Clock,
  Send
} from "lucide-react";

const Support = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission
    setTimeout(() => {
      toast({
        title: "Ticket Submitted",
        description: "We've received your support request and will respond within 24 hours.",
      });
      setFormData({ subject: "", category: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Support Center</h1>
          <p className="text-muted-foreground">Get help with your account, courses, and technical issues</p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-elevated transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">Chat with our support team</p>
                <Button variant="outline" size="sm">Start Chat</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elevated transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-4">support@ministrycollege.edu</p>
                <Button variant="outline" size="sm">Send Email</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elevated transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-sm text-muted-foreground mb-4">+1 (555) 123-4567</p>
                <Button variant="outline" size="sm">Call Now</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Submit Ticket Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Submit a Support Ticket</CardTitle>
                <CardDescription>Describe your issue and we'll get back to you soon</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="technical">Technical Issue</option>
                      <option value="account">Account Problem</option>
                      <option value="course">Course Content</option>
                      <option value="billing">Billing Question</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Provide detailed information about your issue..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Submitting..." : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Ticket
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                    <AccordionContent>
                      Go to Settings → Security and click "Update Password". You'll receive a password reset link via email.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How can I access course materials?</AccordionTrigger>
                    <AccordionContent>
                      Navigate to Classes → Select your course → Course Materials. All readings, videos, and assignments are available there.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What are the chapel attendance requirements?</AccordionTrigger>
                    <AccordionContent>
                      Students are required to attend chapel services twice weekly. Track your attendance in the Spiritual Life section.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I apply for RPL credit transfer?</AccordionTrigger>
                    <AccordionContent>
                      Visit the RPL/Credits page, click "Request Credit Transfer", and submit your previous coursework documentation for review.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Where can I find my grades?</AccordionTrigger>
                    <AccordionContent>
                      Access your grades by clicking on Grades in the navigation menu or through your profile dropdown.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Resources Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Support Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Monday - Friday</p>
                    <p className="text-sm text-muted-foreground">8:00 AM - 8:00 PM EST</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Saturday - Sunday</p>
                    <p className="text-sm text-muted-foreground">10:00 AM - 4:00 PM EST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Helpful Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Student Handbook
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Video className="h-4 w-4 mr-2" />
                  Tutorial Videos
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Getting Started Guide
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-hero text-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Need Immediate Help?</h3>
                <p className="text-sm text-card/80 mb-4">
                  For urgent technical issues, contact our emergency support line
                </p>
                <Button variant="secondary" size="sm" className="w-full">
                  Emergency Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
