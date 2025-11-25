import { useState, useEffect } from "react";
import { DashboardNav } from "@/components/DashboardNav";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Send, Inbox, Mail, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  subject: string;
  content: string;
  read: boolean;
  created_at: string;
  sender_profile?: { full_name: string; email: string };
  recipient_profile?: { full_name: string; email: string };
}

export default function Messages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    recipient_email: "",
    subject: "",
    content: "",
  });
  const [view, setView] = useState<"inbox" | "sent">("inbox");

  useEffect(() => {
    if (user) {
      loadMessages();
      
      const channel = supabase
        .channel("messages_changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "messages",
            filter: `recipient_id=eq.${user.id}`,
          },
          () => {
            loadMessages();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, view]);

  const loadMessages = async () => {
    setLoading(true);
    
    if (view === "inbox") {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("recipient_id", user?.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        const messagesWithProfiles = await Promise.all(
          data.map(async (msg) => {
            const { data: profile } = await supabase
              .from("profiles")
              .select("full_name, email")
              .eq("id", msg.sender_id)
              .single();
            return { ...msg, sender_profile: profile };
          })
        );
        setMessages(messagesWithProfiles);
      }
    } else {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("sender_id", user?.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        const messagesWithProfiles = await Promise.all(
          data.map(async (msg) => {
            const { data: profile } = await supabase
              .from("profiles")
              .select("full_name, email")
              .eq("id", msg.recipient_id)
              .single();
            return { ...msg, recipient_profile: profile };
          })
        );
        setMessages(messagesWithProfiles);
      }
    }
    
    setLoading(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: recipient } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", formData.recipient_email)
      .single();

    if (!recipient) {
      toast.error("Recipient not found");
      return;
    }

    const { error } = await supabase
      .from("messages")
      .insert([{
        sender_id: user?.id,
        recipient_id: recipient.id,
        subject: formData.subject,
        content: formData.content,
      }]);

    if (error) {
      toast.error("Failed to send message");
    } else {
      toast.success("Message sent successfully");
      setDialogOpen(false);
      setFormData({ recipient_email: "", subject: "", content: "" });
      loadMessages();
    }
  };

  const markAsRead = async (messageId: string) => {
    await supabase
      .from("messages")
      .update({ read: true })
      .eq("id", messageId);
    loadMessages();
  };

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.read && view === "inbox") {
      markAsRead(message.id);
    }
  };

  const unreadCount = messages.filter(m => !m.read && view === "inbox").length;

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-muted-foreground">Communicate with students and faculty</p>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="p-4">
              <div className="space-y-2 mb-4">
                <Button
                  variant={view === "inbox" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setView("inbox")}
                >
                  <Inbox className="mr-2 h-4 w-4" />
                  Inbox
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="ml-auto">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant={view === "sent" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setView("sent")}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Sent
                </Button>
              </div>

              <ScrollArea className="h-[600px]">
                {loading ? (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    Loading messages...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    <Mail className="mx-auto h-12 w-12 mb-2" />
                    No messages
                  </div>
                ) : (
                  <div className="space-y-2">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        onClick={() => handleSelectMessage(message)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedMessage?.id === message.id
                            ? "bg-accent"
                            : "hover:bg-accent/50"
                        } ${!message.read && view === "inbox" ? "font-semibold" : ""}`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-sm truncate">
                            {view === "inbox"
                              ? message.sender_profile?.full_name || message.sender_profile?.email
                              : message.recipient_profile?.full_name || message.recipient_profile?.email}
                          </span>
                          {!message.read && view === "inbox" && (
                            <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 ml-2" />
                          )}
                        </div>
                        <p className="text-sm truncate">{message.subject}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              {selectedMessage ? (
                <div>
                  <div className="border-b pb-4 mb-4">
                    <h2 className="text-2xl font-bold mb-2">{selectedMessage.subject}</h2>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        {view === "inbox" ? "From: " : "To: "}
                        {view === "inbox"
                          ? selectedMessage.sender_profile?.full_name || selectedMessage.sender_profile?.email
                          : selectedMessage.recipient_profile?.full_name || selectedMessage.recipient_profile?.email}
                      </span>
                      <span>
                        {formatDistanceToNow(new Date(selectedMessage.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  <div className="whitespace-pre-wrap">{selectedMessage.content}</div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Mail className="mx-auto h-16 w-16 mb-4" />
                    <p>Select a message to read</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Message</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">To (Email)</Label>
                <Input
                  id="recipient"
                  type="email"
                  value={formData.recipient_email}
                  onChange={(e) => setFormData({ ...formData, recipient_email: e.target.value })}
                  placeholder="recipient@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Message</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Send className="mr-2 h-4 w-4" />
                  Send
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
