import React from 'react'
import './header.style.scss'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <nav className="menu">
            <ul className="menuItems">
                <li><Link to="/">Путешествия</Link></li>
                <li><Link to="/map">Карта</Link></li>
                <li><Link to="/list">Содержание</Link></li>
                <li><Link to="/plans">Планы</Link></li>
                <li><Link to="/contacts">Контакты</Link></li>
            </ul>
        </nav>
    )
}

export default Header;