import React, { useState } from 'react';
import { useContext} from 'react';
import PropTypes from 'prop-types'; 
import infoIcon from '../Icons/info.svg';
import { nanoid } from 'nanoid';
import Rule from './Rule';
import queryStore from "../queryStore";
import { observer } from "mobx-react-lite";
import _ from "lodash";

function RuleGroup(props){
    // const[rules,setRules]=useState([nanoid()]);
    const{addRule,deleteRule,toggleRuleGroupConjunction}=useContext(queryStore); 
    const {rules}=props.ruleGroup;
    const[conjunctionToggle,setConjuction]=useState(props.ruleGroup.conjunction);
    // const addRule = (group_id) => {
        // setRules((rules) => [...rules, nanoid()]);
    //     RuleGroups.rules.push({ id: nanoid(),field: "",condition: "",value: "" });
    //   };    
    function conjuctionToggleHandler(newConjunction){
        setConjuction(newConjunction);
        toggleRuleGroupConjunction(props.id,newConjunction)
    }
    //     RuleGroups.conjuction = conjuction;
    //   };
    //   const deleteRule = (group_id,rule_id) => {
         // setRules((rules) => rules.filter((i) => i !== rule_id));
    //     RuleGroups.rules=_.remove(RuleGroups.rules, { id: rule_id });
    // };
    let setStyle="py-2 px-3 bg-blue cursor-pointer";
    let notSetStyle="py-2 px-3 bg-white2 border-grey-2 border cursor-pointer";
    return(
        <div className="bg-light_black p-4 m-5 rounded border-grey-2">
            <div className="text-sm text-white font-medium pb-8">
                <span className={`${conjunctionToggle === "AND" ? setStyle : notSetStyle}  rounded-l-md `} onClick={() => conjuctionToggleHandler("AND")}>
                AND
                </span>
                <span className={`${conjunctionToggle === "OR" ? setStyle : notSetStyle} rounded-r-md`} onClick={() => conjuctionToggleHandler("OR")}>
                OR
                </span>
                <img src={infoIcon} className="inline-block ml-2" alt="info" />    
            </div>
            {
            rules.map((rule,index) => 
                <Rule 
                key={rule.id} 
                rule={rule} 
                isDeletable={index!==0 ? true:false} 
                deleteRule={()=>deleteRule(rule.id)}
                groupId={props.id}/>)
            }


        <button onClick={()=>addRule()} className=" py-2 px-5 text-white font-medium text-sm rounded-md bg-blue hover:bg-indigo-700 mt-4">+ Add filter</button>    
        </div>
    );
}

RuleGroup.prototype={
    id:PropTypes.string,
    ruleGroup:PropTypes.object
};
export default observer(RuleGroup);