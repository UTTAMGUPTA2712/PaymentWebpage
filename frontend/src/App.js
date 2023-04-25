import './App.css';
import Login from './component/login';
import Mainpage from './component/mainPage';
import {Routes,Route,BrowserRouter} from "react-router-dom"

function App() {
  return(
    <>
 <BrowserRouter>
    <Routes>
      <Route path='/' exact element={<Login />}/>
      <Route path='/mainpage' element={<Mainpage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App;




