import { BrowserRouter, Routes, Route} from "react-router-dom"
import Items from "./pages/Items";
import Update from "./pages/Update";
import Add from "./pages/Add";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Items/>}/>
              <Route path="/add" element={<Add/>}/>
              <Route path="/update" element={<Update/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
