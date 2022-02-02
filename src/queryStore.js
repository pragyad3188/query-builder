import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import {nanoid} from "nanoid";
import _ from "lodash";
import getString from "./getQueryString.js";


class queryStore {
  constructor() {
    makeAutoObservable(this);
  }

  RuleGroups = {
      id: nanoid(),
      rules:[{id:nanoid(),field: null ,condition: null,value: null}],
      conjunction:"AND"
    };

      addRule = () => {
        // setRules((rules) => [...rules, nanoid()]);
        this.RuleGroups.rules.push({ id: nanoid(),field: null ,condition: null,value: null });

      };    
      toggleRuleGroupConjunction = (id,conjunction) => {
        this.RuleGroups.conjunction = conjunction;
      };

      deleteRule = (rule_id) => {
        let newRules=_.remove(this.RuleGroups.rules,function(rule){
          console.log(rule.id + " and "+ rule_id);
          if(rule.id!==rule_id)
            return true;
        });
        this.RuleGroups.rules=newRules;
    };

    updateRule=(rule_id,field,criteria,condition)=>
    {
     this.RuleGroups.rules.forEach(
      (rule,index)=>
        {
          if(rule.id===rule_id)
          {
            rule.field=field;rule.criteria=criteria;rule.condition=condition;
          }
        }
     );
    };
  // updateRule = (rule_id, rule) => {
  //   const group = _.find(this.RuleGroups, { id: group_id });
  //   const index = _.findIndex(this.RuleGroups, { id: group_id });

  //   if (group) {
  //     const rule_index = _.findIndex(group.group.children, { id: rule_id });
  //     group.group.children[rule_index] = rule;
  //     this.RuleGroups[index] = group;
  //   }
  // };

  getQueryString = () => getString(this.RuleGroups);
}

export default createContext(new queryStore());