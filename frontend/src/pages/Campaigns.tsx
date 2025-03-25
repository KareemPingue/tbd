
import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Edit,
  ArrowUpDown,
  Copy,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import CampaignForm from "@/components/campaigns/CampaignForm";

// Sample data
const campaignData = [
  {
    id: "1",
    name: "Summer Sale 2023",
    status: "active",
    type: "promotion",
    reach: 45000,
    engagement: 12300,
    conversion: 3.2,
    budget: 2500,
    startDate: "2023-06-15",
    endDate: "2023-07-15",
  },
  {
    id: "2",
    name: "New Product Launch",
    status: "draft",
    type: "awareness",
    reach: 0,
    engagement: 0,
    conversion: 0,
    budget: 5000,
    startDate: "2023-08-01",
    endDate: "2023-09-15",
  },
  {
    id: "3",
    name: "Holiday Campaign",
    status: "scheduled",
    type: "awareness",
    reach: 0,
    engagement: 0,
    conversion: 0,
    budget: 7500,
    startDate: "2023-11-15",
    endDate: "2023-12-31",
  },
  {
    id: "4",
    name: "Brand Awareness Q1",
    status: "completed",
    type: "awareness",
    reach: 124500,
    engagement: 35700,
    conversion: 4.8,
    budget: 10000,
    startDate: "2023-01-01",
    endDate: "2023-03-31",
  },
  {
    id: "5",
    name: "Referral Program",
    status: "active",
    type: "conversion",
    reach: 18200,
    engagement: 4300,
    conversion: 8.7,
    budget: 3500,
    startDate: "2023-05-01",
    endDate: "2023-08-31",
  },
  {
    id: "6",
    name: "Loyalty Rewards",
    status: "active",
    type: "retention",
    reach: 32400,
    engagement: 9800,
    conversion: 12.5,
    budget: 4000,
    startDate: "2023-04-01",
    endDate: "2023-10-31",
  },
];

export default function Campaigns() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400";
    }
  };

  const filteredCampaigns = campaignData.filter((campaign) => {
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-transition p-6 max-w-screen-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Campaign Management</h1>
          <p className="text-muted-foreground">
            Create, manage, and analyze your marketing campaigns
          </p>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          <span>New Campaign</span>
        </Button>
      </div>

      <div className="glassmorphism rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-auto flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search campaigns..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">More filters</span>
            </Button>
            <Button variant="outline" size="icon">
              <ArrowUpDown className="h-4 w-4" />
              <span className="sr-only">Sort</span>
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Type</th>
                <th className="text-left py-3 px-4 font-medium">Budget</th>
                <th className="text-left py-3 px-4 font-medium">Timeline</th>
                <th className="text-left py-3 px-4 font-medium">Performance</th>
                <th className="text-right py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium">{campaign.name}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        campaign.status
                      )}`}
                    >
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 capitalize">{campaign.type}</td>
                  <td className="py-3 px-4">${campaign.budget.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      {new Date(campaign.startDate).toLocaleDateString()} - 
                      {new Date(campaign.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {campaign.status === "active" || campaign.status === "completed" ? (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Conversion</span>
                          <span className="font-medium">{campaign.conversion}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div
                            className="bg-primary h-1.5 rounded-full"
                            style={{ width: `${Math.min(campaign.conversion * 10, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Not started</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center cursor-pointer">
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center text-destructive cursor-pointer">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
            <DialogDescription>
              Set up your campaign details, targeting, and content.
            </DialogDescription>
          </DialogHeader>
          <CampaignForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
