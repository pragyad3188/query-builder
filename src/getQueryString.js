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

export default function getString(ruleGroup) {
  let QueryString = "";
    ruleGroup.rules.forEach((rule, index) => {
      QueryString += ` "(field.${rule.field}) ${getCondtionSymbol(rule.condition)} 
                        \\"${rule.criteria}"\\" 
                        ${index !== ruleGroup.rules.length -1 ? getConjunctionSymbol(ruleGroup.conjunction): ""}`;});
  return QueryString;
}