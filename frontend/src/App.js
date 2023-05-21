import { BrowserRouter, Routes, Route} from "react-router-dom"
import Items from "./pages/Items";
import Update from "./pages/Update";
import Add from "./pages/Add";
import { ParseExcel } from "./pages/ParseExcel";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Items/>}/>
              <Route path="/add" element={<Add/>}/>
              <Route path="/update" element={<Update/>}/>
              <Route path="/parse-excel" element={<ParseExcel/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
