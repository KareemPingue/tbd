
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

export default function CampaignForm() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="glassmorphism rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">Create New Campaign</h2>
      
      <Tabs defaultValue="details">
        <TabsList className="mb-6 w-full">
          <TabsTrigger value="details" className="flex-1">Campaign Details</TabsTrigger>
          <TabsTrigger value="audience" className="flex-1">Target Audience</TabsTrigger>
          <TabsTrigger value="content" className="flex-1">Content & Creative</TabsTrigger>
          <TabsTrigger value="budget" className="flex-1">Budget & Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-name">Campaign Name</Label>
              <Input id="campaign-name" placeholder="Enter campaign name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="campaign-description">Description</Label>
              <Textarea 
                id="campaign-description" 
                placeholder="Describe your campaign objectives and goals" 
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="campaign-type">Campaign Type</Label>
              <Select>
                <SelectTrigger id="campaign-type">
                  <SelectValue placeholder="Select campaign type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="awareness">Brand Awareness</SelectItem>
                  <SelectItem value="consideration">Consideration</SelectItem>
                  <SelectItem value="conversion">Conversion</SelectItem>
                  <SelectItem value="loyalty">Customer Loyalty</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Campaign Status</Label>
              <RadioGroup defaultValue="draft" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="draft" id="draft" />
                  <Label htmlFor="draft">Draft</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="scheduled" id="scheduled" />
                  <Label htmlFor="scheduled">Scheduled</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline">Save as Draft</Button>
            <Button>Next: Target Audience</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="audience" className="space-y-6">
          <p className="text-muted-foreground">Configure target audience settings here...</p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline">Previous</Button>
            <Button>Next: Content & Creative</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-6">
          <p className="text-muted-foreground">Configure campaign content and creative here...</p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline">Previous</Button>
            <Button>Next: Budget & Schedule</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="budget" className="space-y-6">
          <p className="text-muted-foreground">Configure campaign budget and schedule here...</p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline">Previous</Button>
            <Button>Create Campaign</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
