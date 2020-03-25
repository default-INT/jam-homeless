import React from 'react';
import Header from "./Header";
import Profile from "./profile/Profile";
import '../css/main.css';
import MenuContainer from "./menucontainer/MenuContainer";

class Menu extends React.Component{
    render() {
        return (
            <div>
                <Header/>
                <Profile/>
                <MenuContainer />
            </div>
        )
    }
}

export default Menu