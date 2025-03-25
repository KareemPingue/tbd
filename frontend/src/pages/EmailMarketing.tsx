
import { useState } from "react";
import { 
  Mail, 
  Users, 
  Calendar, 
  Clock, 
  Send, 
  Plus, 
  Copy, 
  Eye, 
  Trash2, 
  AtSign,
  Undo2,
  ThumbsUp,
  AlertTriangle,
  Image,
  Link,
  Type,
  Smile,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sample data for templates
const emailTemplates = [
  {
    id: "1",
    name: "Welcome Email",
    description: "Send to new subscribers",
    openRate: 48.2,
    clickRate: 12.5,
    lastUsed: "2 days ago",
  },
  {
    id: "2",
    name: "Monthly Newsletter",
    description: "Regular updates for all subscribers",
    openRate: 32.7,
    clickRate: 8.1,
    lastUsed: "2 weeks ago",
  },
  {
    id: "3",
    name: "Product Announcement",
    description: "Announce new features and products",
    openRate: 41.3,
    clickRate: 15.2,
    lastUsed: "1 month ago",
  },
  {
    id: "4",
    name: "Discount Promotion",
    description: "Limited time offers and discounts",
    openRate: 38.5,
    clickRate: 22.9,
    lastUsed: "3 weeks ago",
  },
];

// Sample data for segments
const audienceSegments = [
  {
    id: "1",
    name: "All Subscribers",
    count: 24583,
    description: "All email subscribers",
  },
  {
    id: "2",
    name: "Active Users",
    count: 18247,
    description: "Opened an email in the last 30 days",
  },
  {
    id: "3",
    name: "New Subscribers",
    count: 3894,
    description: "Joined in the last 14 days",
  },
  {
    id: "4",
    name: "High Value Customers",
    count: 5271,
    description: "Spent over $500 in the last 90 days",
  },
  {
    id: "5",
    name: "Re-engagement",
    count: 9345,
    description: "Inactive for 60+ days",
  },
];

export default function EmailMarketing() {
  const [selectedTab, setSelectedTab] = useState("compose");
  const [subject, setSubject] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  return (
    <div className="page-transition p-6 max-w-screen-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Email Marketing</h1>
          <p className="text-muted-foreground">
            Create, send, and analyze email campaigns
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Create Campaign</span>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <Card className="flex-1 glassmorphism">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-primary" />
              <span>Email Stats Overview</span>
            </CardTitle>
            <CardDescription>
              Performance metrics for your email campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Total Sent</div>
                <div className="text-2xl font-bold">152,847</div>
                <div className="text-xs text-green-500 mt-1">+12.4% vs last month</div>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Open Rate</div>
                <div className="text-2xl font-bold">35.8%</div>
                <div className="text-xs text-green-500 mt-1">+2.1% vs last month</div>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Click Rate</div>
                <div className="text-2xl font-bold">12.3%</div>
                <div className="text-xs text-red-500 mt-1">-0.8% vs last month</div>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Unsubscribes</div>
                <div className="text-2xl font-bold">0.7%</div>
                <div className="text-xs text-green-500 mt-1">-0.2% vs last month</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="w-full lg:w-[350px] glassmorphism">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              <span>Upcoming Campaigns</span>
            </CardTitle>
            <CardDescription>
              Your scheduled email campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg">
                <div className="bg-primary/10 text-primary p-2 rounded-md">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium text-sm">Summer Sale Announcement</div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center">
                    <Calendar className="h-3 w-3 mr-1 inline" />
                    Tomorrow, 9:00 AM
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center">
                    <Users className="h-3 w-3 mr-1 inline" />
                    24,583 recipients
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg">
                <div className="bg-primary/10 text-primary p-2 rounded-md">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium text-sm">Weekly Newsletter</div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center">
                    <Calendar className="h-3 w-3 mr-1 inline" />
                    Friday, 11:00 AM
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center">
                    <Users className="h-3 w-3 mr-1 inline" />
                    18,247 recipients
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg">
                <div className="bg-primary/10 text-primary p-2 rounded-md">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium text-sm">Product Update</div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center">
                    <Calendar className="h-3 w-3 mr-1 inline" />
                    Next Monday, 10:00 AM
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center">
                    <Users className="h-3 w-3 mr-1 inline" />
                    15,492 recipients
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glassmorphism mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Email Campaign Builder</CardTitle>
              <CardDescription>
                Create, customize, and send email campaigns
              </CardDescription>
            </div>
            <Tabs 
              value={selectedTab} 
              onValueChange={setSelectedTab}
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="compose">Compose</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsContent value="compose" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-subject">Email Subject</Label>
                    <Input 
                      id="email-subject" 
                      placeholder="Enter a compelling subject line..." 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                    {subject && (
                      <div className="flex justify-between text-xs mt-1">
                        <span>
                          <Badge 
                            variant="outline"
                            className={`${
                              subject.length < 30 
                                ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" 
                                : subject.length <= 60 
                                ? "bg-green-500/10 text-green-600 dark:text-green-400" 
                                : "bg-red-500/10 text-red-600 dark:text-red-400"
                            }`}
                          >
                            {subject.length < 30 
                              ? "Too short" 
                              : subject.length <= 60 
                              ? "Optimal length" 
                              : "Too long"}
                          </Badge>
                        </span>
                        <span className="text-muted-foreground">
                          {subject.length}/60 characters
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email-template">Email Template</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger id="email-template">
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blank">Blank Template</SelectItem>
                        {emailTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="audience-segment">Audience Segment</Label>
                    <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                      <SelectTrigger id="audience-segment">
                        <SelectValue placeholder="Select a segment" />
                      </SelectTrigger>
                      <SelectContent>
                        {audienceSegments.map((segment) => (
                          <SelectItem key={segment.id} value={segment.id}>
                            {segment.name} ({segment.count.toLocaleString()})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email-content">Email Content</Label>
                    <div className="border border-border rounded-md overflow-hidden">
                      <div className="bg-muted/50 p-2 flex space-x-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Type className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Format Text</TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Link className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Insert Link</TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Image className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Insert Image</TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Smile className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Insert Emoji</TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <AtSign className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Insert Personalization</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Textarea 
                        className="border-0 rounded-none focus-visible:ring-0 min-h-[200px]" 
                        placeholder="Write your email content here..."
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-background border border-border rounded-lg overflow-hidden">
                    <div className="bg-muted/50 px-4 py-2 flex justify-between items-center border-b border-border">
                      <span className="text-sm font-medium">Email Preview</span>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Undo2 className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 min-h-[400px] flex items-center justify-center text-muted-foreground text-sm">
                      {selectedTemplate ? (
                        <div className="w-full space-y-4">
                          <div className="bg-primary/5 h-32 w-full rounded-md flex items-center justify-center">
                            <Image className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <div className="space-y-2">
                            <div className="h-6 bg-primary/5 w-3/4 rounded-md"></div>
                            <div className="h-4 bg-primary/5 w-full rounded-md"></div>
                            <div className="h-4 bg-primary/5 w-5/6 rounded-md"></div>
                            <div className="h-4 bg-primary/5 w-full rounded-md"></div>
                          </div>
                          <div className="flex justify-center">
                            <div className="h-10 bg-primary/10 w-1/3 rounded-md"></div>
                          </div>
                        </div>
                      ) : (
                        <span>Select a template to preview content</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-lg space-y-3">
                    <h3 className="font-medium">Email Optimization Tips</h3>
                    <div className="flex items-start space-x-2 text-sm">
                      <ThumbsUp className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Keep subject lines between 30-60 characters for optimal open rates.</span>
                    </div>
                    <div className="flex items-start space-x-2 text-sm">
                      <ThumbsUp className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Personalized emails have 26% higher open rates on average.</span>
                    </div>
                    <div className="flex items-start space-x-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <span>Avoid spam trigger words like "free", "guarantee", and "no risk".</span>
                    </div>
                    <div className="flex items-start space-x-2 text-sm">
                      <ThumbsUp className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Include a clear call-to-action button for better click rates.</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline">Save Draft</Button>
                <Button variant="outline">Schedule</Button>
                <Button className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  <span>Send Email</span>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="design" className="mt-0">
              <div className="text-center p-8 text-muted-foreground">
                Design editor content will appear here
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sender-name">Sender Name</Label>
                    <Input id="sender-name" defaultValue="Marketing Team" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reply-to">Reply-To Email</Label>
                    <Input id="reply-to" type="email" defaultValue="marketing@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="send-time">Send Time</Label>
                    <Select defaultValue="optimal">
                      <SelectTrigger id="send-time">
                        <SelectValue placeholder="Select send time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="now">Send Immediately</SelectItem>
                        <SelectItem value="optimal">Optimal Time (Recommended)</SelectItem>
                        <SelectItem value="schedule">Schedule for Later</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t border-border">
                    <h3 className="font-medium">Advanced Settings</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="track-opens">Track Opens</Label>
                        <p className="text-sm text-muted-foreground">Monitor when recipients open your email</p>
                      </div>
                      <Switch id="track-opens" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="track-clicks">Track Clicks</Label>
                        <p className="text-sm text-muted-foreground">Monitor when recipients click links</p>
                      </div>
                      <Switch id="track-clicks" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-resend">Auto Resend</Label>
                        <p className="text-sm text-muted-foreground">Automatically resend to non-openers after 3 days</p>
                      </div>
                      <Switch id="auto-resend" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Delivery Options</Label>
                    <div className="bg-primary/5 p-4 rounded-lg space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 text-primary p-2 rounded-md">
                          <Clock className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">Optimal Send Time</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            AI analyzes past engagement to determine the best time to send for maximum open rates.
                          </div>
                          <Button variant="link" className="p-0 h-auto text-xs mt-1">Learn more</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 text-primary p-2 rounded-md">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">A/B Testing</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Test different subject lines or content with a subset of recipients before sending to everyone.
                          </div>
                          <Button variant="link" className="p-0 h-auto text-xs mt-1">Set up A/B test</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Compliance</Label>
                    <div className="bg-yellow-500/10 p-4 rounded-lg space-y-2">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <div className="text-sm">
                          <span className="font-medium">Required for compliance:</span> Your email must include:
                        </div>
                      </div>
                      <ul className="text-sm space-y-1 ml-6 list-disc">
                        <li>Your physical address</li>
                        <li>A working unsubscribe link</li>
                        <li>Clear identification of the sender</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>Email Templates</CardTitle>
            <CardDescription>
              Reusable email designs for your campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emailTemplates.map((template) => (
                <div 
                  key={template.id} 
                  className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 text-primary p-2 rounded-md">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-xs text-muted-foreground">{template.description}</div>
                      <div className="text-xs mt-1">
                        <span className="text-green-500">{template.openRate}% opens</span>
                        {" • "}
                        <span className="text-blue-500">{template.clickRate}% clicks</span>
                        {" • "}
                        <span className="text-muted-foreground">Last used: {template.lastUsed}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Create New Template</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>Audience Segments</CardTitle>
            <CardDescription>
              Targeted groups for personalized email campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {audienceSegments.map((segment) => (
                <div 
                  key={segment.id} 
                  className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 text-primary p-2 rounded-md">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{segment.name}</div>
                      <div className="text-xs text-muted-foreground">{segment.description}</div>
                      <div className="text-xs mt-1 text-muted-foreground">
                        {segment.count.toLocaleString()} recipients
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Create New Segment</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
