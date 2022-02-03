const getConjunctionSymbol=(conjunction)=>
{
    switch(conjunction)
    {
        case "AND":
            return "&&";
        case "OR":
            return "||"
        default: return "";
    }
}
const getCondtionSymbol = (condition) => {
  switch (condition) {
    case "Equals":
      return "==";
    case "Does not equal":
      return "!=";
    case "Like":
      return "LIKE";
    case "Not like":
      return "!LIKE";
    case "Is Empty":
      return "IS_NULL";
    case "Is":
      return "===";
    case "Is not":
      return "!==";
    default:
      return "";
  }
};

export default function getString(RuleGroups,GlobalConjunction) {
  let queryString = "(";
  RuleGroups.forEach((group,index1)=>{
      group.ruleGroup.children.forEach((rule,index)=>{
        queryString=queryString + `"(field.${rule.field}) ${getCondtionSymbol(rule.condition)} \\"${rule.criteria}"\\" 
                                    ${index !== group.ruleGroup.children.length -1 ? getConjunctionSymbol(group.ruleGroup.conjunction): ""}`;});
        if(index1 !== RuleGroups.length-1)
            queryString+=`)  ${getConjunctionSymbol(GlobalConjunction)}  (`;
        else
            queryString+=')';
    });
  return queryString;
}