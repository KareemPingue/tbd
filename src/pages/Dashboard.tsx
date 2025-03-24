import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/shared/MetricCard";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  // Sample data for the area chart
  const data = [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
  ];

  // Sample data for campaigns
  const campaigns = [
    {
      id: "1",
      name: "Summer Sale 2023",
      status: "active",
      progress: 75,
      reach: 123500,
      engagement: 15.7,
      conversion: 3.2,
      lastUpdated: "2h ago"
    },
    {
      id: "2",
      name: "Product Launch: X1 Pro",
      status: "draft",
      progress: 30,
      reach: 0,
      engagement: 0,
      conversion: 0,
      lastUpdated: "1d ago"
    },
    {
      id: "3",
      name: "Holiday Campaign",
      status: "paused",
      progress: 50,
      reach: 45000,
      engagement: 8.3,
      conversion: 1.5,
      lastUpdated: "5h ago"
    },
    {
      id: "4",
      name: "Back to School Special",
      status: "completed",
      progress: 100,
      reach: 89000,
      engagement: 12.1,
      conversion: 4.7,
      lastUpdated: "2d ago"
    }
  ];

  const renderStatusBadge = (status: string) => {
    let badgeColor = "secondary";
    if (status === "active") {
      badgeColor = "green";
    } else if (status === "draft") {
      badgeColor = "muted";
    } else if (status === "paused") {
      badgeColor = "yellow";
    } else if (status === "completed") {
      badgeColor = "blue";
    }

    return (
      <Badge variant={badgeColor}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your marketing campaigns and track key metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total Reach" value="245,000" delta="+12%" />
        <MetricCard label="Engagement Rate" value="14.5%" delta="-3%" />
        <MetricCard label="Conversion Rate" value="3.8%" delta="+0.5%" />
        <MetricCard label="Customer Acquisition Cost" value="$24.50" delta="-1.2%" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Website Traffic</CardTitle>
          <CardDescription>Real-time overview of website traffic</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>Track the performance of your marketing campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A summary of your recent marketing campaigns.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Reach</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Conversion</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{renderStatusBadge(campaign.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={campaign.progress} className="w-[100px]" />
                      <span>{campaign.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{campaign.reach.toLocaleString()}</TableCell>
                  <TableCell>{campaign.engagement}%</TableCell>
                  <TableCell>{campaign.conversion}%</TableCell>
                  <TableCell>{campaign.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
