import type { Doctor } from "@/data/doctors";
import DoctorCard from "@/components/landing/doctor-card";
import MapPreview from "@/components/landing/map-preview";

type DoctorResultsProps = {
  doctors: Doctor[];
  resultCount: number;
  specialty: string;
  location: string;
  sort: string;
  notice: string;
  onSortChange: (value: string) => void;
  onBook: (doctor: Doctor) => void;
};

const specialtyLabels: Record<string, string> = {
  Cardiologist: "Cardiologists",
  Dermatologist: "Dermatologists",
  "General Physician": "General Physicians",
  Neurologist: "Neurologists",
  Orthopedic: "Orthopedic doctors",
};

export default function DoctorResults({
  doctors,
  resultCount,
  specialty,
  location,
  sort,
  notice,
  onSortChange,
  onBook,
}: DoctorResultsProps) {
  const area = location.split(",")[0]?.trim() || "Bengaluru";
  const formattedSpecialty = specialtyLabels[specialty] ?? specialty;

  return (
    <section className="results-section" id="doctor-results">
      <div className="content-width results-layout">
        <div>
          <div className="results-heading-row">
            <div>
              <h2 className="results-heading">
                {formattedSpecialty} near {area}
              </h2>
              <p className="results-subtitle">
                {resultCount} doctors found · Availability updated moments ago
              </p>
            </div>
            <label className="sort-control">
              Sort:
              <select
                aria-label="Sort doctors"
                onChange={(event) => onSortChange(event.target.value)}
                value={sort}
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Top rated</option>
                <option value="distance">Distance</option>
                <option value="fee">Consultation fee</option>
              </select>
            </label>
          </div>

          {notice && (
            <p className="booking-notice" role="status">
              {notice}
            </p>
          )}

          <div className="doctor-list" aria-live="polite">
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <DoctorCard doctor={doctor} key={doctor.id} onBook={onBook} />
              ))
            ) : (
              <div className="empty-results">
                <strong>No doctors match these filters yet</strong>
                Try widening your search or clearing one of the quick filters.
              </div>
            )}
          </div>
        </div>
        <MapPreview count={resultCount} />
      </div>
    </section>
  );
}
