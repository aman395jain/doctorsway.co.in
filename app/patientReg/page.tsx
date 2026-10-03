import type { Metadata } from "next";
import PatientRegistrationPage from "@/components/patient-registration/patient-registration-page";

export const metadata: Metadata = {
  title: "Patient registration | doctorsway.co.in",
  description:
    "Create your patient account to find trusted doctors and manage your appointments.",
};

export default function PatientReg() {
  return <PatientRegistrationPage />;
}
