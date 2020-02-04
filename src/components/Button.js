import React from 'react';

const Button=({children, clickHandler})=>
    <div>
        <button onClick={clickHandler}>{children}</button>
    </div>

export default Button;