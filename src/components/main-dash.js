import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { Alert } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import LibraryView from "./library/library-view";
import "./main-dash.css";
import ModificationWizard from "./specification/modification-wizard";

import SpecificationWizard from "./specification/specification-wizard";

export const CMainContext = React.createContext();

const MainDash = (props) => {
  const [WSs, setWSs] = useState([]);

  const getWSs = () => {
    axios.get("http://localhost:3001/wss").then((res) => {
      setWSs(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    getWSs();
  }, []);

  const craftLADComponent = () => {
    return (
      <SpecificationWizard
        workspace={workspace}
        onCloseWizard={() => {
          setActiveStep(steps[0]);
        }}
      />
    );
  };

  const editLADComponent = () => {
    return (
      <ModificationWizard
        onCloseWizard={() => {
          setActiveStep(steps[0]);
        }}
      />
    );
  };

  const libraryComponent = () => {
    return (
      <LibraryView
        workspace={workspace}
        onCloseWizard={() => {
          setActiveStep(steps[0]);
        }}
      />
    );
  };
  const [mainCardDisabled, setMainCardDisabled] = useState(false);
  const mainCard = () => {
    return (
      <div className="card card_box">
        <button
          type="button"
          className="button btn btn-outline-light btn-lg "
          disabled={mainCardDisabled}
          onClick={libraryViewHandler}
        >
          <Icon.Collection /> &nbsp;&nbsp;|&nbsp;&nbsp; Manage the Library of
          the Workspace
        </button>
        <button
          type="button"
          className="button btn btn-outline-light btn-lg"
          disabled={mainCardDisabled}
          onClick={specificationHandler}
        >
          <Icon.ShieldPlus /> &nbsp;&nbsp;|&nbsp;&nbsp; Craft a new LAD
          Specification
        </button>
        <button
          type="button"
          className="button btn btn-outline-light btn-lg"
          disabled={mainCardDisabled}
          onClick={modificationHandler}
        >
          <Icon.LayoutWtf /> &nbsp;&nbsp;|&nbsp;&nbsp; Edit an existing LAD
          Specification
        </button>

        <button
          type="button"
          className="button btn btn-outline-light btn-lg"
          disabled={mainCardDisabled}
          onClick={loadGrafana}
        >
          <img
            src={process.env.PUBLIC_URL + "/grafana.png"}
            width="30"
            height="30"
          />
          &nbsp;&nbsp;|&nbsp;&nbsp; Grafana Local Instance
        </button>
      </div>
    );
  };

  const [steps, setSteps] = useState([
    { key: "no", label: " ", component: mainCard },
    {
      key: "specification",
      label: "LAD Specification",
      component: craftLADComponent,
    },
    {
      key: "modification",
      label: "LAD Modification",
      component: editLADComponent,
    },
    { key: "library", label: "Library", component: libraryComponent },
  ]);

  const [activeStep, setActiveStep] = useState(steps[0]);
  const specificationHandler = () => {
    setActiveStep(steps[1]);
    return;
  };

  const modificationHandler = () => {
    setActiveStep(steps[2]);
    return;
  };

  const libraryViewHandler = () => {
    setActiveStep(steps[3]);
    return;
  };

  const loadGrafana = () => {
    window.location.href = "/grafana";
  };

  const [workspace, setWorkspace] = React.useState(1);
  const cMainContext = [workspace, setWorkspace];

  const [open, setOpen] = React.useState(false);
  const [newWSName, setNewWSName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setNewWSName("");
    setOpen(false);
  };

  const createNewWorkSpace = () => {
    if (newWSName === "") return;
    const found = WSs.filter((w) => w.title === newWSName);
    if (found.length > 0)
      alert("A Workspace with title: " + newWSName + " already exists");
    else {
      let element = {
        title:newWSName,
     //   description:'Description of the WS'
      }
      axios.post("http://localhost:3001/wss", element).then(() => {
        getWSs();
        setOpen(false);
      setNewWSName("");
      });

      setOpen(false);
      setNewWSName("");
    }
  };

  return (
    <CMainContext.Provider value={cMainContext}>
      {steps[0] === activeStep ? (
        <div className="col-12 d-flex justify-content-center  align-items-center">
          <FormControl variant="outlined" className="bg-success cols col-4  ">
            <div></div>
            <InputLabel style={{ color: "white" }}>Use workspace</InputLabel>
            <Select
              style={{ color: "white" }}
              value={workspace}
              onChange={(e) => {
                setWorkspace(e.target.value);
                e.target.value !== ""
                  ? setMainCardDisabled(false)
                  : setMainCardDisabled(true);
              }}
            >
              {WSs.map((ws) => {
                return <MenuItem value={ws.id}>{ws.title}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <div className="cols col-1 d-flex align-items-center justify-content-left">
            <div role="button" className="p-3" onClick={handleClickOpen}>
              <Icon.PlusCircleFill />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="step-component">{activeStep.component()}</div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New WorkSpace</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a title for the Workspace
          </DialogContentText>
          <TextField
          //error
            autoFocus
            margin="dense"
            id="title"
            type="text"
            value={newWSName}
            onChange={(e) => setNewWSName(e.target.value)}
        //    helperText={newWSNameHelperText}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={createNewWorkSpace} color="success">
            Create
          </Button>
          <Button onClick={handleClose} color="danger">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </CMainContext.Provider>
  );
};

export default MainDash;
