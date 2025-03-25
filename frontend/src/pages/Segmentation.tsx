
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Users,
  Layers,
  Save,
  Download,
  Share2,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SegmentFilters from "@/components/segmentation/SegmentFilters";

// Sample data
const segmentData = [
  { name: "High Value", value: 35, color: "#3b82f6" },
  { name: "Regular", value: 25, color: "#8b5cf6" },
  { name: "Occasional", value: 20, color: "#14b8a6" },
  { name: "New Users", value: 15, color: "#f97316" },
  { name: "At Risk", value: 5, color: "#ef4444" },
];

const regionData = [
  { id: 1, name: "North America", percentage: 42 },
  { id: 2, name: "Europe", percentage: 28 },
  { id: 3, name: "Asia Pacific", percentage: 18 },
  { id: 4, name: "Latin America", percentage: 8 },
  { id: 5, name: "Middle East & Africa", percentage: 4 },
];

const deviceData = [
  { id: 1, name: "Mobile", percentage: 62 },
  { id: 2, name: "Desktop", percentage: 32 },
  { id: 3, name: "Tablet", percentage: 6 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-3 rounded-lg border border-border shadow-sm">
        <p className="font-medium">{`${payload[0].name}`}</p>
        <p className="text-muted-foreground">{`${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

export default function Segmentation() {
  const [activeSegment, setActiveSegment] = useState("all");

  return (
    <div className="page-transition p-6 max-w-screen-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Audience Segmentation</h1>
          <p className="text-muted-foreground">
            Analyze and target specific customer segments
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            <span>Save Segment</span>
          </Button>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span>Create Segment</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2 glassmorphism">
          <CardHeader>
            <CardTitle>Audience Overview</CardTitle>
            <CardDescription>
              Distribution of users across different segments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={segmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                      labelLine={false}
                    >
                      {segmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {segmentData.map((segment) => (
                  <div key={segment.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: segment.color }}
                      ></div>
                      <span>{segment.name}</span>
                    </div>
                    <div className="font-medium">{segment.value}%</div>
                  </div>
                ))}
                <div className="pt-4 mt-4 border-t border-border">
                  <p className="text-muted-foreground">
                    Total users: <span className="font-medium">48,294</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardHeader className="pb-3">
            <CardTitle>Segment Actions</CardTitle>
            <CardDescription>
              Apply actions to your selected segments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full flex items-center justify-center gap-2">
                <Layers className="h-4 w-4" />
                <span>Create Campaign</span>
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Download className="h-4 w-4" />
                <span>Export Segment</span>
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Share2 className="h-4 w-4" />
                <span>Share Insights</span>
              </Button>
              <div className="pt-4 mt-4 border-t border-border">
                <div className="text-sm space-y-3">
                  <h4 className="font-medium">Segment Metrics</h4>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg. Lifetime Value</span>
                    <span className="font-medium">$485</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Churn Risk</span>
                    <span className="font-medium">Low (12%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Purchase Frequency</span>
                    <span className="font-medium">3.2 / month</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>By Region</CardTitle>
            <CardDescription>
              Geographical distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionData.map((region) => (
                <div key={region.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span>{region.name}</span>
                    <span className="font-medium">{region.percentage}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-2"
                      style={{ width: `${region.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>By Device</CardTitle>
            <CardDescription>
              Device usage distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceData.map((device) => (
                <div key={device.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span>{device.name}</span>
                    <span className="font-medium">{device.percentage}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-2"
                      style={{ width: `${device.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>By Acquisition</CardTitle>
            <CardDescription>
              Channel distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Social Media</span>
                  <span className="font-medium">35%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-2" style={{ width: "35%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Organic Search</span>
                  <span className="font-medium">25%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-2" style={{ width: "25%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Direct</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-2" style={{ width: "20%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Referral</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-2" style={{ width: "15%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Email</span>
                  <span className="font-medium">5%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-2" style={{ width: "5%" }}></div>
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
              <CardTitle>Segment Builder</CardTitle>
              <CardDescription>
                Create targeted audience segments based on user behavior and attributes
              </CardDescription>
            </div>
            <Tabs defaultValue="filters" className="w-[400px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="filters">Filters</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <SegmentFilters />
        </CardContent>
      </Card>
    </div>
  );
}
