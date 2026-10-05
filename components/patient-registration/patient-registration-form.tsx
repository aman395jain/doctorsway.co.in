"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Icon from "@/components/landing/icons";

function formatMobileNumber(digits: string) {
  return [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 10)]
    .filter(Boolean)
    .join("-");
}

function getFormattedCaretPosition(value: string, digitCount: number) {
  let position = 0;
  let digitsSeen = 0;

  while (position < value.length && digitsSeen < digitCount) {
    if (/[0-9]/.test(value[position])) {
      digitsSeen += 1;
    }
    position += 1;
  }

  while (value[position] === "-") {
    position += 1;
  }

  return position;
}

export default function PatientRegistrationForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notice, setNotice] = useState("");
  const [mobile, setMobile] = useState({ digits: "" });
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const pendingMobileCaret = useRef<number | null>(null);

  useEffect(() => {
    if (pendingMobileCaret.current === null) {
      return;
    }

    mobileInputRef.current?.setSelectionRange(
      pendingMobileCaret.current,
      pendingMobileCaret.current,
    );
    pendingMobileCaret.current = null;
  }, [mobile]);

  function handleMobileChange(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.currentTarget.value;
    const selectionStart = event.currentTarget.selectionStart ?? inputValue.length;
    const digitsBeforeCaret = inputValue
      .slice(0, selectionStart)
      .replace(/[^0-9]/g, "").length;
    const enteredDigits = inputValue.replace(/[^0-9]/g, "").slice(0, 10);
    const nextDigits =
      enteredDigits && !/^[6-9]/.test(enteredDigits) ? "" : enteredDigits;
    const formattedValue = formatMobileNumber(nextDigits);

    pendingMobileCaret.current = getFormattedCaretPosition(
      formattedValue,
      Math.min(digitsBeforeCaret, nextDigits.length),
    );
    setMobile({ digits: nextDigits });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(
      "Registration is not connected yet, so your details have not been sent.",
    );
  }

  return (
    <form className="patient-registration-form" onSubmit={handleSubmit}>
      <div className="registration-field">
        <label htmlFor="patient-name">Full Name</label>
        <div className="registration-input">
          <span className="registration-input-icon">
            <span className="registration-person-icon" />
          </span>
          <input
            autoComplete="name"
            id="patient-name"
            name="name"
            placeholder="Enter your full name"
            required
          />
        </div>
      </div>

      <div className="registration-field">
        <label htmlFor="patient-mobile">Mobile Number</label>
        <div className="registration-input registration-input-phone">
          <span aria-hidden="true" className="registration-input-icon">
            <span className="registration-phone-icon" />
          </span>
          <span className="registration-country-code">+91</span>
          <input
            autoComplete="tel-national"
            id="patient-mobile"
            inputMode="numeric"
            name="mobile"
            onChange={handleMobileChange}
            pattern="[6-9][0-9]{2}-[0-9]{3}-[0-9]{4}"
            placeholder="987-654-3210"
            ref={mobileInputRef}
            required
            title="Enter a 10-digit Indian mobile number starting with 6, 7, 8, or 9."
            type="tel"
            value={formatMobileNumber(mobile.digits)}
          />
          <button
            className="registration-inline-action"
            onClick={() =>
              setNotice(
                "OTP verification is not available yet. No code was sent.",
              )
            }
            type="button"
          >
            Send OTP
          </button>
        </div>
      </div>

      <div className="registration-field">
        <label htmlFor="patient-email">Email ID</label>
        <div className="registration-input">
          <span className="registration-input-icon">
            <span className="registration-mail-icon" />
          </span>
          <input
            autoComplete="email"
            id="patient-email"
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
        </div>
      </div>

      <div className="registration-field">
        <label htmlFor="patient-password">Password</label>
        <div className="registration-input">
          <span className="registration-input-icon">
            <span className="registration-lock-icon" />
          </span>
          <input
            autoComplete="new-password"
            id="patient-password"
            minLength={8}
            name="password"
            placeholder="Create a strong password"
            required
            type={passwordVisible ? "text" : "password"}
          />
          <button
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            aria-pressed={passwordVisible}
            className="registration-password-toggle"
            onClick={() => setPasswordVisible((visible) => !visible)}
            type="button"
          >
            {passwordVisible ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div className="registration-field-row">
        {/* <div className="registration-field">
          <label htmlFor="patient-birth-date">Date of Birth</label>
          <div className="registration-input">
            <span className="registration-input-icon"><Icon name="calendar" size={17} /></span>
            <input autoComplete="bday" id="patient-birth-date" name="birthDate" required type="date" />
          </div>
        </div> */}
        <div className="registration-field">
          <label htmlFor="patient-gender">Gender</label>
          <div className="registration-input registration-select">
            <span className="registration-input-icon">
              <span className="registration-person-icon" />
            </span>
            <select defaultValue="" id="patient-gender" name="gender" required>
              <option disabled value="">
                Select gender
              </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>
        <div className="registration-field">
          <label htmlFor="patient-pincode">Location / Pincode</label>
          <div className="registration-input registration-input-location">
            <span className="registration-input-icon">
              <Icon name="pin" size={17} />
            </span>
            <input
              autoComplete="postal-code"
              id="patient-pincode"
              inputMode="numeric"
              maxLength={6}
              name="pincode"
              pattern="[1-9][0-9]{5}"
              placeholder="Enter area or 6-digit pincode"
              required
              title="Enter a valid 6-digit Indian pincode."
            />
            <button
              className="registration-inline-action"
              onClick={() =>
                setNotice("Automatic location detection is not available yet.")
              }
              type="button"
            >
              Detect
            </button>
          </div>
        </div>
      </div>

      <label className="registration-consent">
        <input name="terms" required type="checkbox" />
        <span>
          I agree to the <a href="#terms">Terms &amp; Conditions</a> and{" "}
          <a href="#privacy">Privacy Policy</a>.
        </span>
      </label>

      <button className="registration-submit" type="submit">
        Create Account <span aria-hidden="true">→</span>
      </button>
      <p aria-live="polite" className="registration-notice" role="status">
        {notice}
      </p>

      <div className="registration-divider">
        <span>OR CONTINUE WITH</span>
      </div>
      <div className="registration-socials">
        <button
          className="registration-social-button"
          onClick={() => setNotice("Google sign-in is not available yet.")}
          type="button"
        >
          <span aria-hidden="true" className="registration-google-mark">
            G
          </span>
          Continue with Google
        </button>
      </div>
      <p className="registration-privacy">
        <span aria-hidden="true" className="registration-privacy-lock" />
        Your health data is protected with industry-standard encryption.
      </p>
    </form>
  );
}
