import React from "react";
import STERLKA from "../../../public/img/STERLKA.webp";
import Image from "next/image";
import "../style/thank-you.css";
import telegromIcon from "../../../public/img/telegram.png";

export default function ThankYou() {
  return (
    <>
      <main className="container main">
        <div className="thank-you-content">
          <h1 className="thank-you-title">Oxirgi qadam qoldi!</h1>
          <p className="thank-you-description">
            Jonli efirda qatnashish uchun quyidagi tugmani
            <br /> bosib yopiq kanalga obuna bo'ling!
          </p>
          <Image
            src={STERLKA}
            alt="Sterlka"
            width={253}
            height={102}
            className="sterlka"
          />

          <a
            className="tn-atom subscribe-button"
            href="https://t.me/+B_sUpK5EZrcyY2Ji"
          >
            OBUNA BO'LISH
            <Image
              src={telegromIcon}
              alt="Telegram"
              width={52}
              height={52}
              className="telegram-icon"
            />
          </a>
        </div>
      </main>

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
    </>
  );
}
