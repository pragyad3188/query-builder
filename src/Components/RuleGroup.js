import React, { useState } from 'react';
import infoIcon from '../Icons/info.svg';
import { nanoid } from 'nanoid';
import Rule from './Rule';
import deleteIcon from '../Icons/delete.svg'
function RuleGroup(props){
    const[conjunction,setConjuction]=useState("AND");
    const[rules,setRules]=useState([0]);

    const addRule = () => {
        setRules((rules) => [...rules, rules.length]);
      };
      const deleteRule = (index) => {
        setRules((rules) => rules.filter((i) => i !== index));
      };
    let setStyle="py-2 px-3 bg-blue cursor-pointer";
    let notSetStyle="py-2 px-3 bg-white2 border-grey-2 border cursor-pointer";
    return(
        <div className="bg-light_black p-4 m-5 rounded border-grey-2">
            <div className="text-sm text-white font-medium pb-8">
                <span className={`${conjunction === "AND" ? setStyle : notSetStyle}  rounded-l-md `} onClick={() => setConjuction("AND")}>
                AND
                </span>
                <span className={`${conjunction === "OR" ? setStyle : notSetStyle} rounded-r-md`} onClick={() => setConjuction("OR")}>
                OR
                </span>
                <img src={infoIcon} className="inline-block ml-2" alt="info" />    
            </div>
            {rules.map((rule,index) => <Rule key={rule} id={index} deleteRule={()=>deleteRule(rule)}/>)}
        <button onClick={addRule} className=" py-2 px-5 text-white font-medium text-sm rounded-md bg-blue hover:bg-indigo-700 mt-4">+ Add filter</button>    
        </div>
    );
}

export default RuleGroup;