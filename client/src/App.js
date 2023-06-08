import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './components/signin';
import Register from './components/register';
import Admin_dash from './components/admin_dash';
import StaffDash from './components/staff_dash';
import Update from './components/update';

function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Signin/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/superadmin_dash' element={<Admin_dash/>}/>
    <Route path='/admin_dash' element={<StaffDash/>}/>
    <Route path='/update/:id' element={<Update/>}/>
  </Routes>
  </BrowserRouter>
  </>
  )}
export default App;
