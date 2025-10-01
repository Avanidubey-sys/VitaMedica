"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Types
type Patient = {
  id: number;
  name: string;
  gender: string;
};

type Doctor = {
  id: number;
  name: string;
  specialization: string;
};

type Appointment = {
  id: number;
  date: string;
  patient: Patient;
  doctor: Doctor;
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [newAppointment, setNewAppointment] = useState({
    patientId: "",
    doctorId: "",
    date: "",
  });

  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  // Fetch all data
  const fetchAppointments = async () => {
    const data = await fetch("/api/appointment").then((res) => res.json());
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();

    fetch("/api/patients")
      .then((res) => res.json())
      .then(setPatients);

    fetch("/api/doctor")
      .then((res) => res.json())
      .then(setDoctors);
  }, []);

  // Create appointment
  const createAppointment = async () => {
    await fetch("/api/appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAppointment),
    });

    setNewAppointment({ patientId: "", doctorId: "", date: "" });
    fetchAppointments();
  };

  // Update appointment
  const updateAppointment = async () => {
    if (!editingAppointment) return;

    await fetch(`/api/appointment/${editingAppointment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientId: editingAppointment.patient.id,
        doctorId: editingAppointment.doctor.id,
        date: editingAppointment.date,
      }),
    });

    setEditingAppointment(null);
    fetchAppointments();
  };

  // Delete appointment
  const deleteAppointment = async (id: number) => {
    await fetch(`/api/appointment/${id}`, {
      method: "DELETE",
    });
    fetchAppointments();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Appointments</h1>

      {/* Add Appointment Modal */}
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Appointment</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Patient */}
            <div className="space-y-2">
              <Label>Patient</Label>
              <Select
                value={newAppointment.patientId}
                onValueChange={(val) => setNewAppointment({ ...newAppointment, patientId: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((p) => (
                    <SelectItem key={p.id} value={String(p.id)}>
                      {p.name} ({p.gender})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Doctor */}
            <div className="space-y-2">
              <Label>Doctor</Label>
              <Select
                value={newAppointment.doctorId}
                onValueChange={(val) => setNewAppointment({ ...newAppointment, doctorId: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((d) => (
                    <SelectItem key={d.id} value={String(d.id)}>
                      {d.name} – {d.specialization}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="datetime-local"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              />
            </div>

            <Button onClick={createAppointment} className="w-full">
              Save Appointment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Appointment Modal */}
      <Dialog open={!!editingAppointment} onOpenChange={() => setEditingAppointment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
          </DialogHeader>
          {editingAppointment && (
            <div className="space-y-4">
              {/* Patient */}
              <div className="space-y-2">
                <Label>Patient</Label>
                <Select
                  value={String(editingAppointment.patient.id)}
                  onValueChange={(val) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      patient: patients.find((p) => p.id === Number(val))!,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((p) => (
                      <SelectItem key={p.id} value={String(p.id)}>
                        {p.name} ({p.gender})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Doctor */}
              <div className="space-y-2">
                <Label>Doctor</Label>
                <Select
                  value={String(editingAppointment.doctor.id)}
                  onValueChange={(val) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      doctor: doctors.find((d) => d.id === Number(val))!,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((d) => (
                      <SelectItem key={d.id} value={String(d.id)}>
                        {d.name} – {d.specialization}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="datetime-local"
                  value={editingAppointment.date}
                  onChange={(e) =>
                    setEditingAppointment({ ...editingAppointment, date: e.target.value })
                  }
                />
              </div>

              <Button onClick={updateAppointment} className="w-full">
                Update Appointment
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Appointment List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((appt) => (
          <Card key={appt.id}>
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold">Patient: {appt.patient?.name}</p>
              <p>
                Doctor: {appt.doctor?.name} ({appt.doctor?.specialization})
              </p>
              <p>Date: {new Date(appt.date).toLocaleString()}</p>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingAppointment(appt)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteAppointment(appt.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
