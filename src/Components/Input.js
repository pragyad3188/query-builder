import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {

    const changeHandler=(e)=>{
        props.changeValue(e.target.value);
    };
    
  return (
      <div>
        <p className="text-white font-medium text-xs pb-2">{props.label}</p>
        <input 
            placeholder={props.placeholder}
            type={props.type}
            value={props.inputValue}
            onChange={changeHandler}
            className="py-2 pl-4 pr-1 rounded-md font-medium text-sm w-60 text-left text-white opacity-50 bg-grey-2 border border-grey-2">   
            </input>
    </div>
  );
}

Input.propTypes ={ 
    label:PropTypes.string,
    placeholder:PropTypes.string,
    type:PropTypes.string,
    changeValue:PropTypes.func,
};

export default Input;
