import './App.css';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from './Components/Products';
import Billing from './Components/Billing';
import Receipts from './Components/Receipts';
import Sidebar from './Components/Sidebar';
import Orders from './Components/Orders';
import OrderDetails from './Components/OrderDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route 
          path='*' 
          element={
            <Sidebar>
              <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/products' element={<Products />} />
                <Route path='/billing' element={<Billing />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/orderDetails' element={<OrderDetails />} />
                <Route path='/receipts' element={<Receipts />} />
              </Routes>
            </Sidebar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
