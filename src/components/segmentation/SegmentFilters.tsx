
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

interface FilterItem {
  id: string;
  property: string;
  operator: string;
  value: string | number | number[];
}

export default function SegmentFilters() {
  const [filters, setFilters] = useState<FilterItem[]>([
    {
      id: "1",
      property: "age",
      operator: "between",
      value: [25, 45],
    },
    {
      id: "2",
      property: "location",
      operator: "equals",
      value: "New York",
    },
  ]);

  const addFilter = () => {
    const newFilter = {
      id: Date.now().toString(),
      property: "purchase_count",
      operator: "greater_than",
      value: 5,
    };
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter((filter) => filter.id !== id));
  };

  const renderFilterValue = (filter: FilterItem) => {
    if (filter.property === "age" && filter.operator === "between" && Array.isArray(filter.value)) {
      return (
        <div className="w-full space-y-4">
          <div className="flex justify-between text-sm">
            <span>{filter.value[0]}</span>
            <span>{filter.value[1]}</span>
          </div>
          <Slider
            defaultValue={filter.value as number[]}
            min={18}
            max={65}
            step={1}
            className="w-full"
          />
        </div>
      );
    }
    
    return <Input defaultValue={filter.value.toString()} className="w-full" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Segment Filters</h3>
        <Button onClick={addFilter} size="sm" variant="outline" className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Add Filter
        </Button>
      </div>
      
      <div className="space-y-4">
        {filters.map((filter) => (
          <div
            key={filter.id}
            className="p-4 border border-border rounded-lg bg-background/50 relative"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-7 w-7"
              onClick={() => removeFilter(filter.id)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <Label>Property</Label>
                <Select defaultValue={filter.property}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="age">Age</SelectItem>
                    <SelectItem value="gender">Gender</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                    <SelectItem value="purchase_count">Purchase Count</SelectItem>
                    <SelectItem value="last_purchase">Last Purchase Date</SelectItem>
                    <SelectItem value="average_order">Average Order Value</SelectItem>
                    <SelectItem value="device">Device Type</SelectItem>
                    <SelectItem value="email_engagement">Email Engagement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Operator</Label>
                <Select defaultValue={filter.operator}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equals">Equals</SelectItem>
                    <SelectItem value="not_equals">Not Equals</SelectItem>
                    <SelectItem value="contains">Contains</SelectItem>
                    <SelectItem value="greater_than">Greater Than</SelectItem>
                    <SelectItem value="less_than">Less Than</SelectItem>
                    <SelectItem value="between">Between</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Value</Label>
                {renderFilterValue(filter)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border border-border rounded-lg bg-background/50">
        <h4 className="font-medium mb-2">Current Segment</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="py-1">
            Age: 25-45
          </Badge>
          <Badge variant="outline" className="py-1">
            Location: New York
          </Badge>
          <Badge variant="outline" className="py-1">
            Purchase Count: &gt; 5
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Estimated audience size: <span className="font-medium">24,582 users</span>
        </p>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline">Reset Filters</Button>
        <Button>Apply Filters</Button>
      </div>
    </div>
  );
}
