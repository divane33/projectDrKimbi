//import logo from './logo.svg';
//import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AjouterCat from './pages/AjouterCat';
import GererCat from './pages/GererCat';
import Notifications from './pages/Notifications';
import Management from './pages/Management';

function App() {
  return (
      <div>

         <BrowserRouter>
            <Routes>
              <Route index element={<Home />}/>
              <Route path='/home' element={<Home />}/>
              <Route path='/signup' element={<Signup />}/>
              <Route path='/signin' element={<Signin />}/>
              <Route path='/dashboard' element={<Dashboard />}/>
              <Route path='/ajouter' element={<AjouterCat />}/>
              <Route path='/gerer' element={<GererCat />}/>
              <Route path='/notifications' element={<Notifications />}/>
              <Route path='/management' element={<Management />}/>
            </Routes>
         </BrowserRouter>

      </div>
    // <div className="App">
    //   <Home />
    //     {/* <img src={logo} className="App-logo" alt="logo" /> */}
    // </div>
  );
}

export default App;
