import React from 'react'
import { store } from '../redux/store'
import { setLanguage } from '../redux/actions'; 
import { Link, useHistory, useLocation } from 'react-router-dom';
import './header.style.scss'

function LanguageSwitcher() {
    const history = useHistory();
    const location = useLocation();

    const switchToLanguage = (newLang, event) => {
        event.preventDefault();
        const currentPath = location.pathname;
        history.push(`${currentPath}?lang=${newLang}`);
        store.dispatch(setLanguage(newLang));
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