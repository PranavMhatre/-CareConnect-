import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Clock, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { doctors, timeSlots } from "@/data/doctors";
import { useAppointments } from "@/hooks/use-appointments";
import { useToast } from "@/hooks/use-toast";

export default function DoctorDetails() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { bookAppointment, getBookedSlots } = useAppointments();
  
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [selectedDate] = useState(new Date().toISOString().split('T')[0]); // Today's date
  
  const doctor = doctors.find(d => d.id === doctorId);
  
  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Doctor not found</h1>
          <Button onClick={() => navigate("/")} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const bookedSlots = getBookedSlots(doctor.id, selectedDate);

  const handleBookAppointment = () => {
    if (!selectedTimeSlot) {
      toast({
        title: "Please select a time slot",
        description: "Choose an available time slot to book your appointment.",
        variant: "destructive",
      });
      return;
    }

    const appointment = bookAppointment({
      doctorId: doctor.id,
      doctorName: doctor.name,
      timeSlot: selectedTimeSlot,
      date: selectedDate,
    });

    toast({
      title: "Appointment Booked Successfully! 🎉",
      description: `Your appointment with ${doctor.name} is confirmed for ${selectedTimeSlot}.`,
    });

    // Navigate back to home after booking
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Doctors
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <div className="lg:col-span-2">
            <Card className="shadow-elevated">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-medical-blue/20"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground">{doctor.name}</h1>
                        <Badge variant="secondary" className="mt-2 text-sm">
                          {doctor.specialization}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{doctor.rating}</span>
                        <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-5 w-5 mr-2 text-medical-blue" />
                        <span>{doctor.experience} experience</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-5 w-5 mr-2 text-medical-blue" />
                        <span>{doctor.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appointment Booking */}
          <div>
            <Card className="shadow-elevated sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Appointment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground">Date</label>
                  <div className="mt-2 p-3 bg-medical-calm rounded-lg text-center">
                    <span className="font-medium">Today</span>
                    <div className="text-xs text-muted-foreground">
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Available Time Slots</label>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => {
                      const isBooked = bookedSlots.includes(slot);
                      const isSelected = selectedTimeSlot === slot;
                      
                      return (
                        <Button
                          key={slot}
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          disabled={isBooked}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`text-xs ${
                            isSelected 
                              ? "bg-gradient-medical" 
                              : isBooked 
                                ? "opacity-50 cursor-not-allowed" 
                                : "hover:bg-secondary"
                          }`}
                        >
                          {isBooked && <CheckCircle className="h-3 w-3 mr-1" />}
                          {slot}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <Button
                  onClick={handleBookAppointment}
                  disabled={!selectedTimeSlot}
                  className="w-full bg-gradient-medical hover:opacity-90 disabled:opacity-50"
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}