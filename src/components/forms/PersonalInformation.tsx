import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoProps {
  data: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    portfolio: string;
    linkedin: string;
  };
  onChange: (field: string, value: string) => void;
}

export function PersonalInformation({ data, onChange }: PersonalInfoProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName" 
            placeholder="John Doe" 
            value={data.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Target Job Title</Label>
          <Input 
            id="jobTitle" 
            placeholder="Software Engineer" 
            value={data.jobTitle}
            onChange={(e) => onChange("jobTitle", e.target.value)}
            className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="john@example.com" 
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            placeholder="+1 (555) 000-0000" 
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            placeholder="San Francisco, CA" 
            value={data.location}
            onChange={(e) => onChange("location", e.target.value)}
            className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio / Website</Label>
          <Input 
            id="portfolio" 
            type="url"
            placeholder="https://johndoe.com" 
            value={data.portfolio}
            onChange={(e) => onChange("portfolio", e.target.value)}
            className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input 
            id="linkedin" 
            type="url"
            placeholder="https://linkedin.com/in/johndoe" 
            value={data.linkedin}
            onChange={(e) => onChange("linkedin", e.target.value)}
            className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}
