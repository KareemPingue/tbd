
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

interface CampaignRowProps {
  campaign: {
    id: string;
    name: string;
    status: "active" | "draft" | "completed" | "paused";
    progress: number;
    reach: number;
    engagement: number;
    conversion: number;
    lastUpdated: string;
  };
}

export default function CampaignRow({ campaign }: CampaignRowProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "paused":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400";
    }
  };

  return (
    <div className="grid grid-cols-8 gap-4 items-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="col-span-2">
        <p className="font-medium">{campaign.name}</p>
        <p className="text-xs text-muted-foreground">Last updated: {campaign.lastUpdated}</p>
      </div>
      <div className="col-span-1">
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            campaign.status
          )}`}
        >
          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
        </span>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-xs font-medium">{campaign.progress}%</span>
          </div>
          <Progress value={campaign.progress} className="h-1" />
        </div>
      </div>
      <div className="col-span-1 text-center">
        <p className="font-medium">{campaign.reach.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">Reach</p>
      </div>
      <div className="col-span-1 text-center">
        <p className="font-medium">{campaign.engagement.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">Engagement</p>
      </div>
      <div className="col-span-1 text-center">
        <p className="font-medium">{campaign.conversion.toFixed(1)}%</p>
        <p className="text-xs text-muted-foreground">Conversion</p>
      </div>
      <div className="col-span-1 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex items-center">
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
