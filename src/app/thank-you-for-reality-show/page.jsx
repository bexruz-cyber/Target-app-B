"use client";

import "@/app/style/thank-you-for-reality-show.css";
import Image from "next/image";
import main_1 from "../../../public/img/main/main_1.jpg";
import main_2 from "../../../public/img/main/main_2.jpg";
import main_3 from "../../../public/img/main/main_3.png";
import main_4 from "../../../public/img/main/main_4.png";
import arrow from "../../../public/img/main/arrow.svg";
import arrow_2 from "../../../public/img/arrow.png"; // Ensure this path is correct
import Link from "next/link";

export default function RealityShowPromo() {
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
              Reality - show Dostonjon Sobiovdan
            </h2>
          </div>
        </header>
        <main className="reality-show-main">
          <h1 className="reality-show-main-title">
            Roʻyxatdan oʻtish deyarli tugallandi.{" "}
          </h1>
          <p className="reality-show-main-description">Oxirgi qadam qoldi!</p>

          <div></div>

          <div className="reality-show-images">
            <div className="reality-show-main-image-container-1">
              <Image
                src={main_2}
                width={170}
                alt="reality-show-main-image"
                className="reality-show-main-image"
                priority={true}
                quality={75}
              />
            </div>
            <div className="reality-show-main-image-container-2">
              <Image
                src={main_1}
                width={170}
                alt="reality-show-main-image"
                className="reality-show-main-image"
                priority={true}
                quality={75}
              />
            </div>
          </div>

          {/* <div className="reality-show-images-2">
            <div className="reality-show-main-image-container-3">
              <Image
                src={main_4}
                width={170}
                alt="reality-show-main-image"
                className="reality-show-main-image"
                priority={true}
                quality={75}
              />
            </div>
          </div> */}

          <div className="reality-show-images-3">
            <div className="reality-show-main-image-container-3">
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

          <p className="reality-show-descr"></p>

          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Link href={"https://t.me/dostonjonsoyibov"} className="show-button">Obuna Bo'lish</Link>
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
