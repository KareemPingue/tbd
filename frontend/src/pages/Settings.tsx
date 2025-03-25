
import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  User, 
  CreditCard, 
  ServerCog, 
  Bell, 
  Shield, 
  Globe, 
  PanelLeft, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  Moon, 
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");

  // Sample integration status data
  const integrations = [
    {
      id: "google",
      name: "Google Analytics",
      status: "connected",
      lastSync: "2 hours ago",
      icon: Globe,
    },
    {
      id: "salesforce",
      name: "Salesforce",
      status: "connected",
      lastSync: "1 day ago",
      icon: Users,
    },
    {
      id: "aws",
      name: "Amazon Web Services",
      status: "disconnected",
      lastSync: "Never",
      icon: ServerCog,
    },
    {
      id: "mailchimp",
      name: "Mailchimp",
      status: "connected",
      lastSync: "3 hours ago",
      icon: Bell,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Jane Smith" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="jane.smith@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" defaultValue="Marketing Director" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="Acme Corporation" />
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div></div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        );
      
      case "appearance":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Theme Settings</h3>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Dark Mode</div>
                  <div className="text-sm text-muted-foreground">
                    Toggle between light and dark themes
                  </div>
                </div>
                <ThemeToggle />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Layout Preferences</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Sidebar Expanded</div>
                    <div className="text-sm text-muted-foreground">
                      Keep the sidebar expanded by default
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Compact Mode</div>
                    <div className="text-sm text-muted-foreground">
                      Reduce padding and spacing in the UI
                    </div>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Show Analytics on Dashboard</div>
                    <div className="text-sm text-muted-foreground">
                      Display analytics charts on the main dashboard
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Save Preferences</Button>
            </div>
          </div>
        );
      
      case "notifications":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Email Notifications</h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Campaign Reports</div>
                  <div className="text-sm text-muted-foreground">
                    Receive campaign performance reports
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">System Alerts</div>
                  <div className="text-sm text-muted-foreground">
                    Important system notifications and alerts
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Marketing Tips</div>
                  <div className="text-sm text-muted-foreground">
                    Product updates and marketing best practices
                  </div>
                </div>
                <Switch />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">In-App Notifications</h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Performance Alerts</div>
                  <div className="text-sm text-muted-foreground">
                    Notify when campaigns exceed or underperform targets
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Team Activity</div>
                  <div className="text-sm text-muted-foreground">
                    Updates when team members make significant changes
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">AI Insights</div>
                  <div className="text-sm text-muted-foreground">
                    Machine learning generated insights and suggestions
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Save Notification Settings</Button>
            </div>
          </div>
        );
      
      case "integrations":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Connected Services</h3>
                <Button variant="outline">Add Integration</Button>
              </div>
              
              <div className="space-y-4">
                {integrations.map((integration) => (
                  <div 
                    key={integration.id} 
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <integration.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{integration.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Last sync: {integration.lastSync}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {integration.status === "connected" ? (
                        <>
                          <Badge 
                            variant="outline" 
                            className="bg-green-500/10 text-green-600 dark:text-green-400 flex items-center gap-1"
                          >
                            <CheckCircle className="h-3 w-3" />
                            <span>Connected</span>
                          </Badge>
                          <Button variant="outline" size="sm">Configure</Button>
                          <Button variant="ghost" size="sm">Disconnect</Button>
                        </>
                      ) : (
                        <>
                          <Badge 
                            variant="outline" 
                            className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 flex items-center gap-1"
                          >
                            <AlertCircle className="h-3 w-3" />
                            <span>Disconnected</span>
                          </Badge>
                          <Button size="sm">Connect</Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">API Access</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="api-key">API Key</Label>
                  <Button variant="ghost" size="sm">
                    Generate New Key
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    id="api-key"
                    value="••••••••••••••••••••••••••••••"
                    readOnly
                  />
                  <Button
                    className="absolute right-1 top-1 h-7"
                    size="sm"
                    variant="ghost"
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  This API key has full access to your account. Keep it secure.
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="page-transition p-6 max-w-screen-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and system settings
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-[240px] glassmorphism">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Settings</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-1">
              <Button
                variant={activeTab === "account" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("account")}
              >
                <User className="mr-2 h-4 w-4" />
                Account
              </Button>
              <Button
                variant={activeTab === "appearance" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("appearance")}
              >
                <Sun className="mr-2 h-4 w-4" />
                Appearance
              </Button>
              <Button
                variant={activeTab === "notifications" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button
                variant={activeTab === "integrations" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("integrations")}
              >
                <ServerCog className="mr-2 h-4 w-4" />
                Integrations
              </Button>
              <Button
                variant={activeTab === "billing" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("billing")}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </Button>
              <Button
                variant={activeTab === "security" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("security")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Security
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 glassmorphism">
          <CardHeader>
            <CardTitle className="text-xl capitalize">
              {activeTab} Settings
            </CardTitle>
            <CardDescription>
              {activeTab === "account" && "Manage your account information and preferences"}
              {activeTab === "appearance" && "Customize the look and feel of your dashboard"}
              {activeTab === "notifications" && "Control how you receive alerts and updates"}
              {activeTab === "integrations" && "Connect with third-party tools and services"}
              {activeTab === "billing" && "Manage your subscription and payment information"}
              {activeTab === "security" && "Configure security settings and access controls"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderTabContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
