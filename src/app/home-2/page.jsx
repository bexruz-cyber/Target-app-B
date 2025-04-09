"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import MainDostonjon from "../../../public/img/main-davronbek.png"; // Updated image name to match
import arrow from "../../../public/img/arrow.png"; // Ensure this path is correct
import "../style/home-2.css"; // Ensure this path is correct
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState("UZ");
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    countryCode: "+998",
  });
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const phoneInputRef = useRef(null);

  // Country configurations
  const countries = [
    {
      code: "UZ",
      name: "O'zbekistan",
      phoneCode: "+998",
      maxLength: 12,
      placeholder: "99-999-99-99",
      pattern: "\\d{2}-\\d{3}-\\d{2}-\\d{2}",
    },
    {
      code: "KZ",
      name: "Qozoqiston",
      phoneCode: "+7",
      maxLength: 12,
      placeholder: "999-999-9999",
      pattern: "\\d{3}-\\d{3}-\\d{4}",
    },
    // Other countries remain unchanged
    {
      code: "RU",
      name: "Rossiya",
      phoneCode: "+7",
      maxLength: 12,
      placeholder: "999-999-9999",
      pattern: "\\d{3}-\\d{3}-\\d{4}",
    },
    {
      code: "KG",
      name: "Qirg'iziston",
      phoneCode: "+996",
      maxLength: 11,
      placeholder: "999-999-999",
      pattern: "\\d{3}-\\d{3}-\\d{3}",
    },
    {
      code: "TJ",
      name: "Tojikiston",
      phoneCode: "+992",
      maxLength: 11,
      placeholder: "999-999-999",
      pattern: "\\d{3}-\\d{3}-\\d{3}",
    },
    {
      code: "TM",
      name: "Turkmaniston",
      phoneCode: "+993",
      maxLength: 10,
      placeholder: "99-999-999",
      pattern: "\\d{2}-\\d{3}-\\d{3}",
    },
    {
      code: "TR",
      name: "Turkiya",
      phoneCode: "+90",
      maxLength: 12,
      placeholder: "999-999-9999",
      pattern: "\\d{3}-\\d{3}-\\d{4}",
    },
    {
      code: "DE",
      name: "Germaniya",
      phoneCode: "+49",
      maxLength: 12,
      placeholder: "999-99999999",
      pattern: "\\d{3}-\\d{8}",
    },
    {
      code: "US",
      name: "AQSH",
      phoneCode: "+1",
      maxLength: 12,
      placeholder: "999-999-9999",
      pattern: "\\d{3}-\\d{3}-\\d{4}",
    },
    {
      code: "BY",
      name: "Belorussiya",
      phoneCode: "+375",
      maxLength: 11,
      placeholder: "99-999-9999",
      pattern: "\\d{2}-\\d{3}-\\d{4}",
    },
    {
      code: "UA",
      name: "Ukraina",
      phoneCode: "+380",
      maxLength: 11,
      placeholder: "99-999-9999",
      pattern: "\\d{2}-\\d{3}-\\d{4}",
    },
  ];

  // All the functionality remains the same
  useEffect(() => {
    let timeLeft = 120;
    const timerElement = document.querySelector(".countdown-time");

    if (timerElement) {
      const countdown = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerElement.textContent = `${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        if (timeLeft <= 0) {
          clearInterval(countdown);
          timerElement.textContent = "00:00";
        }

        timeLeft -= 1;
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, []);

  // Title animation
  useEffect(() => {
    function animationTittle() {
      let titles = [
        "Salom",
        "Xush kelibsiz!",
        "Web sahifa yangilanmoqda...",
        "Boshqa yangiliklar...",
      ];
      let i = 0;
      function changeTitle() {
        document.title = titles[i];
        i = (i + 1) % titles.length;
      }
      setInterval(changeTitle, 2000);
    }
    // Uncomment to activate title animation
    // animationTittle();
  }, []);

  // Format phone number based on country
  const formatPhoneNumber = (value, countryCode) => {
    const rawValue = value.replace(/\D/g, "");
    let formattedValue = "";

    const country = countries.find((c) => c.code === countryCode);
    if (!country) return value;

    switch (countryCode) {
      case "UZ":
        formattedValue = rawValue.replace(
          /(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/,
          (_, a, b, c, d) => [a, b, c, d].filter(Boolean).join("-")
        );
        break;
      case "KG":
      case "TJ":
        formattedValue = rawValue.replace(
          /(\d{0,3})(\d{0,3})(\d{0,3})/,
          (_, a, b, c) => [a, b, c].filter(Boolean).join("-")
        );
        break;
      case "TM":
        formattedValue = rawValue.replace(
          /(\d{0,2})(\d{0,3})(\d{0,3})/,
          (_, a, b, c) => [a, b, c].filter(Boolean).join("-")
        );
        break;
      case "KZ":
      case "RU":
      case "US":
      case "TR":
        formattedValue = rawValue.replace(
          /(\d{0,3})(\d{0,3})(\d{0,4})/,
          (_, a, b, c) => [a, b, c].filter(Boolean).join("-")
        );
        break;
      case "DE":
        formattedValue = rawValue.replace(/(\d{0,3})(\d{0,8})/, (_, a, b) =>
          [a, b].filter(Boolean).join("-")
        );
        break;
      case "BY":
      case "UA":
        formattedValue = rawValue.replace(
          /(\d{0,2})(\d{0,3})(\d{0,4})/,
          (_, a, b, c) => [a, b, c].filter(Boolean).join("-")
        );
        break;
      default:
        formattedValue = rawValue;
    }

    return formattedValue;
  };

  // Validate name
  const validateName = (name) => {
    const nameValue = name.trim();
    const nameRegex = /^[A-Za-zА-Яа-яЁёЎўҚқҒғҲҳ'-]{2,}$/;

    if (!nameRegex.test(nameValue)) {
      setNameError(
        "❌ Ism faqat harflardan iborat bo'lishi va kamida 2 ta harf bo'lishi kerak!"
      );
      return false;
    } else {
      setNameError("");
      return true;
    }
  };

  // Validate phone
  const validatePhone = (phone, countryCode) => {
    const country = countries.find((c) => c.code === countryCode);
    if (!country) return false;

    const phoneValue = phone.trim();
    const digits = phoneValue.replace(/\D/g, "");
    const requiredDigits =
      country.maxLength - (country.maxLength - digits.length);

    if (digits.length !== requiredDigits) {
      setError("❌ Telefon raqam mos emas!");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const formattedValue = formatPhoneNumber(value, selectedCountry);
      setFormData({
        ...formData,
        [name]: formattedValue,
      });

      if (error) setError("");
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      if (name === "name" && nameError) setNameError("");
    }
  };

  // Handle country selection change
  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);

    const selectedCountryData = countries.find(
      (country) => country.code === countryCode
    );

    setFormData({
      ...formData,
      countryCode: selectedCountryData.phoneCode,
      phone: "",
    });

    setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isNameValid = validateName(formData.name);
    const isPhoneValid = validatePhone(formData.phone, selectedCountry);

    if (!isNameValid || !isPhoneValid) {
      return;
    }

    setLoading(true);

    try {
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbwB40n-KSXKKD3PjmPcJNrOgruMP-4OU11NSJO_JBeaETmRMLsPgDJpylrWguq6H7oN/exec";

      await fetch(scriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: `${formData.countryCode} ${formData.phone}`,
          date: new Date().toISOString(),
        }),
        mode: "no-cors",
      });

      setFormSubmitted(true);
      sessionStorage.setItem("reloadAfterThankYou", "true");
      router.push("/thank-you");
    } catch (error) {
      setError(
        "❌ Ma'lumotlarni yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
      );
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show registration form
  const showRegistrationForm = () => {
    setFormVisible(true);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  };

  // Close registration form
  const hideRegistrationForm = () => {
    setFormVisible(false);
    setError("");
    setNameError("");
    if (typeof document !== "undefined") {
      document.body.style.overflow = "auto";
    }
  };

  // Check on page load if we need to reload after thank-you page
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("reloadAfterThankYou") === "true"
    ) {
      sessionStorage.removeItem("reloadAfterThankYou");
      window.location.reload();
    }
  }, []);

  return (
    <div className="landing-wrapper">
      {/* Date Header */}
      <div className="date-header">
        <div className="date-container">
          <div className="date-badge">
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect
                x="0.299805"
                width="33.3807"
                height="33.3807"
                fill="url(#pattern0_1_61)"
              />
              <defs>
                <pattern
                  id="pattern0_1_61"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use xlinkHref="#image0_1_61" transform="scale(0.0111111)" />
                </pattern>
                <image
                  id="image0_1_61"
                  width="90"
                  height="90"
                  preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
            18-Aprel | Soat 21:00 da
          </div>
        </div>
      </div>
      <div className="main-content">
        <p className="event-description">
          Dostonjon Soyibovdan 1 kunlik bepul masterklass
        </p>

        <h1 className="main-heading">
          Qanday qilib boshlagan biznesingizni tog'ri rivojlantirib,
          sotuvlaringiz pastligidan butunlay halos bo'lish mumkin
        </h1>

        {/* Hero Section */}
        <div className="hero-section">
          <div className="speaker-image">
            <Image
              src={MainDostonjon}
              alt="Dostonjon Soyibov"
              width={380}
              height={400}
              priority={true}
            />
            <div className="speaker-badge">
              Dostonjon Soyibov
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="7" cy="7" r="7" fill="#1DA1F2" />
                <path
                  d="M5.5 7L6.5 8L8.5 6"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Registration Button */}
          <div className="registration-area">
            <button className="register-button" onClick={showRegistrationForm}>
              RO'YXATDAN O'TISH
            </button>
            <div className="free-label">
              <span className="arrow-up">
                <Image
                  src={arrow}
                  alt="Arrow"
                  width={50}
                  height={50}
                  style={{ filter: "invert(1)", rotate: "180deg" }} // Invert colors to change white to black
                />
              </span>
              BEPUL
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <div className="features-list">
            <h2 className="features-title">Masterklassda siz:</h2>
            <div className="feature-item">
              <div className="feature-marker">
                <svg
                  width="30"
                  height="23"
                  viewBox="0 0 30 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5621 16.7328C14.8552 19.2202 11.1 20.7468 8.07003 21.2504C4.89287 21.7785 3.12833 21.1163 2.48683 20.1603C1.84534 19.2043 1.90129 17.3205 3.59417 14.5805C5.20862 11.9674 8.0446 9.071 11.7514 6.58353C15.4582 4.09606 19.2135 2.56948 22.2435 2.06586C25.4206 1.53779 27.1852 2.20003 27.8267 3.15599C28.4682 4.11194 28.4122 5.99583 26.7193 8.7358C25.1049 11.3488 22.2689 14.2453 18.5621 16.7328Z"
                    stroke="#CB0000"
                    strokeWidth="3"
                  />
                </svg>
              </div>
              <div className="feature-text">
                Sotuvlarni oshirish uchun eng samarali marketing
                strategiyalarini
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-marker">
                <svg
                  width="30"
                  height="23"
                  viewBox="0 0 30 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5621 16.7328C14.8552 19.2202 11.1 20.7468 8.07003 21.2504C4.89287 21.7785 3.12833 21.1163 2.48683 20.1603C1.84534 19.2043 1.90129 17.3205 3.59417 14.5805C5.20862 11.9674 8.0446 9.071 11.7514 6.58353C15.4582 4.09606 19.2135 2.56948 22.2435 2.06586C25.4206 1.53779 27.1852 2.20003 27.8267 3.15599C28.4682 4.11194 28.4122 5.99583 26.7193 8.7358C25.1049 11.3488 22.2689 14.2453 18.5621 16.7328Z"
                    stroke="#CB0000"
                    strokeWidth="3"
                  />
                </svg>
              </div>
              <div className="feature-text">
                Reklama va marketingni qanday qilib to'g'ri optimallashtirishni
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-marker">
                <svg
                  width="30"
                  height="23"
                  viewBox="0 0 30 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5621 16.7328C14.8552 19.2202 11.1 20.7468 8.07003 21.2504C4.89287 21.7785 3.12833 21.1163 2.48683 20.1603C1.84534 19.2043 1.90129 17.3205 3.59417 14.5805C5.20862 11.9674 8.0446 9.071 11.7514 6.58353C15.4582 4.09606 19.2135 2.56948 22.2435 2.06586C25.4206 1.53779 27.1852 2.20003 27.8267 3.15599C28.4682 4.11194 28.4122 5.99583 26.7193 8.7358C25.1049 11.3488 22.2689 14.2453 18.5621 16.7328Z"
                    stroke="#CB0000"
                    strokeWidth="3"
                  />
                </svg>
              </div>
              <div className="feature-text">
                Sotuvlarni oshirish uchun foydali vositalarni ko'rib chiqamiz
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Registration Button */}
        <div className="registration-area bottom">
          <button className="register-button" onClick={showRegistrationForm}>
            RO'YXATDAN O'TISH
          </button>
          <div className="free-label">
            <span className="arrow-up">
              <Image
                src={arrow}
                alt="Arrow"
                width={50}
                height={50}
                style={{ filter: "invert(1)", rotate: "180deg" }} // Invert colors to change white to black
              />
            </span>
            BEPUL
          </div>
        </div>
      </div>

      {/* Registration Form Modal */}
      {formVisible && (
        <div className="registration-modal">
          <div className="modal-overlay" onClick={hideRegistrationForm}></div>
          <div className="modal-content">
            <button className="close-modal" onClick={hideRegistrationForm}>
              ✕
            </button>
            {!formSubmitted ? (
              <>
                {!loading ? (
                  <div className="form-container">
                    <h2 className="form-title">
                      Davom etish uchun quyidagi formani to'ldiring.
                    </h2>
                    <form
                      id="registration-form"
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      <div className="form-group">
                        <label htmlFor="name">Ismingizni kiriting:</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={nameError ? "error" : ""}
                        />
                        {nameError && (
                          <p className="error-message">{nameError}</p>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone">Telefon raqamingiz:</label>
                        <div className="phone-input-group">
                          <div className="country-select">
                            <img
                              src={`/img/flags/${selectedCountry.toLowerCase()}.png`}
                              alt="Flag"
                              className="country-flag"
                            />
                            <select
                              id="country"
                              value={selectedCountry}
                              onChange={handleCountryChange}
                            >
                              {countries.map((country) => (
                                <option key={country.code} value={country.code}>
                                  ({country.phoneCode})
                                </option>
                              ))}
                            </select>
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder={
                              countries.find((c) => c.code === selectedCountry)
                                ?.placeholder || ""
                            }
                            value={formData.phone}
                            onChange={handleInputChange}
                            maxLength={
                              countries.find((c) => c.code === selectedCountry)
                                ?.maxLength || 12
                            }
                            className={error ? "error" : ""}
                          />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                      </div>

                      <button type="submit" className="submit-button">
                        DAVOM ETISH
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="loading-message">
                    <p>
                      Kuting, ma'lumotlaringiz yuborilmoqda
                      <span className="loading-dots">...</span>
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="success-message">
                <h2>Tabriklaymiz!</h2>
                <p>
                  Ro'yxatdan muvaffaqiyatli o'tdingiz. Tez orada siz bilan
                  bog'lanamiz!
                </p>
                <button className="close-button" onClick={hideRegistrationForm}>
                  Yopish
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h2 className="footer-title">Dostonjon Soyibov</h2>
          <p className="footer-disclaimer">
            This site or product is not part of or endorsed by Facebook, Google,
            or any social media platform in any way FACEBOOK is a trademark of
            META PLATFORMS, Inc. YOUTUBE and GOOGLE are trademarks of ALPHABET,
            Inc.
          </p>
          <p className="footer-rights">Barcha huquqlar himoyalangan, 2025.</p>
        </div>
      </footer>
    </div>
  );
}
