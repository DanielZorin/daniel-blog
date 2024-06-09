import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useLanguage() {
  const [language, setLanguage] = useState("ru");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlLang = searchParams.get("lang");

    if (urlLang && urlLang !== language) {
      setLanguage(urlLang);
    } else {
      searchParams.set("lang", language);
    }

    navigate(
      {
        search: searchParams.toString(),
      },
      { replace: true }
    );
  }, [language, location.search, navigate]);
  return { language, setLanguage };
}

export default useLanguage;
