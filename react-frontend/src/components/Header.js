import React from 'react';
import logo from '../img/logo.png';

function Header() {
    return (
        <header>
            <h1>
                homeless
                <img src={logo} alt=''/>
            </h1>
        </header>
    )
}

export default Header
