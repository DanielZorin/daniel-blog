import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './header.style.scss'
import useLanguage from '../redux/use-language';

function LanguageSwitcher() {
    const navigate = useNavigate();
    const location = useLocation();

    const switchToLanguage = (newLang, event) => {
        event.preventDefault();
        const currentPath = location.pathname;
        const pathSegments = currentPath.split('/');
        pathSegments[1] = newLang;
        const newPath = pathSegments.join('/');
        navigate(newPath);
    };

    const langLink = (lang) => {
        const currentPath = location.pathname;
        const pathSegments = currentPath.split('/');
        pathSegments[1] = lang;
        const newPath = pathSegments.join('/');
        return newPath
    }

    return (
        <div align="right">
            <Link className="menuLink" to={langLink("en")} onClick={(e) => switchToLanguage('en', e)}>
                EN
            </Link>
            {' | '}
            <Link className="menuLink" to={langLink("ru")} onClick={(e) => switchToLanguage('ru', e)}>
                RU
            </Link>
        </div>
    );
}

export default LanguageSwitcher;