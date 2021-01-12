import React, { useState } from 'react'
import './header.style.scss'
import { Link } from 'react-router-dom'
import SearchPage from '../pages/search.component'

function Header() {
    const [search, setSearch] = useState('')

    // TODO: disable search link when string is empty
    return (
        <>
            <nav className="menu">
                <ul className="menuItems">
                    <li><Link className="menuLink" to="/">Путешествия</Link></li>
                    <li><Link className="menuLink" to="/map">Карта</Link></li>
                    <li><Link className="menuLink" to="/list">Содержание</Link></li>
                    <li><Link className="menuLink" to="/plans">Планы</Link></li>
                    <li><Link className="menuLink" to="/contacts">Контакты</Link></li>
                </ul>
            </nav>
            <div className="searchBox">
                <input type="text" onChange={(e) => setSearch(e.target.value)} />
                <Link to={"/search/" + search}>
                    <button className="searchButton">&#x1F50D;</button>
                </Link>
            </div>
        </>
    )
}

export default Header;