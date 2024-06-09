import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setLanguage } from '../redux/actions';

const LanguageManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useSelector((state) => state.language);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlLang = searchParams.get('lang');

    if (urlLang && urlLang !== lang) {
        dispatch(setLanguage(urlLang));
    } else {
        searchParams.set('lang', lang);
    }

    navigate({
      search: searchParams.toString()
    }, { replace: true });

  }, [lang, location.search, navigate, dispatch]);

  return null; 
};

export default LanguageManager;