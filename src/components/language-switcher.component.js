import React from 'react'
import { store } from '../redux/store'
import { setLanguage } from '../redux/actions'; 
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './header.style.scss'
import useLanguage from '../redux/use-language';

function LanguageSwitcher() {
    const { setLanguage } = useLanguage()
    const navigate = useNavigate();
    const location = useLocation();

    const switchToLanguage = (newLang, event) => {
        event.preventDefault();
        const currentPath = location.pathname;
        navigate(`${currentPath}?lang=${newLang}`);
        setLanguage(newLang)
    };

    return (
        <div align="right">
            <Link className="menuLink" to="#" onClick={(e) => switchToLanguage('en', e)}>
                EN
            </Link>
            {' | '}
            <Link className="menuLink" to="#" onClick={(e) => switchToLanguage('ru', e)}>
                RU
            </Link>
        </div>
    );
}

export default LanguageSwitcher;