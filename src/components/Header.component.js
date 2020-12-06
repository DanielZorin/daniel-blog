import React from 'react'
import './header.style.scss'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <nav className="menu">
            <ul className="menuItems">
                <li><Link className="menuLink" to="/">Путешествия</Link></li>
                <li><Link className="menuLink" to="/map">Карта</Link></li>
                <li><Link className="menuLink" to="/list">Содержание</Link></li>
                <li><Link className="menuLink" to="/plans">Планы</Link></li>
                <li><Link className="menuLink" to="/contacts">Контакты</Link></li>
            </ul>
        </nav>
    )
}

export default Header;