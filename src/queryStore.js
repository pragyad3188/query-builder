import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import {nanoid} from "nanoid";
import _ from "lodash";
import getString from "./getQueryString.js";

class queryStore {
  constructor() {
    makeAutoObservable(this);
  }

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
  getQueryString = () => getString(this.RuleGroups);
}

export default createContext(new queryStore());