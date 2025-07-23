import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/ui/header";
import { SearchBar } from "@/components/search-bar";
import { DoctorCard } from "@/components/doctor-card";
import { doctors } from "@/data/doctors";

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  const specializations = useMemo(() => {
    return Array.from(new Set(doctors.map(doctor => doctor.specialization))).sort();
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialization = selectedSpecialization === "" || 
                                  doctor.specialization === selectedSpecialization;
      return matchesSearch && matchesSpecialization;
    });
  }, [searchTerm, selectedSpecialization]);

  const handleViewDetails = (doctorId: string) => {
    navigate(`/doctor/${doctorId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find Your Perfect 
            <span className="bg-gradient-medical bg-clip-text text-transparent ml-2">
              Healthcare Provider
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Book appointments with trusted doctors in your area. Quality healthcare is just a click away.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedSpecialization={selectedSpecialization}
            onSpecializationChange={setSelectedSpecialization}
            specializations={specializations}
          />
        </div>

        {/* Results Summary */}
        <div className="max-w-4xl mx-auto mb-6">
          <p className="text-muted-foreground">
            Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} 
            {selectedSpecialization && ` in ${selectedSpecialization}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Doctor Grid */}
        <div className="max-w-4xl mx-auto">
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No doctors found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or clear the filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
