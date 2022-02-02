import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import DropdownBar from './DropdownBar';
import deleteIcon from '../Icons/delete.svg'
function Rule(props) {
    const[fieldValue,setFieldValue]=useState(null);
    const[conditionValue,setConditionValue]=useState(null);
    const[criteriaValue,setCriteriaValue]=useState(null);

    const fieldDropdownValues=
    [   {type: "PREDICTION",values:["Theme","Sub-theme","Reason","Language","Source","Rating","Time Period"]},
        {type: "COMMON", values: ["Customer ID"] }
    ];
    const conditionDropdownValues=
    [   {type:null,values:["Equals","Does not equal","Like","Not like","Is Empty","Is","Is not"]}
    ];
    const criteriaDropdownValues=
    [   {type:null,values:["Offers","Performance","Platform","Product Feedback"]}
    ];
    
    
    // useEffect(() => {
    //   props.updateRule();
    // },[fieldValue, conditionValue, criteriaValue]);
    return(
    <div className="flex flex-row mt-4 gap-x-4">
        <DropdownBar
                title="Field"
                isVisible='true'
                dropdownValues={fieldDropdownValues}
                valueSelected={fieldValue}
                setValueSelected={setFieldValue} />
        <DropdownBar
                title="Condition"
                isVisible='true'
                dropdownValues={conditionDropdownValues}
                valueSelected={conditionValue}
                setValueSelected={setConditionValue} />
        <DropdownBar
                title="Criteria"
                isVisible='true'
                dropdownValues={criteriaDropdownValues}
                valueSelected={criteriaValue}
                setValueSelected={setCriteriaValue} />
                {props.id!==0 && <div onClick={props.deleteRule} className="h-9 w-9 bg-grey-4 flex align-center justify-center rounded-md p-1 mt-6 hover:bg-black cursor-pointer">
                        <img alt="" src={deleteIcon} />
                        </div>}
    </div>);
}

Rule.propTypes = {
id:PropTypes.number,
deleteRule:PropTypes.func,
};

export default Rule;
