import React from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import NavBar from "./Components/Navigation/Navbar"
import DeliveriesDashboard from "./Components/Dashboards/DeliveriesDashboard";


export default function App(){
  return(
    <div>
        <NavBar/>
        <DeliveriesDashboard/>
    </div>  
  )
}

