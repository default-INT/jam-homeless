import React from "react";
import AddAdvertBtn from "./AddAdvertBtn";
import Advert from "./Advert";
import Consts from "../../Consts";

/**
 * Вложенный элемент в MenuContainer. Загружает все объявления выложенные пользователем.
 */
class MyAdvertList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            myAdverts: undefined
        }
    }

    /**
     * Отправляет AJAX запрос на сервер и получает ответ в виде JSON файла со списокм объявлений пользователя.
     * adverts{id, title, imgUrl[]}
     */
    componentDidMount() {
        fetch(Consts.apiMyAdverts)
            .then(response => response.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    myAdverts: result.myAdverts
                })
            }, (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            });
    }

    /**
     * Создаётся окно для создания нового объявления в основной части экрана (DataContainer).
     */
    openFormCreateAdvert() {
        console.log('Create advert form')
    }

    /**
     * Загружает информацию об объявлении в основном окне (DataContainer).
     * @param id
     */
    loadAdvert(id) {
        console.log('load advert with id ' + id);
    }

    render() {
        const {error, isLoaded, myAdverts} = this.state;
        if (error) {
            return (
                <div>
                    <AddAdvertBtn function={this.openFormCreateAdvert()}/>
                    <div className="content-list prevent-scroll" id="itemList">
                        {error.message}
                    </div>
                </div>
            )
        } else if (!isLoaded) {
            return (
                <div>
                    <AddAdvertBtn function={this.openFormCreateAdvert()}/>
                    <div className="content-list prevent-scroll" id="itemList">
                        Загрузка объявлений...
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <AddAdvertBtn function={this.openFormCreateAdvert()}/>
                    <div className="content-list prevent-scroll" id="itemList">
                        {
                            myAdverts.map(advert =>
                                <Advert onclick={this.loadAdvert(advert.id)} title={advert.title}
                                        imgUrl={advert.imgUrls[0]}/>
                            )
                        }
                    </div>
                </div>
            )
        }
    }
}

export default MyAdvertList;