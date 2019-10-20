import React from 'react'
import classes from './Input.css'

const input = (props) =>{
    let inputElement = null; 

    switch (props.inputType) {
        case ('input'):
            inputElement = 
                <input 
                    className={classes.inputElement} 
                    {...props.elementConfig } 
                    value={props.value}/>;
            break;
        case ('testarea'):
            inputElement = 
                <textarea 
                    className={classes.inputElement} 
                    {...props.elementConfig} 
                    value={props.value}/>;
            break;
        default :
            inputElement = 
                <input 
                 className={classes.inputElement}
                 {...props.elementConfig} 
                 value={props.value}/>;
    }

    return (
            <div className={classes.Input}>
                <label className={classes.Label}>{props.label}</label>
                {inputElement}
            </div>

    );
};

export default input;