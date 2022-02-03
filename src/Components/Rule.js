import React,{useEffect, useState,useContext} from 'react';
import { observer } from "mobx-react-lite";
import queryStore from "../queryStore";
import PropTypes from 'prop-types';
import DropdownBar from './DropdownBar';
import deleteIcon from '../Icons/delete.svg'
import Input from './Input';
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
    
    const themeValues=[{type:null,values:["Offers","Performance","Platform","Product Feedback"]}];
    const languageValues=[{type:null,values:["Arabic","Chinese","English","French","Hindi"]}];
    const ratingValues=[{type:null,values:["1","2","3","4","5"]}];
    const sourceValues=[{type:null,values:["LinkedIn","GlassDoor","Facebook","Google","Twitter"]}];
    const subThemeValues=[{type:null,values:["User Experience","Latency","Retention","Suggestions"]}];

    const getValues=(field)=>{
        switch(field)
        {
            case "Theme": return themeValues;
            case "Sub-theme": return subThemeValues; 
            case "Rating": return ratingValues;
            case "Source": return sourceValues;
            case "Language": return languageValues;
            case "Initial": return criteriaDropdownValues;           
            default:
                return null;
        }
    }

    useEffect(()=>
    {
        if(fieldValue)
            updateRule(props.groupId,props.id ,fieldValue,criteriaValue,conditionValue);
    },[fieldValue, conditionValue, criteriaValue, updateRule, props.groupId, props.id]);
    
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

        {(["Theme","Sub-theme","Rating","Source","Language","Initial"].includes(fieldValue)) && 
            <DropdownBar
                title="Criteria"
                isVisible={true}
                dropdownValues={getValues(fieldValue)}
                valueSelected={criteriaValue}
                setValueSelected={setCriteriaValue} />
        }
        {
            fieldValue==="Customer ID" &&
            <Input
            label="Criteria"
            placeholder="Enter the customerId"
            type="number"
            value={criteriaValue}
            changeValue={setCriteriaValue}/>
        }
        {
            fieldValue==="Reason" &&
            <Input
            label="Criteria"
            placeholder="Enter the reason"
            type="text"
            value={criteriaValue}
            changeValue={setCriteriaValue}/>
        }
        {
            fieldValue==="Time Period" &&
            <Input
            label="Criteria"
            placeholder="Enter the time-period"
            type="text"
            value={criteriaValue}
            changeValue={setCriteriaValue}/>
        }
        {props.isDeletable && <div onClick={props.deleteRule} className="h-9 w-9 bg-grey-4 flex align-center justify-center rounded-md p-1 mt-6 hover:bg-black cursor-pointer">
                        <img alt="" src={deleteIcon} />
                        </div>}
    </div>);
}

Rule.propTypes = {
id:PropTypes.string,
isDeletable:PropTypes.bool,
deleteRule:PropTypes.func,
groupId:PropTypes.string
};

export default observer(Rule);
