import React from "react";
import "./contacts.style.scss";
import useLanguage from "../redux/use-language";

const Contacts = () => {
  const { language: lang } = useLanguage();

  return (
    <div className="flex flex-col">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <a
        href={
          lang == "ru"
            ? "https://juan.livejournal.com/"
            : "https://juan-sintierra.livejournal.com/"
        }
      >
        <span className="fa">
          <img
            src="https://ic.pics.livejournal.com/juan/8338504/692734/692734_900.png"
            alt=""
            width="19"
            title="lj"
          />
        </span>{" "}
        <b> Livejournal</b>
      </a>

      <a href="https://www.instagram.com/danielzorin/">
        <span className="fa fa-instagram"></span> danielzorin
      </a>

      <a href="https://www.facebook.com/daniel.zorin1">
        <span className="fa fa-facebook"></span> Daniel Zorin
      </a>
    </div>
  );
};

export default Contacts;
