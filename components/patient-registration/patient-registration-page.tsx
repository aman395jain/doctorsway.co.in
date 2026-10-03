import Link from "next/link";
import Icon from "@/components/landing/icons";
import PatientRegistrationForm from "@/components/patient-registration/patient-registration-form";

const highlights = [
  { icon: "check" as const, title: "100% secure", description: "Encrypted records" },
  { icon: "calendar" as const, title: "2M+ bookings", description: "Across India" },
  { icon: "stethoscope" as const, title: "35k+ doctors", description: "Verified profiles" },
];

export default function PatientRegistrationPage() {
  return (
    <main className="patient-registration-page">
      <section className="registration-story" aria-labelledby="registration-story-title">
        <div className="registration-story-orb" aria-hidden="true" />
        <Link className="registration-brand" href="/" aria-label="doctorsway.co.in home">
          <span className="registration-brand-mark"><Icon name="truck" size={19} /></span>
          <span>doctorsway<span className="registration-brand-domain">.co.in</span></span>
        </Link>

        <div className="registration-story-content">
          <span className="registration-trust">
            <Icon name="check" size={15} />
            Private, secure, and always in your control
          </span>
          <h1 id="registration-story-title">
            Your care journey starts with one simple account.
          </h1>
          <p>
            Book trusted doctors, manage appointments, and keep your health
            information together—wherever you are.
          </p>
          <div className="registration-art" aria-hidden="true">
            <div className="registration-art-orbit" />
            <div className="registration-art-cross registration-art-cross-one" />
            <div className="registration-art-cross registration-art-cross-two" />
            <div className="registration-art-clinic">
              <span className="registration-art-window" />
              <span className="registration-art-doctor"><Icon name="stethoscope" size={32} /></span>
              <span className="registration-art-patient" />
              <span className="registration-art-plant registration-art-plant-left" />
              <span className="registration-art-plant registration-art-plant-right" />
              <span className="registration-art-caption">CARE CLINIC</span>
            </div>
          </div>
          <ul className="registration-benefits" aria-label="Platform highlights">
            {highlights.map((highlight) => (
              <li className="registration-benefit" key={highlight.title}>
                <Icon name={highlight.icon} size={16} />
                <strong>{highlight.title}</strong>
                <span>{highlight.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="registration-panel" aria-labelledby="registration-title">
        <div className="registration-form-wrap">
          <div className="registration-topline">
            <span>PATIENT REGISTRATION</span>
            <span>Already registered? <Link href="/login">Login</Link></span>
          </div>
          <h2 id="registration-title">Create your patient account</h2>
          <p className="registration-intro">
            It takes less than two minutes. Your details help us personalize
            your appointments.
          </p>
          <PatientRegistrationForm />
        </div>
      </section>
    </main>
  );
}
