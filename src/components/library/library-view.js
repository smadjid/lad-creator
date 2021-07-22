import React, { useState } from "react";
import Sidebar from "./sidebar";
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";
import Decisions from "./decisions";
import Frames from "./frames";
import Indicators from "./indicators";
import Visualizations from "./visualizations";


import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SettingsIcon from "@material-ui/icons/Settings";

import "./library-view.css"
import Panels from "./panels";





function LibraryView() {
  function onLeave(){
    window.location.href = "/";
    

  }
  function onClick(e, item) {
    if(item.name === 'home') 
    return onLeave();
    setDdisplayItem(item.name);    
  //  window.alert(JSON.stringify(item, null, 2));
  } 
  
  const items = [
    { name: "home", label: "Home", onClick, Icon: HomeIcon },
    
    "divider",
    {
      name: "indicators",
      label: "Indicators",
      onClick,
      Icon: SettingsIcon,
  /*    items: [
        { name: "indicator_class", label: "Classes" },
        { name: "indicator_type", label: "Types", onClick }
      ]*/
    },
    "divider",
    {
      name: "visualizations",
      label: "Visualizations",
      onClick,
      Icon: SettingsIcon,
      /*items: [
        { name: "visualization_class", label: "Classes" },
        { name: "visualization_type", label: "Types", onClick }
      ]*/
    },
    "divider",
    {
      name: "panels",
      label: "Panels",
      Icon: SettingsIcon,
      items: [
        { name: "panels", label: "Simple Panels", onClick}, 
        { name: "rows", label: "Complex panels", onClick }
      ]
    },
    "divider",
    {
      name: "frames",
      label: "Frames",
      Icon: SettingsIcon,
      onClick,
    /*  items: [
        { name: "frame_class", label: "Classes" },
        { name: "frame_types", label: "Types", onClick }
      ]*/
    },
    "divider",
    {
      name: "decisions",
      label: "Decisions",
      Icon: ReceiptIcon,
      onClick,
    /*  items: [
        { name: "decision_class", label: "Classes", onClick },
        { name: "decision_type", label: "Types", onClick }
      ]*/
    }
  ];

  const [displayItem, setDdisplayItem]=useState();

  return (
    <div className="row container-fluid">     
      <div className="col-md-2"> <Sidebar items={items} /> </div>
      <div className="col-md-10 library-items">
      {displayItem === 'decisions' &&
        <Decisions /> 
      }
      {displayItem === 'frames' &&
        <Frames /> 
      }
      {displayItem === 'panels' &&
        <Panels /> 
      }
      {displayItem === 'indicators' &&
        <Indicators /> 
      }
      {displayItem === 'visualizations' &&
        <Visualizations  /> 
      }
      </div>
    </div>
  );
}

export default LibraryView;

