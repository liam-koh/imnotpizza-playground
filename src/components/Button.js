import React from 'react';

//CSS 반영 : className=
const Button=({children, clickHandler, className})=>
    <div>
        <button className={className} onClick={clickHandler}>{children}</button>
    </div>

export default Button;