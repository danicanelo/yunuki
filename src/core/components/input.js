import React from "react";

export function Input({label, id, type, value, onChange}){
    return (
        <div>
            <label className="is-block" htmlFor="{id}">{label}</label>
            <input className="input"
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange} 
            />
        </div>
    )
}