import React from 'react'
import './header.style.scss'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <nav>
            <ul class="menuItems">
                <li><Link to="/">Путешествия</Link></li>
                <li><Link to="/map">Карта</Link></li>
                <li><Link to="/list">Содержание</Link></li>
                <li><Link to="/plans">Планы</Link></li>
            </ul>
        </nav>
    )
}

export default Header;