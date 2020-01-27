export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const  checkValidatity = (value, rules) => {
    let isValid = true; 
    if (rules.required){
        isValid = value.trim() !== '' && isValid; 
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid; 
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid; 
    }
    console.log('the valiation result is ::', isValid)
    return isValid
}