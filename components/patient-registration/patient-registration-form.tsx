"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
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

function getFieldError(
  field: HTMLInputElement | HTMLSelectElement,
  value = field.value,
) {
  if (field.name === "mobile") {
    return /^[6-9][0-9]{2}-[0-9]{3}-[0-9]{4}$/.test(value)
      ? ""
      : field.title;
  }

  if (field.validity.valid) {
    return "";
  }

  if (field.validity.valueMissing) {
    return field.name === "terms"
      ? "Please agree to the Terms & Conditions and Privacy Policy."
      : `Please enter your ${field.name === "name" ? "full name" : field.labels?.[0]?.textContent?.trim().toLowerCase() ?? field.name}.`;
  }

  if (field.validity.typeMismatch) {
    return "Enter a valid email address.";
  }

  if (field.validity.patternMismatch) {
    return field.title || "Please enter a valid value.";
  }

  return field.validationMessage;
}

export default function PatientRegistrationForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notice, setNotice] = useState("");
  const [mobile, setMobile] = useState({ digits: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Set<string>>(() => new Set());
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
    const field = event.currentTarget;
    const inputValue = field?.value;
    const selectionStart = field?.selectionStart ?? inputValue?.length;
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

    if (touched.has(field?.name)) {
      setErrors((current) => ({
        ...current,
        mobile: getFieldError(field, formattedValue),
      }));
    }
  }

  function handleFieldChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const field = event.currentTarget;
    if (touched.has(field.name)) {
      setErrors((current) => ({
        ...current,
        [field.name]: getFieldError(field),
      }));
    }
  }

  function handleFieldBlur(
    event: FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const field = event.currentTarget;
    setTouched((current) => new Set(current).add(field.name));
    setErrors((current) => ({
      ...current,
      [field.name]: getFieldError(field),
    }));
  }

  function renderFieldError(name: string) {
    if (!errors[name]) {
      return null;
    }

    return (
      <p className="registration-field-error" id={`patient-${name}-error`}>
        {errors[name]}
      </p>
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = Array.from(
      event.currentTarget.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
        "input, select",
      ),
    );
    const nextErrors = Object.fromEntries(
      fields.map((field) => [field.name, getFieldError(field)]),
    );
    setTouched(new Set(fields.map((field) => field.name)));
    setErrors(nextErrors);

    const firstInvalidField = fields.find((field) => nextErrors[field.name]);
    if (firstInvalidField) {
      setNotice("");
      firstInvalidField.focus();
      return;
    }

    setNotice(
      "Registration is not connected yet, so your details have not been sent.",
    );
  }

  return (
    <form
      className="patient-registration-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="registration-field">
        <label htmlFor="patient-name">Full Name</label>
        <div
          className={`registration-input${errors.name ? " registration-input-error" : ""}`}
        >
          <span className="registration-input-icon">
            <span className="registration-person-icon" />
          </span>
          <input
            aria-describedby={errors.name ? "patient-name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            id="patient-name"
            name="name"
            onBlur={handleFieldBlur}
            onChange={handleFieldChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        {renderFieldError("name")}
      </div>

      <div className="registration-field">
        <label htmlFor="patient-mobile">Mobile Number</label>
        <div
          className={`registration-input registration-input-phone${errors.mobile ? " registration-input-error" : ""}`}
        >
          <span aria-hidden="true" className="registration-input-icon">
            <span className="registration-phone-icon" />
          </span>
          <span className="registration-country-code">+91</span>
          <input
            aria-describedby={errors.mobile ? "patient-mobile-error" : undefined}
            aria-invalid={Boolean(errors.mobile)}
            autoComplete="tel-national"
            id="patient-mobile"
            inputMode="numeric"
            name="mobile"
            onBlur={handleFieldBlur}
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
        {renderFieldError("mobile")}
      </div>

      <div className="registration-field">
        <label htmlFor="patient-email">Email ID</label>
        <div
          className={`registration-input${errors.email ? " registration-input-error" : ""}`}
        >
          <span className="registration-input-icon">
            <span className="registration-mail-icon" />
          </span>
          <input
            aria-describedby={errors.email ? "patient-email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            id="patient-email"
            name="email"
            onBlur={handleFieldBlur}
            onChange={handleFieldChange}
            placeholder="you@example.com"
            type="email"
          />
        </div>
        {renderFieldError("email")}
      </div>

      <div className="registration-field">
        <label htmlFor="patient-password">Password</label>
        <div
          className={`registration-input${errors.password ? " registration-input-error" : ""}`}
        >
          <span className="registration-input-icon">
            <span className="registration-lock-icon" />
          </span>
          <input
            aria-describedby={
              errors.password ? "patient-password-error" : undefined
            }
            aria-invalid={Boolean(errors.password)}
            autoComplete="new-password"
            id="patient-password"
            minLength={8}
            name="password"
            onBlur={handleFieldBlur}
            onChange={handleFieldChange}
            pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9\s]).{8,}"
            placeholder="Create a strong password"
            required
            title="Use at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
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
        {renderFieldError("password")}
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
          <div
            className={`registration-input registration-select${errors.gender ? " registration-input-error" : ""}`}
          >
            <span className="registration-input-icon">
              <span className="registration-person-icon" />
            </span>
            <select
              aria-describedby={errors.gender ? "patient-gender-error" : undefined}
              aria-invalid={Boolean(errors.gender)}
              defaultValue=""
              id="patient-gender"
              name="gender"
              onBlur={handleFieldBlur}
              onChange={handleFieldChange}
              required
            >
              <option disabled value="">
                Select gender
              </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
          {renderFieldError("gender")}
        </div>
        <div className="registration-field">
          <label htmlFor="patient-pincode">Location / Pincode</label>
          <div
            className={`registration-input registration-input-location${errors.pincode ? " registration-input-error" : ""}`}
          >
            <span className="registration-input-icon">
              <Icon name="pin" size={17} />
            </span>
            <input
              aria-describedby={errors.pincode ? "patient-pincode-error" : undefined}
              aria-invalid={Boolean(errors.pincode)}
              autoComplete="postal-code"
              id="patient-pincode"
              inputMode="numeric"
              maxLength={6}
              name="pincode"
              onBlur={handleFieldBlur}
              onChange={handleFieldChange}
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
          {renderFieldError("pincode")}
        </div>
      </div>

      <div>
        <label className="registration-consent">
          <input
            aria-describedby={errors.terms ? "patient-terms-error" : undefined}
            aria-invalid={Boolean(errors.terms)}
            name="terms"
            onBlur={handleFieldBlur}
            onChange={handleFieldChange}
            required
            type="checkbox"
          />
          <span>
            I agree to the <a href="#terms">Terms &amp; Conditions</a> and{" "}
            <a href="#privacy">Privacy Policy</a>.
          </span>
        </label>
        {renderFieldError("terms")}
      </div>

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
