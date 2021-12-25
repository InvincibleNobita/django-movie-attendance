import './App.css';

import {Home} from './Home';
import {Movies} from './Movies';
import {Attendance} from './Attendance';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
       Interntask
     </h3>

     <Navigation/>

     <Routes>
     <Route path="/" element={Home} exact/>
       <Route path="movies" element={<Movies />}/>
       <Route path="attendance" element={<Attendance />}/>
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;