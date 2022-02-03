import { makeAutoObservable,toJS } from "mobx";
import { createContext } from "react";
import {nanoid} from "nanoid";
import getString from "./getQueryString.js";
import _ from "lodash";
class queryStore {
  constructor() {
    makeAutoObservable(this);
  }
  GlobalConjunction="AND";
  RuleGroups = [{
      groupId: nanoid(),
      ruleGroup:
      {
        children:[{id:nanoid(),field: null ,condition: null,value: null}],
        conjunction:"AND",
        not:false,
        type:"rule_group"
      },
    }];
    
    setGlobalConjunction=(conjunction)=>{this.GlobalConjunction=conjunction;};
    updateRule=(group_id,rule_id,field,criteria,condition)=>
    {
      let groupIndex=-1;
      this.RuleGroups.forEach(
        (ruleGroup,index)=>{
          if(ruleGroup.groupId===group_id)
          groupIndex=index;
        });
      if(groupIndex!==-1)
      {
        this.RuleGroups[groupIndex].ruleGroup.children.forEach(
          (rule)=>
            {
              if(rule.id===rule_id)
              {
                rule.field=field;rule.criteria=criteria;rule.condition=condition;
              }
            }
         );
      }
    };
    isGroupDeletable=(group_id)=>{if(this.RuleGroups[0].groupId===group_id)
      return false;
      return true;
    }
    addGroup=()=>{
      this.RuleGroups.push({
        groupId: nanoid(),
        ruleGroup:
        {
          children:[{id:nanoid(),field: null ,condition: null,value: null}],
          conjunction:"AND",
          not:false,
          type:"rule_group"
        },
      });
    };
    deleteGroup=(group_id)=>
    {
      let newGroups=_.remove(this.RuleGroups,
        function(group){
            if(group.groupId!==group_id)
                return true;
            return false;});
      this.RuleGroups=newGroups;
    }
    clearAllQueries=()=>
    {
      this.RuleGroups = [{
        groupId: nanoid(),
        ruleGroup:
        {
          children:[{id:nanoid(),field: null ,condition: null,value: null}],
          conjunction:"AND",
          not:false,
          type:"rule_group"
        },
      }];
    }
  getQueryString = () => getString(this.RuleGroups,this.GlobalConjunction);

  submitQuery=()=>{
    const outputString=this.getQueryString()
    const queryObject=toJS(this.RuleGroups);
    console.log("The query string is: "+outputString);
    console.log(queryObject);
  }
}

export default createContext(new queryStore());