import { NavLink } from "react-router-dom";
import DashboardImg from "../Images/Dashboard.svg";
import BillingImg from "../Images/Billing.svg";

const Sidebar = ({ children }) => {
  return (
    <div className="h-[100vh] w-[100vw] flex">
      <div className="h-full w-72 bg-white">
        <h1 className="font-bold text-xl sm:text-2xl text-primary py-12 text-center">POS</h1>
        <hr className="bg-[#E1E5EF] w-[94%] m-auto mb-12" />

        <ul className="flex flex-col">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `flex flex-row font-inter font-bold text-xl items-center mb-7 ${isActive ? 'text-primary' : 'text-secondary'}`}
          >
            <img src={DashboardImg} className="ml-10 mr-4" alt="Dashboard"/>Dashboard
          </NavLink>
          <NavLink 
            to="/products" 
            className={({ isActive }) => `flex flex-row font-inter font-bold text-xl items-center mb-7 ${isActive ? 'text-primary' : 'text-secondary'}`}
          >
            <img src={BillingImg} className="ml-10 mr-4" alt="Products"/>Products
          </NavLink>
          <NavLink 
            to="/orders" 
            className={({ isActive }) => `flex flex-row font-inter font-bold text-xl items-center mb-7 ${isActive ? 'text-primary' : 'text-secondary'}`}
          >
            <img src={BillingImg} className="ml-10 mr-4" alt="Billing"/>Orders
          </NavLink>
          <NavLink 
            to="/receipts" 
            className={({ isActive }) => `flex flex-row font-inter font-bold text-xl items-center mb-7 ${isActive ? 'text-primary' : 'text-secondary'}`}
          >
            <img src={BillingImg} className="ml-10 mr-4" alt="Receipts"/>Receipts
          </NavLink>
        </ul>
      </div>
      <div className="flex-1 px-14 py-10 max-md:px-7 max-lg:px-10">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
