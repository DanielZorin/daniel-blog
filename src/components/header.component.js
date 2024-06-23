import React from "react";
import "./header.style.scss";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./language-switcher.component.js";
import useLanguage from "../redux/use-language.js";

function Header() {
  const { language } = useLanguage();

  const addLang = (s) => {
    return "/" + language + s;
  };

  return (
    <>
      <LanguageSwitcher />
      <nav className="border-b-[2px] flex flex-col md:flex-row w-full">
        <div className="flex items-center justify-center border-[2px] w-full md:w-1/5">
          <Link className="menuLink" to={addLang("/")}>
            {language === "ru" ? "Главная" : "Home"}
          </Link>
        </div>
        <div className="flex items-center justify-center border-[2px] w-full md:w-1/5">
          <Link className="menuLink" to={addLang("/history")}>
            {language === "ru" ? "Хронология" : "History"}
          </Link>
        </div>
        <div className="flex items-center justify-center border-[2px] w-full md:w-1/5">
          <Link className="menuLink" to={addLang("/list")}>
            {language === "ru" ? "Страны" : "Countries"}
          </Link>
        </div>
        <div className="flex items-center justify-center border-[2px] w-full md:w-1/5">
          <Link className="menuLink" to={addLang("/guides")}>
            {language === "ru" ? "Обзоры" : "Guides"}
          </Link>
        </div>
        <div className="flex items-center justify-center border-[2px] w-full md:w-1/5">
          <Link className="menuLink" to={addLang("/stats")}>
            {language === "ru" ? "Статистика" : "Stats"}
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Header;
