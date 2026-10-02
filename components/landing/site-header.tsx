import Icon from "@/components/landing/icons";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="content-width header-inner">
        <a className="brand" href="#top" aria-label="doctorsway.co.in home">
          <span className="brand-mark">
            <Icon name="truck" size={19} />
          </span>
          <span>
            doctorsway<span className="brand-domain">.co.in</span>
          </span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#find-doctors" aria-current="page">
            Find Doctors
          </a>
          <a href="#teleconsult">Teleconsult</a>
          <a href="#health-records">Health Records</a>
          <a href="#for-doctors">For Doctors</a>
        </nav>

        <div className="account-actions">
          <a className="button button-outline" href="#login">
            Login
          </a>
          <a className="button button-primary" href="#register">
            Register
          </a>
        </div>
      </div>
    </header>
  );
}
