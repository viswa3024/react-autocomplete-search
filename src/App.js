import { AutoComplete } from "./AutoComplete";
import data from "./data.json";

function App() {
  return (
    <div className="App">
      <AutoComplete
      style={{
  
      }}
      iconColor="blue"
      data={data}
      placeholder="Search..."
    />
    </div>
  );
}

export default App;
