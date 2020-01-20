import React from 'react'
import { Link } from 'react-router-dom'

function NavLinks() {
    return (
        <div>
            <Link to="/">
                <p>Main</p>
            </Link>

            <Link to="/add">
                <p>Add</p>
            </Link>
        </div>
    )
}

export default NavLinks
