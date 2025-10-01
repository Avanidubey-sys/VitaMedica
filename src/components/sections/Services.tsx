import { Card, CardContent } from "@/components/ui/card";

export default function Services() {
  return (
    <section id="services" className="py-20 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">
        Our Services
      </h2>
      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">👩‍⚕️ Doctors</h3>
            <p className="text-gray-600">
              Manage doctor profiles, contact info, and specializations.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">🧑‍🤝‍🧑 Patients</h3>
            <p className="text-gray-600">
              Keep track of patient details and medical history.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">📅 Appointments</h3>
            <p className="text-gray-600">
              Schedule and manage appointments with ease.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
