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
    clearAllQueries=()=>
    {
      this.RuleGroups.rules=[{id:nanoid(),field: null ,condition: null,value: null}];
      this.conjunction="AND";
    }
  getQueryString = () => getString(this.RuleGroups);
}

export default createContext(new queryStore());