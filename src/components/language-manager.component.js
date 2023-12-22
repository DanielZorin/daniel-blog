import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { setLanguage } from '../redux/actions';

const LanguageManager = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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

    history.replace({ search: searchParams.toString() });

  }, [lang, location.search, history, dispatch]);

  return null; 
};

export default LanguageManager;