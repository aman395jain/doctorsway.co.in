"use client";

import type { FormEvent } from "react";
import Icon from "@/components/landing/icons";

export type QuickFilter = "today" | "rated" | "teleconsult" | "nearby";

type SearchControlsProps = {
  location: string;
  specialty: string;
  date: string;
  quickFilters: QuickFilter[];
  onLocationChange: (value: string) => void;
  onSpecialtyChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onQuickFilterToggle: (filter: QuickFilter) => void;
  onSearch: () => void;
};

const quickFilters: { id: QuickFilter; label: string; icon: "clock" | "star" | "stethoscope" | "send" }[] = [
  { id: "today", label: "Available Today", icon: "clock" },
  { id: "rated", label: "Top Rated", icon: "star" },
  { id: "teleconsult", label: "Teleconsultation", icon: "stethoscope" },
  { id: "nearby", label: "Within 5 km", icon: "send" },
];

export default function SearchControls({
  location,
  specialty,
  date,
  quickFilters: activeFilters,
  onLocationChange,
  onSpecialtyChange,
  onDateChange,
  onQuickFilterToggle,
  onSearch,
}: SearchControlsProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch();
  }

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-field">
          <span className="field-icon">
            <Icon name="pin" size={19} />
          </span>
          <div className="field-content">
            <label htmlFor="doctor-location">Location / Pincode</label>
            <input
              id="doctor-location"
              onChange={(event) => onLocationChange(event.target.value)}
              placeholder="Area, city or pincode"
              value={location}
            />
            <button
              className="current-location"
              onClick={() => onLocationChange("Indiranagar, Bengaluru")}
              type="button"
            >
              Use current location
            </button>
          </div>
        </div>

        <div className="search-field">
          <span className="field-icon">
            <Icon name="stethoscope" size={19} />
          </span>
          <div className="field-content">
            <label htmlFor="doctor-specialty">Specialty</label>
            <select
              id="doctor-specialty"
              onChange={(event) => onSpecialtyChange(event.target.value)}
              value={specialty}
            >
              <option>Cardiologist</option>
              <option>Dermatologist</option>
              <option>General Physician</option>
              <option>Neurologist</option>
              <option>Orthopedic</option>
            </select>
          </div>
        </div>

        <div className="search-field">
          <span className="field-icon">
            <Icon name="calendar" size={19} />
          </span>
          <div className="field-content">
            <label htmlFor="doctor-date">Date / Availability</label>
            <select
              id="doctor-date"
              onChange={(event) => onDateChange(event.target.value)}
              value={date}
            >
              <option value="today">Today, 2 October</option>
              <option value="tomorrow">Tomorrow, 3 October</option>
              <option value="any">Any availability</option>
            </select>
          </div>
        </div>

        <button className="button button-primary search-submit" type="submit">
          <Icon name="search" size={19} />
          Search Doctors
        </button>
      </form>

      <div className="quick-filters" aria-label="Quick filters">
        <span className="quick-filter-label">Quick filters</span>
        {quickFilters.map((filter) => (
          <button
            key={filter.id}
            aria-pressed={activeFilters.includes(filter.id)}
            className="filter-chip"
            onClick={() => onQuickFilterToggle(filter.id)}
            type="button"
          >
            <Icon name={filter.icon} size={15} />
            {filter.label}
          </button>
        ))}
      </div>
    </>
  );
}
