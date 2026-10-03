import Icon from "@/components/landing/icons";

export default function MapPreview({ count }: { count: number }) {
  return (
    <aside className="map-panel" aria-label="Map showing nearby doctors">
      <svg
        className="map-art"
        viewBox="0 0 620 740"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Illustrated map of Indiranagar and nearby Bengaluru neighborhoods"
      >
        <rect width="620" height="740" fill="#e9eee9" />
        <path
          d="M-20 76 130 26l82 48 98-35 102 41 96-39 139 67v109l-98 44-79-22-92 46-111-20-115 63-111-31-54-89Z"
          fill="#c5e5d4"
        />
        <path
          d="m-14 535 115-61 89 33 75-57 103 34 80-41 81 51 108-20 3 249H-14Z"
          fill="#cbe8d8"
        />
        <path
          d="M316 0c-25 66-21 106 18 151 30 34 43 58 37 100-8 53-42 78-12 118 21 29 50 29 85 15 38-15 57-9 90 22 30 28 58 35 112 23V0Z"
          fill="#b9d9e8"
        />
        <path
          d="M-40 171 666 302M-15 344 636 185M-37 455l680-208M-12 628l646-277M78-30l-67 773M211-30l-83 770M357-30l-92 771M502-30l-73 771"
          fill="none"
          stroke="#fffdf5"
          strokeWidth="15"
        />
        <path
          d="M-40 171 666 302M-15 344 636 185M-37 455l680-208M-12 628l646-277M78-30l-67 773M211-30l-83 770M357-30l-92 771M502-30l-73 771"
          fill="none"
          stroke="#d4cfc3"
          strokeWidth="1.6"
        />
        <path
          d="m-10 109 670 370M-15 247l660 349M44 741 580-16M-12 704 546-16"
          fill="none"
          stroke="#faf7ed"
          strokeWidth="8"
        />
        <path
          d="M33 396c44-52 84-40 123-4 40 37 60 46 98 31 46-19 51-64 92-67 31-2 50 29 70 71 22 45 50 56 101 35"
          fill="none"
          stroke="#9fcfba"
          strokeWidth="19"
        />
        <path
          d="M35 396c44-52 84-40 123-4 40 37 60 46 98 31 46-19 51-64 92-67 31-2 50 29 70 71 22 45 50 56 101 35"
          fill="none"
          stroke="#bce0ce"
          strokeWidth="12"
        />
        <g fill="#6d746e" fontFamily="Arial, sans-serif" fontSize="15" opacity=".88">
          <text x="166" y="157" fontSize="23" letterSpacing="1">INDIRANAGAR</text>
          <text x="45" y="566" fontSize="22">DOMLUR</text>
          <text x="316" y="674" fontSize="19">KORAMANGALA</text>
          <text x="431" y="492" fontSize="14">OLD AIRPORT ROAD</text>
          <text x="164" y="399">Indiranagar Club</text>
          <text x="390" y="609">National Games Village</text>
          <text x="475" y="285" fontSize="13">HAL</text>
          <text x="43" y="295" fontSize="13">100 Feet Road</text>
          <text x="335" y="229" fontSize="13">12th Main Road</text>
          <text x="40" y="702" fontSize="13">HSR LAYOUT</text>
        </g>
        <g fill="#90b8cc">
          <circle cx="513" cy="114" r="13" />
          <circle cx="111" cy="662" r="8" />
          <circle cx="294" cy="620" r="6" />
          <circle cx="78" cy="481" r="7" />
        </g>
      </svg>

      <div className="map-count">
        <Icon name="map" size={16} />
        {count} doctors in this area
      </div>

      <div className="map-controls" aria-hidden="true">
        <span className="map-control">
          <Icon name="pin" size={18} />
        </span>
        <span className="map-control">+</span>
        <span className="map-control">−</span>
      </div>

      <span className="map-label map-label-primary">Dr. Mehta · 4.9</span>
      <span className="map-pin pin-one">
        <Icon name="stethoscope" size={18} />
      </span>
      <span className="map-pin map-pin-secondary pin-two">
        <Icon name="stethoscope" size={15} />
      </span>
      <span className="map-pin map-pin-secondary pin-three">
        <Icon name="stethoscope" size={15} />
      </span>
      <span className="map-pin map-pin-secondary pin-four">
        <Icon name="stethoscope" size={15} />
      </span>
      <span className="map-credit">Illustrative map · Bengaluru</span>
    </aside>
  );
}
