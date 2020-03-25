import React from "react";

function AddAdvertBtn(props) {
    return (
        <div className="add-item" onClick={props.function}>
            <div className="add-icon">
                +
            </div>
            <div className="title">
                Добавить новое объявление
            </div>
        </div>
    )
}

export default AddAdvertBtn