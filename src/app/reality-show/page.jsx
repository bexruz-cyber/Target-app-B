"use client";

import "@/app/style/reality-show.css";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import main_1 from "../../../public/img/main/main_1.jpg";
import main_2 from "../../../public/img/main/main_2.jpg";
import main_3 from "../../../public/img/main/main_3.png";
import main_4 from "../../../public/img/main/main_4.png";
import arrow from "../../../public/img/main/arrow.svg";
import arrow_2 from "../../../public/img/arrow.png"; // Ensure this path is correct
import { useRouter } from "next/navigation";
import { GOOGLE_SHEETS_TOKEN } from "../constants/sheets";

export default function RealityShowPromo() {
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

  // Timer functionality
  useEffect(() => {
    // Set the countdown timer
    let timeLeft = 120; // 2 minutes in seconds
    const timerElement = document.querySelector(".countdown-time");

    if (timerElement) {
      const countdown = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        // Format the time as MM:SS
        timerElement.textContent = `${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        if (timeLeft <= 0) {
          clearInterval(countdown);
          timerElement.textContent = "00:00";
        }

        timeLeft -= 1;
      }, 1000);

      // Clean up the interval on component unmount
      return () => clearInterval(countdown);
    }
  }, []);

  // Title animation (commented out in original code)
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
        i = (i + 1) % titles.length; // loop back to the start of the array
      }
      setInterval(changeTitle, 2000); // Change the title every 2 seconds
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
    const nameRegex = /^[A-Za-zА-Яа-яЁёЎўҚқҒғҲҳ'-]{2,}$/; // Allow Latin and Cyrillic letters for Uzbek names

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

      // Clear error when user starts typing
      if (error) setError("");
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      // Clear name error when user starts typing
      if (name === "name" && nameError) setNameError("");
    }
  };

  // Handle country selection change
  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);

    // Find the selected country
    const selectedCountryData = countries.find(
      (country) => country.code === countryCode
    );

    // Update form data with the selected country's phone code and clear phone input
    setFormData({
      ...formData,
      countryCode: selectedCountryData.phoneCode,
      phone: "", // Reset phone when changing country
    });

    // Clear phone validation errors
    setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    const isNameValid = validateName(formData.name);
    const isPhoneValid = validatePhone(formData.phone, selectedCountry);

    if (!isNameValid || !isPhoneValid) {
      return;
    }

    setLoading(true);

    try {
      const scriptURL = GOOGLE_SHEETS_TOKEN;

      const now = new Date();
      const formattedDate = now.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const formBody = new URLSearchParams();
      formBody.append("Name", formData.name);
      formBody.append(
        "Phone number",
        `${formData.countryCode} ${formData.phone}`
      );
      formBody.append("Date", formattedDate);

      await fetch(scriptURL, {
        method: "POST",
        body: formBody,
        mode: "no-cors",
      });

      setFormSubmitted(true);
      sessionStorage.setItem("reloadAfterThankYou", "true");
      router.push("/thank-you-for-reality-show");
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
    console.log("Form opened");

    setFormVisible(true);
    // Disable scrolling
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  };

  // Close registration form
  const hideRegistrationForm = () => {
    setFormVisible(false);
    setError("");
    setNameError("");
    // Enable scrolling
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
    <div className="main-container">
      <div className="container">
        <header className="reality-show-header">
          <h2 className="reality-show-title">Buyuk Zamon</h2>
          <div className="reality-show-date-container">
            <div className="on-off-animation"></div>
            <h2 className="reality-show-date">15 - apreldan</h2>
          </div>
          <div className="reality-show-subtitle-container">
            <h2 className="reality-show-subtitle">
              Reality - show Dostonjon Soyibovdan
            </h2>
          </div>
        </header>
        <main className="reality-show-main">
          <h1 className="reality-show-main-title">Qilichbek Qishloqda </h1>
          <p className="reality-show-main-description">
            Milliarder hech qanday tanish bilishlarsiz, pul yoki o‘z ismidan
            foydalanmagan holda noldan pul topa oladimi?
          </p>

          <div className="reality-show-content">
            <div className="reality-show-images">
              <Image
                src={arrow}
                alt="arrow"
                className="arrow"
                priority={true}
                quality={50}
              />
              <div className="reality-show-main-image-container-1">
                <Image
                  src={main_3}
                  alt="main_1"
                  className="reality-show-main-image"
                  width={170}
                  priority={true}
                  quality={75}
                />
              </div>
              <div className="reality-show-main-image-container-2">
                <Image
                  src={main_4}
                  width={170}
                  alt="reality-show-main-image"
                  className="reality-show-main-image"
                  priority={true}
                  quality={75}
                />
              </div>
            </div>
            <div className="reality-show-description">
              <p>
                Bu — Dostonjon Soyibov, yillik aylanmasi 12.3 mlrd $ bo‘lgan
                tadbirkorlar uchun mo‘ljallangan "Buyuk Zamon" kompaniyasining
                asoschisi. U 3 kun oldin o‘zini "nolga qaytarishga" qaror
                qiladi. Hammasini 0 dan boshlaydi.
              </p>
            </div>
          </div>

          <div className="reality-show-content-2">
            <div className="reality-show-description-2">
              <ul
                style={{
                  marginLeft: "25px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <li>
                  U Toshkentdagi uyidan <br />
                  chiqib, qishloqdagi oddiy <br /> kvartiraga ko‘chib o‘tadi.
                </li>
                <li>
                  U o‘z hisoblaridagi <br /> pullardan <br /> voz kechadi.
                </li>
                <li>
                  Ismini va tashqi <br /> ko'rinishini <br /> o'zgartiradi.
                </li>
              </ul>
            </div>
            <div className="reality-show-images-2">
              <div className="reality-show-main-image-container-3">
                <Image
                  src={main_1}
                  alt="main_1"
                  className="reality-show-main-image"
                  width={170}
                  priority={true}
                  quality={75}
                />
              </div>
              <div className="reality-show-main-image-container-4">
                <Image
                  src={main_2}
                  width={170}
                  alt="reality-show-main-image"
                  className="reality-show-main-image"
                  priority={true}
                  quality={75}
                />
              </div>
            </div>
          </div>

          <p className="reality-show-descr">
            Dostonjon Soyibov shaxsiy misolida noldan biznes boshlash
            mumkinligini va bir hafta ichida qancha daromad topish mumkinligini
            ko‘rsatadi. Tomosha qiling va uning ortidan takrorlang!
          </p>

          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <button className="show-button" onClick={showRegistrationForm}>
              RO'YXATDAN O'TISH
            </button>
          </div>
          <div className="free-label">
            <span className="arrow-up">
              <Image
                src={arrow_2}
                alt="Arrow"
                width={50}
                height={50}
                style={{ rotate: "180deg" }} // Invert colors to change white to black
              />
            </span>
            BEPUL
          </div>
        </main>
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
            "IT BUYUK ZAMON SARI" MCHJ H/r:20208000007161231001 MFO 01183 INN
            311693446 Toshkent sh. Yunusobod t. Posira MFY, Bog‘ishamol ko'chasi
            , 260а-uy
            <br />
            <br />
             This site or product is not part of or endorsed by
            Facebook, Google, or any social media platform in any way FACEBOOK
            is a trademark of META PLATFORMS, Inc. YOUTUBE and GOOGLE are
            trademarks of ALPHABET, Inc.
          </p>
          <p className="footer-rights">Barcha huquqlar himoyalangan, 2025.</p>
        </div>
      </footer>
    </div>
  );
}
