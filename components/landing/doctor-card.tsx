import type { Doctor } from "@/data/doctors";
import Icon from "@/components/landing/icons";

type DoctorCardProps = {
  doctor: Doctor;
  onBook: (doctor: Doctor) => void;
};

export default function DoctorCard({ doctor, onBook }: DoctorCardProps) {
  return (
    <article className="doctor-card">
      <div className="doctor-details">
        <div>
          <div
            className={`doctor-portrait portrait-${doctor.portrait}`}
            role="img"
            aria-label={`Illustrated portrait of ${doctor.name}`}
          >
            <span>
              {doctor.name
                .replace("Dr. ", "")
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </span>
          </div>
          <div className="verified">
            <Icon name="check" size={13} />
            Verified
          </div>
        </div>

        <div className="doctor-main">
          <h3 className="doctor-name">{doctor.name}</h3>
          <p className="doctor-specialty">{doctor.specialty}</p>
          <p className="doctor-meta">
            {doctor.experience} years experience <span aria-hidden="true">·</span>{" "}
            {doctor.stories} patient stories
          </p>
          <p className="doctor-location">
            <Icon name="pin" size={15} />
            {doctor.clinic}, {doctor.area} <span aria-hidden="true">·</span>{" "}
            {doctor.distanceKm} km
          </p>
          <p className="doctor-fee">
            ₹ {doctor.fee} consultation fee
          </p>
        </div>

        <span className="doctor-rating" aria-label={`Rated ${doctor.rating} out of 5`}>
          <Icon name="star" size={14} />
          {doctor.rating.toFixed(1)}
        </span>
      </div>

      <div className="doctor-card-footer">
        <div className="next-slot">
          <span className="next-slot-label">Next available</span>
          <span className="next-slot-time">
            <span className="availability-dot" />
            {doctor.nextAvailable}
          </span>
        </div>
        <button
          className="button button-primary book-button"
          onClick={() => onBook(doctor)}
          type="button"
        >
          Book Appointment
        </button>
      </div>
    </article>
  );
}
