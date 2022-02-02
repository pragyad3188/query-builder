import React, { useState } from 'react';
import PropTypes from 'prop-types';
import arrow from '../Icons/downArrow.svg'
function DropdownBar(props) {
    const [showDropdownToggle,setShowDropdownToggle]=useState(false);
    
    const valueSelectedStyle="py-2 pl-4 pr-1 rounded-md font-medium text-sm w-60 text-left text-white bg-white2 border border-grey-3";
    const valueNotSelectedStyle="py-2 pl-4 pr-1 rounded-md font-medium text-sm w-60 text-left text-white opacity-50 bg-grey-2 border border-grey-2";
    
    function toggleDropwdown()
    {
        setShowDropdownToggle(!showDropdownToggle);
    }
    function valueClicked(v)
    {
        props.setValueSelected(v);
        toggleDropwdown();
    }
  return (
    <div className="relative">
        <div className="text-white font-medium text-xs pb-2">{props.title}</div>
        <button onClick={toggleDropwdown} className={props.valueSelected ? valueSelectedStyle:valueNotSelectedStyle}>
            {props.valueSelected || "Select Field"}
            <img alt="" src={arrow} className="float-right" />
        </button>

        {
        showDropdownToggle && 
        <div className="absolute py-3.5 px-2 bg-grey-4 border border-grey-2 rounded-md top-16 w-60">
          {props.dropdownValues.map( (obj) => (
            <div key={obj.type}>
              <p className="text-white opacity-50 text-xs mb-2 tracking-widest font-medium ">
                {obj.type}
              </p>
              <div className="flex flex-col"> {obj.values.map((v) => 
                (<button key={v} onClick={() => valueClicked(v)} className="py-1 px-2 text-left text-white text-sm hover:bg-grey-5 rounded-md">
                    {v}
                  </button>
                ))}
                </div>
            </div>))}
        </div>
        }

    </div>
  );
}

DropdownBar.propTypes = {
    title: PropTypes.string,
    isVisible:PropTypes.bool,
    dropdownValues:PropTypes.arrayOf(PropTypes.object),
    valueSelected:PropTypes.string,
    setValueSelected:PropTypes.func,
};

DropdownBar.defaultProps={
    title:"",
    isVisible:true,
    dropdownValues:[{type:"",values:[]}],
    valueSelected:null,
    setValueSelected:(()=>console.log("Not called from parent component")),
};
export default DropdownBar;
