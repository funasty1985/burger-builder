import React from 'react'
import classes from './Input.css'

const input = (props) =>{
    let inputElement = null; 
    const inputClasses = [classes.inputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }
    switch (props.inputType) {
        case ('input'):
            inputElement = 
                <input 
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig } 
                    value={props.value}
                    onChange={props.changed}           
                    />;
            break;
        case ('testarea'):
            inputElement = 
                <textarea 
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.changed}
                    />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')} 
                    style={{paddingLeft:6}}
                    value={props.value} 
                    onChange={props.changed}                   
                    >
                    {props.elementConfig.options.map(option =>(
                        <option key={option.value} value={option.value}>
                            {option.displayValues}
                        </option>
                    ))}

                </select>
            ) 
                
        break;
        default :
            inputElement = 
                <input 
                 className={inputClasses.join(' ')}
                 {...props.elementConfig}
                 onChange={props.changed} 
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