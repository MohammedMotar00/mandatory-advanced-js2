import React from 'react'
import { Link } from 'react-router-dom'

function NavLinks() {
    return (
        <div className="NavLinks">
            <Link to="/">
                <p className="p-links">Main</p>
            </Link>

            <Link to="/add">
                <p className="p-links">Add</p>
            </Link>
        </div>
    )
}

export default NavLinks
