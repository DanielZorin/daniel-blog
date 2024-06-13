import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function useLanguage() {
  let { lang } = useParams();

  return { language: lang };
}

export default useLanguage;
