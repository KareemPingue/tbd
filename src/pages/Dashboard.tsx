
import { useState } from "react";
import {
  Users,
  ArrowUpRight,
  DollarSign,
  BarChart3,
  TrendingUp,
  Calendar,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MetricCard from "@/components/dashboard/MetricCard";
import Chart from "@/components/dashboard/Chart";
import CampaignRow from "@/components/dashboard/CampaignRow";

// Sample data
const campaignData = [
  {
    id: "1",
    name: "Summer Sale 2023",
    status: "active" as const,
    progress: 65,
    reach: 45000,
    engagement: 12300,
    conversion: 3.2,
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    name: "New Product Launch",
    status: "draft" as const,
    progress: 30,
    reach: 0,
    engagement: 0,
    conversion: 0,
    lastUpdated: "1 day ago",
  },
  {
    id: "3",
    name: "Holiday Campaign",
    status: "scheduled" as const,
    progress: 0,
    reach: 0,
    engagement: 0,
    conversion: 0,
    lastUpdated: "5 days ago",
  },
  {
    id: "4",
    name: "Brand Awareness Q1",
    status: "completed" as const,
    progress: 100,
    reach: 124500,
    engagement: 35700,
    conversion: 4.8,
    lastUpdated: "2 months ago",
  },
];

const salesData = [
  { name: "Jan", value: 2400 },
  { name: "Feb", value: 1398 },
  { name: "Mar", value: 9800 },
  { name: "Apr", value: 3908 },
  { name: "May", value: 4800 },
  { name: "Jun", value: 3800 },
  { name: "Jul", value: 4300 },
];

const channelData = [
  { name: "Social Media", value: 35 },
  { name: "Search", value: 25 },
  { name: "Email", value: 20 },
  { name: "Direct", value: 15 },
  { name: "Referral", value: 5 },
];

const engagementData = [
  { name: "Mon", value: 4000 },
  { name: "Tue", value: 3000 },
  { name: "Wed", value: 5000 },
  { name: "Thu", value: 2780 },
  { name: "Fri", value: 1890 },
  { name: "Sat", value: 2390 },
  { name: "Sun", value: 3490 },
];

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState("7d");

  return (
    <div className="page-transition p-6 max-w-screen-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your marketing performance
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last quarter</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Users"
          value="48,294"
          change={{ value: 12.5, trend: "up" }}
          icon={<Users className="h-5 w-5" />}
        />
        <MetricCard
          title="Conversion Rate"
          value="3.8%"
          change={{ value: 2.1, trend: "up" }}
          icon={<ArrowUpRight className="h-5 w-5" />}
        />
        <MetricCard
          title="Revenue"
          value="$14,249"
          change={{ value: 8.3, trend: "up" }}
          icon={<DollarSign className="h-5 w-5" />}
        />
        <MetricCard
          title="Avg. Engagement"
          value="24.5%"
          change={{ value: 3.2, trend: "down" }}
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2">
          <Chart
            type="area"
            data={salesData}
            title="Revenue Trend"
            subtitle="Revenue performance over time"
            height={360}
          />
        </div>
        <div>
          <Chart
            type="pie"
            data={channelData}
            title="Traffic by Channel"
            subtitle="Distribution of user acquisition sources"
            height={360}
          />
        </div>
      </div>

      <div className="mb-8">
        <Chart
          type="bar"
          data={engagementData}
          title="Daily Engagement"
          subtitle="User interactions across all campaigns"
          height={300}
        />
      </div>

      <div className="glassmorphism rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Active Campaigns</h2>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button size="sm">Create Campaign</Button>
          </div>
        </div>
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="bg-muted/50 p-4 grid grid-cols-8 gap-4 font-medium text-sm">
            <div className="col-span-2">Campaign</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Progress</div>
            <div className="col-span-1 text-center">Reach</div>
            <div className="col-span-1 text-center">Engagement</div>
            <div className="col-span-1 text-center">Conversion</div>
            <div className="col-span-1"></div>
          </div>
          <div className="divide-y divide-border">
            {campaignData.map((campaign) => (
              <CampaignRow key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
