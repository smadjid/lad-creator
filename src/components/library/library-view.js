import React, { useState } from "react";
import Sidebar from "./sidebar";
import Decisions from "./decisions";
import Frames from "./frames";
import Indicators from "./indicators";
import Visualizations from "./visualizations";

import { ExitToApp } from "@material-ui/icons";
import ReceiptIcon from "@material-ui/icons/Receipt";
import SettingsIcon from "@material-ui/icons/Settings";

import "./library-view.css"
import Panels from "./panels";
import CPanels from "./cpanels";
import Scenario from "./scenario";

function LibraryView() {
  function onLeave(){
    window.location.href = "/";
    

  }
  function onClick(e, item) {
    if(item.name === 'exit') 
    return onLeave();
    setDdisplayItem(item.name);    
  //  window.alert(JSON.stringify(item, null, 2));
  } 
  
  const items = [
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
        { name: "cpanels", label: "Composite panels", onClick }
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
   /*  "divider",
    {
      name: "decisions",
      label: "Use cases",
      Icon: ReceiptIcon,
      onClick,
      items: [
        { name: "scenario", label: "Create scenario", onClick },
        { name: "o_scenario", label: "Open...", onClick }
      ]
    }, */
    "divider",
    { name: "exit", label: "Exit Library", onClick, Icon: ExitToApp },
        
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
      {displayItem === 'cpanels' &&
        <CPanels /> 
      }
      {displayItem === 'indicators' &&
        <Indicators /> 
      }
      {displayItem === 'visualizations' &&
        <Visualizations  /> 
      }
      {displayItem === 'scenario' &&
        <Scenario />
      }
      </div>
    </div>
  );
}

export default LibraryView;

