import React from "react";
import MyAdvertList from "./MyAdvertList";
import Contact from "./Contact";

/*
const styles = StyleSheet.create({
    pressBtn: {
        background: '#00b95e',
        color: 'white'
    }
});

 */

/**
 * Вложенный элемент в меню. Представляет собой список объявлений и список контактов (людей которые заинтересовались
 * объявлением).
 */
class MenuContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            myAdvertBtn: true,
            myContactBtn: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Событие для переключния между пунктами в меню.
     */
    handleClick() {
        this.setState(state => ({
            myAdvertBtn: !state.myAdvertBtn,
            myContactBtn: !state.myContactBtn
        }));
    }

    render() {
        const {myAdvertBtn, myContactBtn} = this.state;
        if (myAdvertBtn) {
            return (
                <div className="menu-container">
                    <div className="choice-section">
                        <div id="my-advert">
                            Мои объявления
                        </div>
                        <div id="message">
                            Сообщения
                        </div>
                    </div>
                    <MyAdvertList />
                </div>
            )
        } else if (myContactBtn) {
            return (
                <div className="menu-container">
                    <div className="choice-section">
                        <div id="my-advert">
                            Мои объявления
                        </div>
                        <div id="message">
                            Сообщения
                        </div>
                    </div>
                    <Contact/>
                </div>
            )
        }
        return (
            <div className="menu-container">
                <div className="choice-section">
                    <div id="my-advert">
                        Мои объявления
                    </div>
                    <div id="message">
                        Сообщения
                    </div>
                </div>
            </div>
        )

    }
}

export default MenuContainer