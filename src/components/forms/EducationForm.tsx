import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export function EducationForm({ data, onChange }: EducationFormProps) {
  const handleUpdate = (id: string, field: keyof Education, value: string) => {
    onChange(data.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };

  const handleAdd = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      degree: "",
      school: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
      description: ""
    };
    onChange([...data, newEdu]);
  };

  const handleRemove = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
      {data.map((edu, index) => (
        <div key={edu.id} className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl relative group shadow-sm">
          {/* Delete Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 hover:bg-red-50"
            onClick={() => handleRemove(edu.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-semibold text-neutral-500">
               {index + 1}
            </div>
            <h3 className="font-semibold text-lg text-white">{edu.degree || "New Education"}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="space-y-2">
              <Label>Degree / Program</Label>
              <Input 
                placeholder="B.S. Computer Science" 
                value={edu.degree}
                onChange={(e) => handleUpdate(edu.id, "degree", e.target.value)}
                  className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label>School / University</Label>
              <Input 
                placeholder="Stanford University" 
                value={edu.school}
                onChange={(e) => handleUpdate(edu.id, "school", e.target.value)}
                  className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input 
                placeholder="Stanford, CA" 
                value={edu.location}
                onChange={(e) => handleUpdate(edu.id, "location", e.target.value)}
                  className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label>GPA (Optional)</Label>
              <Input 
                placeholder="3.8 / 4.0" 
                value={edu.gpa}
                onChange={(e) => handleUpdate(edu.id, "gpa", e.target.value)}
                  className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 md:col-span-2">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input 
                  placeholder="Sep 2017" 
                  value={edu.startDate}
                  onChange={(e) => handleUpdate(edu.id, "startDate", e.target.value)}
                    className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label>End Date (or Expected)</Label>
                <Input 
                  placeholder="May 2021" 
                  value={edu.endDate}
                  onChange={(e) => handleUpdate(edu.id, "endDate", e.target.value)}
                    className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
             <Label>Additional Information (Awards, Honors, Societies, etc.)</Label>
             <textarea 
               placeholder="Graduated Cum Laude. President of the Computer Science Club..." 
               value={edu.description}
               onChange={(e) => handleUpdate(edu.id, "description", e.target.value)}
               className="w-full min-h-[100px] p-3 rounded-md border border-neutral-800 bg-neutral-900 text-white text-sm shadow-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 resize-y"
             />
          </div>
        </div>
      ))}

      <Button 
        variant="outline" 
        onClick={handleAdd}
        className="w-full border-dashed border-2 border-neutral-800 py-8 text-neutral-400 hover:bg-neutral-900 hover:text-indigo-400 hover:border-indigo-500/50 group transition-all bg-transparent"
      >
        <span className="flex items-center gap-2 font-medium">
           <Plus className="w-5 h-5 group-hover:scale-125 transition-transform" /> Add Another Education
        </span>
      </Button>
    </div>
  );
}
