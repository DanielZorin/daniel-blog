import React, { useState } from 'react'
import './header.style.scss'
import { Link } from 'react-router-dom'
import LanguageSwitcher from './language-switcher.component.js'
import SearchPage from '../pages/search.component'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min.js'

function Header() {
    const [search, setSearch] = useState('')
    const location = useLocation();
    const lang = new URLSearchParams(location.search).get('lang') || 'ru';

    const addLang = (s) => {
        return s + "?lang=" + lang;
    }

    // TODO: disable search link when string is empty
    return (
        <>
            <LanguageSwitcher />
            <nav className="menu">
                <ul className="menuItems">
                    <li><Link className="menuLink" to={addLang("/")}>{ lang === "ru" ? "Путешествия" : "Trips" }</Link></li>
                    <li><Link className="menuLink" to={addLang("/map")}>{ lang === "ru" ? "Карта" : "Map" }</Link></li>
                    <li><Link className="menuLink" to={addLang("/list")}>{ lang === "ru" ? "Содержание" : "Contents" }</Link></li>
                    <li><Link className="menuLink" to={addLang("/plans")}>{ lang === "ru" ? "Планы" : "Plans" }</Link></li>
                    <li><Link className="menuLink" to={addLang("/contacts")}>{ lang === "ru" ? "Контакты" : "Contacts" }</Link></li>
                </ul>
            </nav>
            {/*
            <div className="searchBox">
                <input type="text" onChange={(e) => setSearch(e.target.value)} />
                <Link to={"/search/" + search}>
                    <button className="searchButton">&#x1F50D;</button>
                </Link>
            </div>
            */}
        </>
    )
}

export default Header;