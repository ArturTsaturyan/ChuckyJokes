import './Button.css';
import React from 'react';


export default function Button({value,onClick}){
    return(
        <div>
            <input type="submit" value={value} className="btn" onClick={onClick} />
        </div>
    )
}