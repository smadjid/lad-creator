import React, { useContext, useState } from "react";
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
import { CMainContext } from "../main-dash";
import logo from "../../logo.png";

const LibraryView=(props)=> {
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
      label: "Simple Panels",
      Icon: SettingsIcon,
      onClick,
    },
    "divider",
    {
      name: "cpanels",
      label: "Composite Panels",
      Icon: SettingsIcon,
      onClick,
    },    
    "divider",
    {
      name: "frames",
      label: "Screens",
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

  const [displayItem, setDdisplayItem]=useState('welcome');
  const [workspace, setWorkspace] = useContext(CMainContext);
  
  return (
    <div className="row container-fluid">     
      <div className="col-md-2"> <Sidebar items={items} /> </div>
      <div className="col-md-10 library-items">
      {displayItem === 'decisions' &&
        <Decisions /> 
      }
      {displayItem === 'welcome' &&
        <>
        <h3>LADStudio Library</h3>
        <hr/>
        <p className="h5">This library allows you to explore the dashboard elements you defined directly from within it, or through crafting dashboards.</p>
        <div className="row justify-content-center">
        <div className="col-6"><img src={logo} width="100%" className="p-3" alt="logo" /></div>
        
        </div>
        
        
        </> 
      }
      {displayItem === 'frames' &&
        <Frames workspace={workspace} /> 
      }
      {displayItem === 'panels' &&
        <Panels workspace={workspace}/> 
      }
      {displayItem === 'cpanels' &&
        <CPanels workspace={workspace}/> 
      }
      {displayItem === 'indicators' &&
        <Indicators workspace={workspace}/> 
      }
      {displayItem === 'visualizations' &&
        <Visualizations  workspace={workspace}/> 
      }
      {displayItem === 'scenario' &&
        <Scenario workspace={workspace}/>
      }
      </div>
    </div>
  );
}

export default LibraryView;

