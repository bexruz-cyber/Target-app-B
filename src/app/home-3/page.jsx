"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import MainDostonjon from "../../../public/img/main-davronbek-2.png"; // Updated image name to match
import arrow from "../../../public/img/arrow.png"; // Ensure this path is correct
import "../style/home-3.css"; // Ensure this path is correct
import { useRouter } from "next/navigation";
import { GOOGLE_SHEETS_TOKEN } from "../constants/sheets";

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
        const scriptURL = GOOGLE_SHEETS_TOKEN;

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
      <div className="main-content">
        <div className="content-container-blue-bg">
          <div className="date-header">
            <div className="date-container">
              <div className="date-badge">18-Aprel | Soat 21:00 da</div>
            </div>
          </div>
          <p className="event-description">
            Dostonjon Soyibovdan 1 kunlik bepul masterklass
          </p>

          <h1 className="main-heading">
          Sizda ham mahsulot, reklama yoki katta mablag‘ bo‘lmasligi mumkin. Ammo men shunday sharoitda qanday qilib 5 kunda daromadga chiqdim — har bir qadamni ochiq ko‘rsataman.
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
              <button
                className="register-button"
                onClick={showRegistrationForm}
              >
                RO'YXATDAN O'TISH
              </button>
              <div className="free-label">
                <span className="arrow-up">
                  <Image
                    src={arrow}
                    alt="Arrow"
                    width={50}
                    height={50}
                    style={{ rotate: "180deg" }} // Invert colors to change white to black
                  />
                </span>
                BEPUL
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section" style={{ marginBottom: "30px" }}>
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
                    d="M18.5619 16.7328C14.8551 19.2202 11.0999 20.7468 8.06991 21.2504C4.89275 21.7785 3.12821 21.1163 2.48671 20.1603C1.84522 19.2043 1.90117 17.3205 3.59404 14.5805C5.2085 11.9674 8.04447 9.071 11.7513 6.58353C15.4581 4.09606 19.2133 2.56948 22.2433 2.06586C25.4205 1.53779 27.185 2.20003 27.8265 3.15599C28.468 4.11194 28.4121 5.99583 26.7192 8.7358C25.1047 11.3488 22.2688 14.2453 18.5619 16.7328Z"
                    stroke="url(#paint0_linear_9_99)"
                    strokeWidth="3"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_9_99"
                      x1="10.9155"
                      y1="5.33799"
                      x2="19.3978"
                      y2="17.9783"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#DCB379" />
                      <stop offset="1" stopColor="#FDE8BF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="feature-text">
                Sotuvlarni 5X oshirishning qiyin bo‘lmagan yo‘llari.
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
                    d="M18.5619 16.7328C14.8551 19.2202 11.0999 20.7468 8.06991 21.2504C4.89275 21.7785 3.12821 21.1163 2.48671 20.1603C1.84522 19.2043 1.90117 17.3205 3.59404 14.5805C5.2085 11.9674 8.04447 9.071 11.7513 6.58353C15.4581 4.09606 19.2133 2.56948 22.2433 2.06586C25.4205 1.53779 27.185 2.20003 27.8265 3.15599C28.468 4.11194 28.4121 5.99583 26.7192 8.7358C25.1047 11.3488 22.2688 14.2453 18.5619 16.7328Z"
                    stroke="url(#paint0_linear_9_99)"
                    strokeWidth="3"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_9_99"
                      x1="10.9155"
                      y1="5.33799"
                      x2="19.3978"
                      y2="17.9783"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#DCB379" />
                      <stop offset="1" stopColor="#FDE8BF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="feature-text">
                Sotuvlarni oshirish uchun qanday qilib to‘g‘ri marketing
                kanallarini tanlash
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
                    d="M18.5619 16.7328C14.8551 19.2202 11.0999 20.7468 8.06991 21.2504C4.89275 21.7785 3.12821 21.1163 2.48671 20.1603C1.84522 19.2043 1.90117 17.3205 3.59404 14.5805C5.2085 11.9674 8.04447 9.071 11.7513 6.58353C15.4581 4.09606 19.2133 2.56948 22.2433 2.06586C25.4205 1.53779 27.185 2.20003 27.8265 3.15599C28.468 4.11194 28.4121 5.99583 26.7192 8.7358C25.1047 11.3488 22.2688 14.2453 18.5619 16.7328Z"
                    stroke="url(#paint0_linear_9_99)"
                    strokeWidth="3"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_9_99"
                      x1="10.9155"
                      y1="5.33799"
                      x2="19.3978"
                      y2="17.9783"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#DCB379" />
                      <stop offset="1" stopColor="#FDE8BF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="feature-text">
                Yangi mijozlarni jalb qilish: Ularni o‘ziga jalb qiluvchi
                reklama texnikalari va brend yaratish usullari ko’rib chiqamiz
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Registration Button */}
        <div className="registration-area bottom">
          <button className="register-button-2" onClick={showRegistrationForm}>
            RO'YXATDAN O'TISH
          </button>
          <div className="free-label">
            <span className="arrow-up">
              <Image
                src={arrow}
                alt="Arrow"
                width={50}
                height={50}
                style={{ rotate: "180deg" }} // Invert colors to change white to black
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
