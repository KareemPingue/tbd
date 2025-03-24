
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

export default function Analytics() {
  // Sample data for charts
  const trafficData = [
    { name: "Jan", direct: 4000, organic: 2400, referral: 2400 },
    { name: "Feb", direct: 3000, organic: 1398, referral: 2210 },
    { name: "Mar", direct: 2000, organic: 9800, referral: 2290 },
    { name: "Apr", direct: 2780, organic: 3908, referral: 2000 },
    { name: "May", direct: 1890, organic: 4800, referral: 2181 },
    { name: "Jun", direct: 2390, organic: 3800, referral: 2500 },
    { name: "Jul", direct: 3490, organic: 4300, referral: 2100 },
  ];

  const conversionData = [
    { name: "Jan", conversion: 65 },
    { name: "Feb", conversion: 59 },
    { name: "Mar", conversion: 80 },
    { name: "Apr", conversion: 81 },
    { name: "May", conversion: 56 },
    { name: "Jun", conversion: 55 },
    { name: "Jul", conversion: 40 },
  ];

  const channelData = [
    { name: "Social", value: 400 },
    { name: "Direct", value: 300 },
    { name: "Organic", value: 300 },
    { name: "Referral", value: 200 },
    { name: "Email", value: 100 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Monitor and analyze your marketing performance</p>
      </div>

      <Tabs defaultValue="traffic" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>Website traffic sources over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="direct" fill="#8884d8" name="Direct" />
                    <Bar dataKey="organic" fill="#82ca9d" name="Organic" />
                    <Bar dataKey="referral" fill="#ffc658" name="Referral" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Rate</CardTitle>
              <CardDescription>Percentage of visitors that converted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="conversion" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Channel Distribution</CardTitle>
              <CardDescription>Breakdown of traffic by channel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Demographics Data</CardTitle>
              <CardDescription>Coming soon</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Demographics data will be available soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
