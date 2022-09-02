import React, {useState,useCallback, lazy} from 'react';
import './index.css';
import { Route, Switch } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';
const Footer = lazy(() => import('./Footer'));
const Login = lazy(() => import('./Login'));
const Navbar = lazy(() => import('./Navbar'));
const Alerts = lazy(() => import('./Alerts'));
const Home = lazy(() => import('./Home'));
const Registration = lazy(() => import('./Registration'));
const BList = lazy(() => import('./admin/BList'));
const Search = lazy(() => import('./admin/Search'));
const Pricelist = lazy(() => import('./admin/Pricelist'));
const CustomerInfo = lazy(() => import('./admin/CustomerInfo'));
const RefillOrders = lazy(() => import('./admin/RefillOrders'));
const NCorders = lazy(() => import('./admin/NCorders'));
const Inventory = lazy(() => import('./admin/Inventory'));
const Finance = lazy(() => import('./admin/Finance'));
const Booking = lazy(() => import('./employee/Booking'));
const EditBooking = lazy(() => import('./employee/EditBooking'));
const NCBooking = lazy(() => import('./employee/NCBooking'));
const NCEditBooking = lazy(() => import('./employee/NCEditBooking'));
const BookingList = lazy(() => import('./employee/BookingList'));

function App() {
  const [alerts, setAlerts] = useState(null);
  const showAlert = useCallback((msg, type) => {
    setAlerts({
        msg: msg,
        type:type,
    })
    setTimeout(() => {
      setAlerts(null);
    }, 2000);
  },[]);
  return (
    <>
     <Switch>
     <AuthProvider>
     {/* admin */}
        <PrivateRoute exact path ='/homepage' component={()=>(<div style={{paddingTop: "5rem"}}><Navbar/><Home/><Footer/></div> )} />
        <PrivateRoute exact path ='/Registration' component={()=>(<div style={{paddingTop: "5rem"}}><Navbar/><Registration showAlert={showAlert}/><Footer/></div> )} />
        <PrivateRoute exact path ='/BList' component={()=>(<div style={{paddingTop: "5rem"}}><Navbar/><BList/><Footer/></div> )} />
        <PrivateRoute exact path ='/Search' component={()=>(<div style={{paddingTop: "5rem"}}><Navbar/><Search showAlert={showAlert}/><Footer/></div> )} />
        <PrivateRoute exact path ='/Pricelist' component={()=>(<div style={{paddingTop: "5rem"}}><Navbar/><Pricelist showAlert={showAlert}/><Footer/></div> )} />
        <PrivateRoute exact path ='/CustomerInfo/:key' component={()=>(<div style={{paddingTop: "5rem"}}><Navbar/><CustomerInfo/><Footer/></div> )} />
        <PrivateRoute exact path ='/RefillOrders/:phone' component={()=>(<div style={{paddingTop: "5rem"}}><Navbar/><RefillOrders/><Footer/></div> )} />
        <PrivateRoute exact path ='/NCorders/:phone' component={()=>(<div style={{paddingTop: "5rem"}}><Navbar/><NCorders/><Footer/></div> )} />
        <PrivateRoute exact path ='/Inventory' component={()=>(<div style={{paddingTop: "5rem"}}><Navbar/><Inventory/><Footer/></div> )} />
        <PrivateRoute exact path ='/Finance' component={()=>(<div style={{paddingTop: "5rem"}}><Navbar/><Finance/><Footer/></div> )} />
        {/* employee */}
        <PrivateRoute exact path ='/BookingList' component={()=>(<div style={{paddingTop: "5rem"}}><Navbar/><BookingList/><Footer/></div> )} />
        <PrivateRoute exact path ='/Booking/:phone/:kg/:price/:name/:order_type' component={()=>(<div style={{paddingTop: "5rem"}}><Navbar/><Booking/><Footer/></div> )} />
        <PrivateRoute exact path ='/EditBooking/:phone/:kg/:price/:name/:key/:quantity/:empty/:amountr/:order_type' component={()=>(<div style={{paddingTop: "5rem"}}><Navbar/><EditBooking/><Footer/></div> )} />
        <PrivateRoute exact path ='/NCBooking/:phone/:kg/:price/:name/:order_type' component={()=>(<div style={{paddingTop: "5rem"}}><Navbar/><NCBooking/><Footer/></div> )} />
        <PrivateRoute exact path ='/NCEditBooking/:phone/:kg/:price/:name/:key/:quantity/:amountr/:order_type' component={()=>(<div style={{paddingTop: "5rem"}}><Navbar/><NCEditBooking/><Footer/></div> )} />
        {/* normal route */}
        <Route exact path ='/' component={()=>(<div style={{paddingTop: "5rem",height:"100vh"}}><Login/><Footer/></div> )}/>
     </AuthProvider>
     </Switch>
     <div className="alert-container">
       <Alerts alert={alerts} />
     </div>
    </>
  );
}

export default App;