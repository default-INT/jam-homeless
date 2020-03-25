import React from "react";

/**
 *
 * @param props
 * @return {*}
 * @constructor
 */
function Advert(props) {
    return (
        <div className="item" onClick={props.onclick}>
            <div className="item-img">
                <img src={props.imgUrl} alt="" width="140px" />
            </div>
            <div className="title">
                {props.title}
            </div>
        </div>
    )
}

export default Advert;