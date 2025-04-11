"use client";

import Image from "next/image";
import "../style/home.css";
import { useEffect, useState, useRef } from "react";
import MainDavronbek from "../../../public/img/main-davronbek.png";
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
    <>
      <div className="text">
        {/* Date Header */}
        <div className="main-text-center container">
          <div className="main-text">
            <span className="main-text-span2">20-Aprel | Soat 20:00 da</span>
          </div>
        </div>

        {/* Small Info Text */}
        <p className="main-text-p container">
          Dostonjon Soyibovdan 1 kunlik bepul masterklass
        </p>

        {/* Main Heading */}
        <div className="main-text-h1">
          <h1>
            Qanday qilib 5 kun ichida hech qanday mahsulotsiz, pulsiz 0 dan
            biznes boshladim va real daromadga chiqdim — qadam-baqadam haqiqiy
            jarayonim bilan bo'lishaman.
          </h1>
        </div>

        {/* Hero Section - Wrapped for desktop layout */}
        <div className="hero-section">
          <div className="hero-right">
            {/* Speaker Image */}
            <div className="mobile-img">
              <Image
                src={MainDavronbek}
                alt="Dostonjon Soyibov"
                width={321}
                height={338}
                className="first-main-img"
                priority={true}
                quality={60}
              />
              <div className="mobile-img_after">
                Dostonjon Soyibov
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <rect width="14" height="14" fill="url(#pattern0_1_41)" />
                  <defs>
                    <pattern
                      id="pattern0_1_41"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlinkHref="#image0_1_41"
                        transform="scale(0.0111111)"
                      />
                    </pattern>
                    <image
                      id="image0_1_41"
                      width="90"
                      height="90"
                      preserveAspectRatio="none"
                      xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFA0lEQVR4nO2dy28cRRDGmzzgBBxASuzutTHkxIVD/gFAgTgRCAhcCA8hcuHAHRCG/AEk5iVy4y0RZIUTxpts1bBSlAtgIfmCxB2MwylESEkUkw/VemxtnKx3dtMz1T3bn1TSyvLOTP+2trpn+uteY5KSkpKSkpKSkpKSkpIG154F3GEZByzhY0c4ZwkrlnApj5XO3xgfOcL0g3O4fYhTjLb2LOAuR3jHMf52DBSM844wI+/Vvv4oZBnPWcbyAICvC8v407ZwSLsd4WoO2x3h/WEB3yRm5ZjazQoPMuNLj5DXs/tb08YO7eYFI8eY9Q25C/ZxMyqaaGLMZnjJMk5YRtMSFiUco+0Yp8qC3BVyjvbGeQkLlvGJZbw42cZuE7saGR63hDOOsVoBzGFj1TJOjxP2mdg0cQZTjsEBQMRAZYbQmmzjPhODHOMZR7ioDc0NG4SLDcJTJmQ5xpHAywQKhrThiAk2k+sBGeuwg8tsqWtRlwvuGf82MjxgQlGMHZ8rGDJqMqEM4bRhuLJhZ3hUm7PJx8modRAW1O/4atYBogfoq6p3kJbwsjoErgz2YT3QjBPqALiakJkcTdCntQG46mJeD/TaE7hRyeif1UA7xq8RArtsGW9I5yYhry3jSoH3/aIHmvBjhJAPbG6HJbxZ4P2smdHfxQ65a5ja7xinTOWaw3aZIqoD5AFAy+34seomfNdmq7+OBjLh0laQRZbwVuFjEr6qBLZnSwDUIYsTinF5wGPPlm5u0Ybn9CGvHb8sk45YrcQFpA3QFYHAuDLOeHKr9rgW9suHcQsf5F/3E+72Btox3tUG6AKBvBGEGe+uzgENh7UsF+7G863sXcROb6BthoPaEF1ImdwdLez3B1o8yAHAdIFk8nVB+MAbaDF8e4RydpzxmmO87uOhlCrkvD3eQHfc9X4u6htzFNs2DtzGDkv4LFbInWtgLPsE7aWu7c4wecPBj2KbZXwaI+T16wgN9H89e+gBYReCnOFg2ZDLAO2ndDAe6XmSgrBDguy9dHjsDH8fa+PeYWGHBtl/Z+hzeEdYGgZ2p3wRpkOCXMbwbtrz1+23LX0SwG3dM+yFbkYI095vRgpEg/GYN9CyWLKzjs9vJiwVyexgMzl/sOT1FlwkD1BK+Not9YWd4aEQIefZ/LbxrXvO4U5L+MN7VnCfMhJgucive7mUx6QiS3i2lAunPpkdWCY7wjXHeNpEuSaQisNWhbw+SRvrKldXsIxolosc8slKZ8JLsxtQ78wOIpM11peXZqAhLE0xdnWfa5zwhCZkHQNNNZaw87JnR4PxiiV8nndAWpDlw8/0QEdocnRDhqrJcaRsu4Sf9EAzmtoA3EgY0dPSimoke3AEkGmoJDI8b7Q0SsvfpjYNNyvXiCwYmjfakp1bAgCBMmPLuc4qJTu31Bhy04S0jYRl/FNDyBfGCBMmJMkmIjXrGFf7zVOqqVZb/RBeNSFLMjvmMmIZF4LN5M0Sj12Mwz7LaAZXk4tIdm5xhB+CLieEqzJOtoSHTeyaYuxyhBdyx9N819aVWWVbZhKyrq06v883+D6sfsdXpSzhWGnlgPCedvvC0VxnwveLEiCfTNsa3xy2HysD4ZraRGossi0cupWFo7mbqlxzS81+TGFmEAO8/K944cS6pn390WnvInbmGxh+KIZv8btt/DzI2uuz4k8W66x3V2dSUlJSUlJSUlJSUpIZEf0PpHDO/fStsTgAAAAASUVORK5CYII="
                    />
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <div className="hero-left">
            <div className="mobile-text">
              <button
                className="show-button"
                onClick={showRegistrationForm}
              >
                RO'YXATDAN O'TISH
              </button>
              <p className="mobile-text-p">BEPUL</p>
            </div>

            {/* Countdown Timer */}
            <div className="countdown-section">
              <div className="countdown-title">
                Ro'yxatdan o'tish uchun qolgan vaqt:
              </div>
              <div className="countdown-time">02:00</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <h2 className="features-title">Masterklassda siz:</h2>

        <div className="features-container">
          <div className="feature-item">
            <div className="feature-text">
              Yangi mijozlarni topish uchun o'ziga xos usullarni
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-text">
              Sotuvni 5X oshirish bo'yicha kerakli strategiyalarni
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-text">
              Raqobatchilardan ajralib turish va kuchli pozitsiyani egallash
              bo'yicha strategiyalarni ko'rib chiqamiz
            </div>
          </div>
        </div>

        {/* Register Button Again */}
        <div className="mobile-text">
          <button className="show-button" onClick={showRegistrationForm}>
            RO'YXATDAN O'TISH
          </button>
          <p className="mobile-text-p">BEPUL</p>
        </div>
      </div>

      {/* Form Section */}
      {formVisible && (
        <div className="form">
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button className="f-button" onClick={hideRegistrationForm}>
              <i className="fa-solid fa-xmark">✕</i>
            </button>
            <div className="form-container">
              <div className="form-h1">
                <h1>Davom etish uchun quyidagi formani to'ldiring.</h1>
              </div>
              {!formSubmitted ? (
                <>
                  {!loading ? (
                    <form
                      id="form"
                      name="contact-form"
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      <div className="hide-form-div">
                        <label htmlFor="name">Ismingizni kiriting:</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={nameError ? "error-input" : ""}
                        />
                        {nameError && <p className="name-error">{nameError}</p>}

                        <label htmlFor="phone">Telefon raqamingiz:</label>
                        <div className="phone-input">
                          <div className="flag-container">
                            <img
                              src={`/img/flags/${selectedCountry.toLowerCase()}.png`}
                              alt="Bayroq"
                              width={24}
                              height={18}
                              className="flag-img"
                              id="flag"
                            />
                          </div>
                          <select
                            id="country"
                            value={selectedCountry}
                            onChange={handleCountryChange}
                          >
                            {countries.map((country) => (
                              <option
                                key={country.code}
                                value={country.code}
                                data-maxlength={country.maxLength}
                              >
                                ({country.phoneCode})
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder={
                              countries.find((c) => c.code === selectedCountry)
                                ?.placeholder || ""
                            }
                            pattern={
                              countries.find((c) => c.code === selectedCountry)
                                ?.pattern || ""
                            }
                            value={formData.phone}
                            onChange={handleInputChange}
                            maxLength={
                              countries.find((c) => c.code === selectedCountry)
                                ?.maxLength || 12
                            }
                            ref={phoneInputRef}
                            className={error ? "error-input" : ""}
                          />
                        </div>

                        {error && (
                          <p className="warning-p" style={{ display: "block" }}>
                            {error}
                          </p>
                        )}

                        <button type="submit" className="submit-button">
                          DAVOM ETISH
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="show-form-div" style={{ display: "block" }}>
                      <p>
                        Kuting, ma'lumotlaringiz yuborilmoqda
                        <span className="dots">...</span>
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
                  <button
                    className="close-button"
                    onClick={hideRegistrationForm}
                  >
                    Yopish
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-content">
          <h2 className="footer-title">Dostonjon Soyibov</h2>
          <p className="footer-disclaimer">
            "IT BUYUK ZAMON SARI" MCHJ H/r:20208000007161231001 MFO 01183 INN
            311693446 Toshkent sh. Yunusobod t. Posira MFY, Bog‘ishamol ko'chasi
            , 260а-uy
            <br />
            <br />
            This site or product is not part of or endorsed by Facebook, Google,
            or any social media platform in any way FACEBOOK is a trademark of
            META PLATFORMS, Inc. YOUTUBE and GOOGLE are trademarks of ALPHABET,
            Inc.
          </p>
          <p className="footer-rights">Barcha huquqlar himoyalangan, 2025.</p>
        </div>
      </footer>
    </>
  );
}
