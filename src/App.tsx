import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { Drawer, type DrawerItem } from "./components/drawer/Drawer";
import { FaBoxOpen, FaDollarSign, FaHome, FaTags, FaUsers, FaUserTie } from "react-icons/fa";
import { Customers } from "./pages/customers/Customers";
import { Landing } from "./pages/landing/Landing";
import { Products } from "./pages/products/Products";
import { SalesPersons } from "./pages/salespersons/SalesPersons";
import { Sales } from './pages/sales/Sales';
import { Commissions } from './pages/commissions/Commissions';


const drawerItems: DrawerItem[] = [
  { label: "Home", path: "/", icon: <FaHome /> },
  { label: "Customers", path: "/customers", icon: <FaUsers /> },
  { label: "Products", path: "/products", icon: <FaBoxOpen /> },
  { label: "Sales", path: "/sales", icon: <FaDollarSign /> },
  { label: "Salespersons", path: "/salespersons", icon: <FaUserTie /> },
  { label: "Commissions", path: "/commissions", icon: <FaTags /> },
];

const App = () => {
  return (
    <div className="app-container">
      <Drawer items={drawerItems} title='Bespoken'/>
      <main className="main-content">
         <Routes>
          <Route path="/" element={<Landing />} /> {/* Default route */}
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/salespersons" element={<SalesPersons />} />
          <Route path="/commissions" element={ <Commissions />} />
          
          {/* Optional: Add a 404 page */}
          {/* Optional: Redirect unknown routes to default */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
