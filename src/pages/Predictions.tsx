
import { useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { BrainCircuit, TrendingUp, TrendingDown, AlertTriangle, BarChart3, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Sample data
const churnPredictionData = [
  { name: "Jan", actual: 3.2, predicted: 3.5 },
  { name: "Feb", actual: 3.5, predicted: 3.8 },
  { name: "Mar", actual: 4.1, predicted: 3.9 },
  { name: "Apr", actual: 3.8, predicted: 4.2 },
  { name: "May", actual: 4.5, predicted: 4.4 },
  { name: "Jun", actual: 4.2, predicted: 4.6 },
  { name: "Jul", actual: null, predicted: 4.9 },
  { name: "Aug", actual: null, predicted: 5.2 },
  { name: "Sep", actual: null, predicted: 4.8 },
];

const adPerformanceData = [
  { name: "Ad 1", roi: 2.4, ctr: 3.2, spend: 1200 },
  { name: "Ad 2", roi: 1.8, ctr: 2.5, spend: 900 },
  { name: "Ad 3", roi: 3.2, ctr: 4.1, spend: 1500 },
  { name: "Ad 4", roi: 1.2, ctr: 1.8, spend: 600 },
  { name: "Ad 5", roi: 2.8, ctr: 3.5, spend: 1800 },
];

const customerSegmentPrediction = [
  { name: "Will Upgrade", value: 32, color: "#3b82f6" },
  { name: "Stable", value: 45, color: "#14b8a6" },
  { name: "At Risk", value: 23, color: "#ef4444" },
];

const marketTrendData = [
  { name: "Q1", value: 12000 },
  { name: "Q2", value: 19000 },
  { name: "Q3", value: 15000 },
  { name: "Q4", value: 22000 },
  { name: "Q1 (Next)", value: 24000 },
  { name: "Q2 (Next)", value: 28000 },
];

const customerInsightData = [
  {
    category: "High Risk",
    count: 2840,
    attributes: ["Low engagement", "Price sensitive", "Infrequent visits"],
    trend: "up",
    action: "Targeted re-engagement campaign with special offers"
  },
  {
    category: "Likely to Upgrade",
    count: 4750,
    attributes: ["High engagement", "Feature limited", "Regular usage"],
    trend: "up",
    action: "Feature showcase and upgrade incentives"
  },
  {
    category: "Seasonal Buyers",
    count: 3280,
    attributes: ["Periodic engagement", "Holiday focused", "Gift purchasers"],
    trend: "neutral",
    action: "Early season reminders and loyalty bonuses"
  },
  {
    category: "Potential Advocates",
    count: 1920,
    attributes: ["High satisfaction", "Multiple purchases", "Active on social"],
    trend: "up",
    action: "Referral program and exclusive preview access"
  },
];

export default function Predictions() {
  const [modelType, setModelType] = useState("churn");

  return (
    <div className="page-transition p-6 max-w-screen-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">AI Predictions</h1>
          <p className="text-muted-foreground">
            Machine learning driven insights and predictions
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={modelType} onValueChange={setModelType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="churn">Churn Prediction</SelectItem>
              <SelectItem value="ad">Ad Performance</SelectItem>
              <SelectItem value="customer">Customer Behavior</SelectItem>
              <SelectItem value="market">Market Trends</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Export Insights</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glassmorphism col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <BrainCircuit className="mr-2 h-5 w-5 text-primary" />
              <span>AI Analysis Summary</span>
            </CardTitle>
            <CardDescription>
              Key insights from our prediction models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Customer Retention Improving</h4>
                  <p className="text-sm text-muted-foreground">
                    Churn rate predicted to decrease by 12% in Q3 based on recent
                    engagement patterns.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Campaign Fatigue Detected</h4>
                  <p className="text-sm text-muted-foreground">
                    Email open rates show signs of declining engagement in the
                    "Weekly Updates" segment.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg">
                <TrendingDown className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Social Traffic at Risk</h4>
                  <p className="text-sm text-muted-foreground">
                    Algorithm changes may reduce organic reach by up to 25% in the
                    next 30 days.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg">
                <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">New Segment Identified</h4>
                  <p className="text-sm text-muted-foreground">
                    "Early Adopters with High LTV" segment discovered with 82%
                    confidence level.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism md:col-span-2">
          <CardHeader>
            <CardTitle>Churn Prediction Model</CardTitle>
            <CardDescription>
              Forecasting customer churn rates for the next quarter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={churnPredictionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={(value: any) => [`${value}%`, ""]}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name="Actual Churn"
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#ef4444"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    activeDot={{ r: 8 }}
                    name="Predicted Churn"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                <span className="text-sm">Actual Churn</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm">Predicted Churn</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="glassmorphism">
          <CardHeader className="pb-2">
            <CardTitle>Ad Performance Prediction</CardTitle>
            <CardDescription>
              Forecasting ROI and performance metrics for current campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Bar
                    dataKey="roi"
                    name="ROI (x)"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="ctr"
                    name="CTR (%)"
                    fill="#8b5cf6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardHeader className="pb-2">
            <CardTitle>Customer Behavior Forecast</CardTitle>
            <CardDescription>
              Predicted customer actions in the next 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6 items-center">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerSegmentPrediction}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      labelLine={false}
                    >
                      {customerSegmentPrediction.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                        color: "hsl(var(--foreground))",
                      }}
                      formatter={(value: any) => [`${value}%`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {customerSegmentPrediction.map((segment) => (
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
                <div className="pt-4 mt-2 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Prediction confidence</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 dark:text-green-400">
                      High (92%)
                    </Badge>
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
              <CardTitle>Predicted Customer Insights</CardTitle>
              <CardDescription>
                AI-powered audience segments and recommended actions
              </CardDescription>
            </div>
            <Tabs defaultValue="segments" className="w-[400px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="segments">Segments</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {customerInsightData.map((insight, index) => (
              <div key={index} className="glassmorphism p-4 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <span>{insight.category}</span>
                      {insight.trend === "up" && (
                        <TrendingUp className="ml-2 h-4 w-4 text-green-500" />
                      )}
                      {insight.trend === "down" && (
                        <TrendingDown className="ml-2 h-4 w-4 text-red-500" />
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {insight.count.toLocaleString()} customers
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-primary/10">
                    AI Generated
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {insight.attributes.map((attr, i) => (
                    <Badge key={i} variant="secondary">
                      {attr}
                    </Badge>
                  ))}
                </div>
                <div className="bg-background/50 p-3 rounded-md border border-border">
                  <div className="text-sm font-medium mb-1">Recommended Action</div>
                  <div className="text-sm">{insight.action}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
