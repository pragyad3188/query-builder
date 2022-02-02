import React,{useEffect, useState,useContext} from 'react';
import { observer } from "mobx-react-lite";
import queryStore from "../queryStore";
import {nanoid} from "nanoid";
import PropTypes from 'prop-types';
import DropdownBar from './DropdownBar';
import deleteIcon from '../Icons/delete.svg'
function Rule(props) {
    const[fieldValue,setFieldValue]=useState(null);
    const[conditionValue,setConditionValue]=useState(null);
    const[criteriaValue,setCriteriaValue]=useState(null);
    const{updateRule}=useContext(queryStore);
    

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
    
    useEffect(()=>
    {
        updateRule(props.rule.id ,fieldValue,criteriaValue,conditionValue);
    },[fieldValue,conditionValue,criteriaValue]);
    useEffect(() => {
        setCriteriaValue("");
        setConditionValue("");
    },[fieldValue]);

    return(
    <div className="flex flex-row mt-4 gap-x-4">
        <DropdownBar
                title="Field"
                isVisible={true}
                dropdownValues={fieldDropdownValues}
                valueSelected={fieldValue}
                setValueSelected={setFieldValue} />
        <DropdownBar
                title="Condition"
                isVisible={true}
                dropdownValues={conditionDropdownValues}
                valueSelected={conditionValue}
                setValueSelected={setConditionValue} />
        <DropdownBar
                title="Criteria"
                isVisible={true}
                dropdownValues={criteriaDropdownValues}
                valueSelected={criteriaValue}
                setValueSelected={setCriteriaValue} />
                {props.isDeletable && <div onClick={props.deleteRule} className="h-9 w-9 bg-grey-4 flex align-center justify-center rounded-md p-1 mt-6 hover:bg-black cursor-pointer">
                        <img alt="" src={deleteIcon} />
                        </div>}
    </div>);
}

Rule.propTypes = {
rule:PropTypes.object,
isDeletable:PropTypes.bool,
deleteRule:PropTypes.func,
groupId:PropTypes.string
};

export default observer(Rule);
