import "./Main_components/Nav/NavBar.css";
import "./Main_components/Side/SideBar.css";
import "./Main_components/Acti/Activity.css";
import "./Main_components/post/Post.css";
import "./Login_components/Login.css";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Login_components/Login";
import Real from "./Main_components/Real";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Real/>}></Route>
        <Route path="/" element={<Login/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;

