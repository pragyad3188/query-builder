import React from 'react';
import {useContext,useState} from 'react';
import closeIcon from '../Icons/Icon.svg';
import RuleGroup from './RuleGroup';
import queryStore from "../queryStore";
import { observer } from "mobx-react-lite";


function Query_Builder(props){
    const {RuleGroups,getQueryString,clearAllQueries,addGroup,setGlobalConjunction,submitQuery} = useContext(queryStore);
    const [conjunctionToggle,setConjunctionToggle]=useState("AND");
    const query=getQueryString();

    function toggleConjunction(conjunction)
    {
        setGlobalConjunction(conjunction);
        setConjunctionToggle(conjunction);
    }

    let setStyle="py-2 px-3 bg-blue cursor-pointer";
    let notSetStyle="py-2 px-3 bg-grey-2 border-grey-2 border cursor-pointer";
    return (
        <div className="h-4/5 w-2/3  bg-black rounded shadow-lg flex flex-col">
            <div className="bg-blue px-8 py-8 flex flex-col">
                <div className="flex ">
                    <div className="font-medium text-lg leading-7 text-white grow">
                        {(RuleGroups[0].ruleGroup.children[0].field || RuleGroups[0].ruleGroup.children.length > 1)? "Build your query":"Create tag and query"}
                    </div>
                    <div className="bg-indigo-700 justify-center rounded ">
                        <img src={closeIcon} className="inline-block m-1 " alt="close" />
                    </div>
                </div>
                {(RuleGroups[0].ruleGroup.children[0].field || RuleGroups[0].ruleGroup.children.length > 1)?
                    <p className="overflow-x-auto text-white text-sm my-1 mx-0.5 bg-indigo-700 p-2 rounded font-medium">
                        <span className="font-bold">Query: </span>
                        {query}
                    </p>:(
                    <p className="text-indigo-300 font-normal text-sm font-sm m-0.5">
                        The query you build will be saved in your active view
                    </p>)
                }   
            </div>
            <div className="flex flex-col justify-end flex-grow h-full overflow-auto px-6 py-2 ">
                <div className="h-full overflow-auto">    
            <div className={`${RuleGroups.length<=1 ?"hidden ":"mt-4 ml-1 text-sm text-white font-medium pb-8"}`}>
                <span className={`${conjunctionToggle === "AND" ? setStyle : notSetStyle}  rounded-l-md `} onClick={() => toggleConjunction("AND")}>
                AND
                </span>
                <span className={`${conjunctionToggle === "OR" ? setStyle : notSetStyle} rounded-r-md`} onClick={() => toggleConjunction("OR")}>
                OR
                </span>    
            </div>

            {
            RuleGroups.map((grp)=>
                <RuleGroup 
                key={grp.groupId} 
                id={grp.groupId} 
                group={grp.ruleGroup}/>)
                }
            <div className='ml-4 mt-1 mb-4'>
                <button onClick={addGroup} className="py-2 px-5 text-white font-medium text-sm rounded-md bg-blue hover:bg-indigo-700 inline-block">+ Add new group filter</button>
            </div>
            </div>
            <div className="m-2 ">
                <button onClick={()=>clearAllQueries()}className={`bg-grey-1 py-2 px-5 text-white rounded-md font-medium text-base hover:bg-grey-2 opacity-70`}>Back</button>
                <button onClick={()=>submitQuery()}className={`float-right bg-blue hover:bg-indigo-700 py-2 px-5 text-white rounded-md font-medium text-base`}>Finish</button>
            </div>
        </div>
    </div>
    );
}


export default observer(Query_Builder);