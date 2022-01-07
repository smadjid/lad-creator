import "../interface/interface.css";
import React, { useEffect, useState, useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DashContainer from "../interface/dash-container";
import axios from "axios";

import SideBarItem from "../interface/SideBarItem";
import { AppBar, Tabs, Tab, makeStyles } from "@material-ui/core";
import { PostAdd } from "@material-ui/icons";
import PageContainer from "../interface/page-container";
import { SIDEBAR_ITEM } from "../interface/constants";
import { Modal } from "react-bootstrap";
import { GlobalInterfaceContext } from "../specification-wizard";


const InterfaceComponent = (props) => {
  const { REACT_APP_BASE_API } = process.env;
  const [showModal, setShowModal] = useState(false);
  const [currentFrame, setCurrentFrame] = useState();
  const [sidebarFrames, setSidebarFrames] = useState([]);
  const [globalLayout, setGlobalLayout] = useContext(GlobalInterfaceContext);

  const handleShowFrameDetails = (element)=>{
    console.log(element);
  }

  const [items, setItems] = useState(
    Object.values(sidebarFrames).map((sideBarItem, index) => (
      <SideBarItem key={sideBarItem.id} data={sideBarItem} showFrame={'handleShowFrameDetails'}/>
    ))
  );

  
  
  const generateSidebarItems = (data) => {
    let sideItems = [];
    data.map((f) => {
      let newFrame = {
        id: f.id,
        type: SIDEBAR_ITEM,
        content: f.title,
        framebox: {
          type: SIDEBAR_ITEM,
          content: f.title,
        },
      };
      sideItems.push(newFrame);
    });
    if (sideItems) setSidebarFrames(sideItems);
    setItems(
      Object.values(sideItems).map((sideBarItem, index) => (
        <SideBarItem key={sideBarItem.id} data={sideBarItem} showFrame={handleShowFrameDetails}/>
      ))
    );
  };

  const [screens, setScreens] = useState([
    { id: 0, title: "Scr 1", type: "Type 1", tab: 1, rows: [] },
  ]);

  const [frames, setFrames] = useState([]);
  const getFrames = () => {
    axios.get(REACT_APP_BASE_API+"frames").then((res) => {
      setFrames(res.data);
      generateSidebarItems(res.data);
    });
  };

  useEffect(() => {
    getFrames();
  }, []);
  const rowStyle = { overflow: "hidden", clear: "both" };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const [currentTab, setCurrentTab] = React.useState(0);
  const classes = useStyles();
  const handleAddTab = () => {
    let scr = screens;
    let t = {
      id: scr.length,
      title: "Scr " + (scr.length + 1),
      type: "Type 4",
      tab: scr.length + 1,
      rows: [],
    };
    scr.push(t);
    setScreens(scr);
    let newLayout={id: t.id, layout:[]};
    let gLayout = globalLayout;
    gLayout.push({id: t.id, layout:[]});
    setGlobalLayout(gLayout);
      console.log(globalLayout)
    return t.id;
  };
  const handleTabChange = (event, newTabId) => {
    if (newTabId === "tabProperties") {
      setCurrentTab(handleAddTab());      
      
    } else {
      setCurrentTab(newTabId);
    }
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <h3>Interface composer</h3>
      <DndProvider backend={HTML5Backend}>
        <div className="interface">
          <div className="sideBar">
            <h6 class="text-secondary">Frame support</h6>
            <i class="text-dark">Drag and drop frames into the grid</i>
            <hr />
            {items}
          </div>
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                aria-label="simple tabs example"
              >
                {globalLayout.map((e) => {
                  return <Tab label={"Scr "+(e.id+1)} {...a11yProps(e.id)} />;
                })}
                <Tab icon={<PostAdd />} value="tabProperties" />
              </Tabs>
            </AppBar>
            
            {globalLayout.map((e) => {
              return (
                <PageContainer value={currentTab} index={e.id}>
                  <DashContainer index={e.id} initialLayout={e.layout}/>{" "}
                </PageContainer>
              );
            })}
            
          </div>
        </div>
        {currentFrame?
        <Modal show={showModal}>
          <Modal.Header>{currentFrame.title}</Modal.Header>
          <Modal.Body>asdfasdf</Modal.Body>
          <Modal.Footer>This is the footer</Modal.Footer>
        </Modal>: ' '}
      </DndProvider>
    </>
  );
};

export default InterfaceComponent;
