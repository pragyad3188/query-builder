import background from "./Images/background.png";
import React  from 'react';
import Query_Builder from "./Components/Query_Builder";
function App() {
  return (
    <div className="h-screen bg-cover bg-top flex justify-center bg-Main-Background items-end overflow-y-auto">
       <Query_Builder /> 
    </div>
  );
}

export default App;
