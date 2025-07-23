import { Star, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/data/doctors";

interface DoctorCardProps {
  doctor: Doctor;
  onViewDetails: (doctorId: string) => void;
}

export const DoctorCard = ({ doctor, onViewDetails }: DoctorCardProps) => {
  return (
    <Card className="group hover:shadow-medical transition-all duration-300 hover:-translate-y-1 animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-medical-blue/20"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full border-2 border-background flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {doctor.name}
                </h3>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {doctor.specialization}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{doctor.rating}</span>
                <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
              </div>
            </div>
            
            <div className="mt-3 space-y-1">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {doctor.experience}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {doctor.location}
              </div>
            </div>
            
            <div className="mt-4">
              <Button 
                onClick={() => onViewDetails(doctor.id)}
                className="w-full bg-gradient-medical hover:opacity-90 transition-opacity"
                size="sm"
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};