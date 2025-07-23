import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedSpecialization: string;
  onSpecializationChange: (specialization: string) => void;
  specializations: string[];
}

export const SearchBar = ({
  searchTerm,
  onSearchChange,
  selectedSpecialization,
  onSpecializationChange,
  specializations
}: SearchBarProps) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search doctors by name or specialization..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-12 text-base shadow-soft"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Filter by specialization:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedSpecialization === "" ? "default" : "secondary"}
          className={`cursor-pointer transition-colors ${
            selectedSpecialization === "" 
              ? "bg-gradient-medical text-white" 
              : "hover:bg-secondary"
          }`}
          onClick={() => onSpecializationChange("")}
        >
          All
        </Badge>
        {specializations.map((spec) => (
          <Badge
            key={spec}
            variant={selectedSpecialization === spec ? "default" : "secondary"}
            className={`cursor-pointer transition-colors ${
              selectedSpecialization === spec 
                ? "bg-gradient-medical text-white" 
                : "hover:bg-secondary"
            }`}
            onClick={() => onSpecializationChange(spec)}
          >
            {spec}
          </Badge>
        ))}
      </div>
    </div>
  );
};