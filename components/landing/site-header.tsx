import Icon from "@/components/landing/icons";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="content-width header-inner">
        <Link className="brand" href="/" aria-label="doctorsway.co.in home">
          <span className="brand-mark">
            <Icon name="truck" size={19} />
          </span>
          <span>
            doctorsway<span className="brand-domain">.co.in</span>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#find-doctors" aria-current="page">
            Find Doctors
          </a>
          <a href="#for-doctors">For Doctors</a>
        </nav>

        <div className="account-actions">
          <Link className="button button-outline" href="/login">
            Login
          </Link>
          <Link className="button button-primary" href="/patientReg">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
