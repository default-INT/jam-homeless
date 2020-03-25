import React from "react";


function Avatar(props) {
    return (
        <div id='avatar-img'>
            <img id="avatar" src={props.imgSrc} alt="" width="140px"/>
        </div>
    );
}

export default Avatar