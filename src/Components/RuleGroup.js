import React, { useState } from 'react';
import { useContext} from 'react';
import PropTypes from 'prop-types'; 
import infoIcon from '../Icons/info.svg';
import deleteIcon from '../Icons/delete.svg';
import { nanoid } from 'nanoid';
import Rule from './Rule';
import queryStore from "../queryStore";
import { observer } from "mobx-react-lite";
import _ from "lodash";

function RuleGroup(props){


    const{RuleGroups}=useContext(queryStore);
    const[conjunctionToggle,setConjuction]=useState(props.group.conjunction);

    function conjuctionToggleHandler(grp_id,newConjunction){
        setConjuction(newConjunction);
        RuleGroups.forEach((group)=>{
            if(group.groupId===grp_id)
                group.ruleGroup.conjunction=newConjunction;
        });
    }


    const addRule = (grp_id) => {
        RuleGroups.forEach((group)=>{
            if(group.groupId===grp_id)
                group.ruleGroup.children.push({ id: nanoid(),field: null ,condition: null,value: null });
            });
        };

      const deleteRule = (grp_id,rule_id) => {
            let groupIndex;
            RuleGroups.forEach((group,index)=>{
                if(group.groupId===grp_id)
                    groupIndex=index;
            });
            if(groupIndex!==-1)
            {
                let newRules=_.remove(RuleGroups[groupIndex].ruleGroup.children,
                function(rule){
                    if(rule.id!==rule_id)
                        return true;
                    return false;});
              RuleGroups[groupIndex].ruleGroup.children=newRules;
            }
        };


    let setStyle="py-2 px-3 bg-blue cursor-pointer";
    let notSetStyle="py-2 px-3 bg-white2 border-grey-2 border cursor-pointer";
    return(
        <div className="bg-light_black p-4 m-5 rounded border-grey-2">
            <div className={`${props.group.children.length<=1 ?"hidden ":"text-sm text-white font-medium pb-8"}`}>
                <span className={`${conjunctionToggle === "AND" ? setStyle : notSetStyle}  rounded-l-md `} onClick={() => conjuctionToggleHandler(props.id,"AND")}>
                AND
                </span>
                <span className={`${conjunctionToggle === "OR" ? setStyle : notSetStyle} rounded-r-md`} onClick={() => conjuctionToggleHandler(props.id,"OR")}>
                OR
                </span>
                <img src={infoIcon} className="inline-block ml-2" alt="info" />
            </div>
            {
            props.group.children.map((rule,index) => 
                <Rule 
                key={rule.id} 
                id={rule.id} 
                isDeletable={index!==0 ? true:false} 
                deleteRule={()=>deleteRule(props.id,rule.id)}
                groupId={props.id}/>)
            }
        <button onClick={()=>addRule(props.id)} className=" py-2 px-5 text-white font-medium text-sm rounded-md bg-blue hover:bg-indigo-700 mt-4">+ Add filter</button>    
        </div>
    );
}

RuleGroup.prototype={
    id:PropTypes.string,
    group:PropTypes.object
};
export default observer(RuleGroup);