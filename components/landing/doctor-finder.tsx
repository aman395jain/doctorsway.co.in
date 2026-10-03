"use client";

import { useMemo, useState } from "react";
import type { Doctor } from "@/data/doctors";
import { doctors } from "@/data/doctors";
import DoctorResults from "@/components/landing/doctor-results";
import SearchControls, {
  type QuickFilter,
} from "@/components/landing/search-controls";

export default function DoctorFinder() {
  const [location, setLocation] = useState("Indiranagar, Bengaluru");
  const [specialty, setSpecialty] = useState("Cardiologist");
  const [date, setDate] = useState("today");
  const [quickFilters, setQuickFilters] = useState<QuickFilter[]>([]);
  const [sort, setSort] = useState("relevance");
  const [searchMessage, setSearchMessage] = useState("");
  const [bookingNotice, setBookingNotice] = useState("");

  const filteredDoctors = useMemo(() => {
    const normalizedLocation = location.trim().toLowerCase();
    const queryArea = normalizedLocation.split(",")[0]?.trim() ?? "";
    const searchesBengaluru =
      normalizedLocation.includes("bengaluru") ||
      normalizedLocation.includes("bangalore");
    const searchesIndiranagar = queryArea.includes("indiranagar");

    const result = doctors.filter((doctor) => {
      if (!doctor.specialty.toLowerCase().includes(specialty.toLowerCase())) {
        return false;
      }
      const matchesLocation =
        !queryArea ||
        searchesBengaluru ||
        (searchesIndiranagar && doctor.distanceKm <= 5) ||
        doctor.area.toLowerCase().includes(queryArea) ||
        doctor.clinic.toLowerCase().includes(queryArea);
      if (!matchesLocation) {
        return false;
      }
      if (date === "today" && !doctor.availableToday) {
        return false;
      }
      if (date === "tomorrow" && doctor.availableToday) {
        return false;
      }
      if (quickFilters.includes("today") && !doctor.availableToday) {
        return false;
      }
      if (quickFilters.includes("rated") && doctor.rating < 4.8) {
        return false;
      }
      if (quickFilters.includes("teleconsult") && !doctor.teleconsultation) {
        return false;
      }
      if (quickFilters.includes("nearby") && doctor.distanceKm > 5) {
        return false;
      }
      return true;
    });

    return [...result].sort((first, second) => {
      if (sort === "rating") {
        return second.rating - first.rating;
      }
      if (sort === "distance") {
        return first.distanceKm - second.distanceKm;
      }
      if (sort === "fee") {
        return first.fee - second.fee;
      }
      return first.id - second.id;
    });
  }, [date, location, quickFilters, sort, specialty]);

  function toggleFilter(filter: QuickFilter) {
    setQuickFilters((activeFilters) =>
      activeFilters.includes(filter)
        ? activeFilters.filter((item) => item !== filter)
        : [...activeFilters, filter],
    );
  }

  function handleSearch() {
    const place = location.trim() || "your area";
    setSearchMessage(`Showing matching doctors near ${place}.`);
    setBookingNotice("");
    document.getElementById("doctor-results")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleBook(doctor: Doctor) {
    setBookingNotice(
      `Online booking for ${doctor.name} is coming soon. Please contact ${doctor.clinic} directly to schedule a visit.`,
    );
  }

  const visibleCount = filteredDoctors.length;

  return (
    <div className="page-shell" id="top">
      <main>
        <section className="finder-intro" id="find-doctors">
          <div className="content-width">
            <h1 className="intro-heading">
              Find the right doctor, right when you need one.
            </h1>
            <p className="intro-copy">
              Trusted specialists, transparent availability, and appointments
              confirmed in minutes.
            </p>
            <SearchControls
              date={date}
              location={location}
              onDateChange={setDate}
              onLocationChange={setLocation}
              onQuickFilterToggle={toggleFilter}
              onSearch={handleSearch}
              onSpecialtyChange={setSpecialty}
              quickFilters={quickFilters}
              specialty={specialty}
            />
            {searchMessage && (
              <p className="booking-notice" role="status">
                {searchMessage}
              </p>
            )}
          </div>
        </section>
        <DoctorResults
          doctors={filteredDoctors}
          location={location}
          notice={bookingNotice}
          onBook={handleBook}
          onSortChange={setSort}
          resultCount={visibleCount}
          sort={sort}
          specialty={specialty}
        />
      </main>
    </div>
  );
}
