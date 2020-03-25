import React from "react";
import Avatar from "./Avatar";
import Consts from "../../Consts";

/**
 * Вложенный элемент в Menu. Занимается получением и выводом данных о пользователе.
 */
class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            user: undefined
        };
    }

    /**
     * Получение данных о пользователе
     */
    componentDidMount() {
        fetch(Consts.userInfoUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        user: result
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    /**
     * Загрузка профиля пользователя в body-component
     *
     * @param userId {number}
     */
    loadProfile(userId) {
        //
    }

    render() {
        const { error, isLoaded, user} = this.state;
        if (error) {
            return (
                <div className="profile-menu">
                    <Avatar imgSrc="/img/X.png"/>
                    <div id="fullname">
                        {error.message}
                    </div>
                </div>
            )
        } else if (!isLoaded) {
            return (
                <div className="profile-menu">
                    <Avatar imgSrc="/img/avatar-loaded.webp"/>
                    <div id="fullname">
                        Загрузка...
                    </div>
                </div>
            )
        } else {
            return (
                <div className="profile-menu">
                    <Avatar imgSrc="/img/play_cat.webp"/>
                    <div id="fullname">
                        <a onClick={this.loadProfile(user.id)}>
                            {user.fullName}
                        </a>
                    </div>
                </div>
            );
        }
    }
}

export default Profile