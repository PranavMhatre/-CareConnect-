import { useState, useEffect } from "react";

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  timeSlot: string;
  date: string;
  status: "confirmed" | "pending" | "cancelled";
}

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const savedAppointments = localStorage.getItem("careconnect-appointments");
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  const saveAppointments = (newAppointments: Appointment[]) => {
    setAppointments(newAppointments);
    localStorage.setItem("careconnect-appointments", JSON.stringify(newAppointments));
  };

  const bookAppointment = (appointment: Omit<Appointment, "id" | "status">) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Math.random().toString(36).substr(2, 9),
      status: "confirmed"
    };
    
    const updatedAppointments = [...appointments, newAppointment];
    saveAppointments(updatedAppointments);
    return newAppointment;
  };

  const getBookedSlots = (doctorId: string, date: string) => {
    return appointments
      .filter(apt => apt.doctorId === doctorId && apt.date === date && apt.status === "confirmed")
      .map(apt => apt.timeSlot);
  };

  return {
    appointments,
    bookAppointment,
    getBookedSlots
  };
};