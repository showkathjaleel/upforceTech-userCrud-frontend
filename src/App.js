
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import { Routes, Route } from "react-router-dom"
import Register from './pages/Register/Register';
import Edit from './pages/Edit/Edit';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <>
     
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/add-user' element={<Register />} />
      <Route path='/edit-user/:id' element={<Edit />} />
      <Route path='/userprofile/:id' element={<Profile />} />
      
    </Routes>

    </>
  );
}

export default App;
