import "./library-view.css";

import React, { useState, useEffect } from "react";
import Actions from "./visualizations_lib/visualization_actions";
import axios from "axios";
import {
  AddBoxRounded,
  EditRounded,
  HighlightOffRounded,
} from "@material-ui/icons";
import DataTable from "../specification/util/data-table";

export const VizContext = React.createContext();

function Visualizations() {
  const { REACT_APP_BASE_API } = process.env;
  const [visualizations, setVisualizations] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSave = () => {
    console.log(currentElement);
    if (creationMode)
      axios
        .post(REACT_APP_BASE_API+"visualizations", currentElement)
        .then(() => {
          setVisualizations([
            ...visualizations,
            {
              data: currentElement,
              headers: { "Content-Type": "multipart/form-data" },
            },
          ]);
          updateDisplay();
        });
    else
      axios
        .put(REACT_APP_BASE_API+"visualizations", currentElement)
        .then((res) => {
          setVisualizations(
            visualizations.map((item) => {
              return item.id === currentElement.id
                ? {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    class: item.class,
                    chart: item.chart,
                  }
                : item;
            })
          );
          updateDisplay();
        });

    setShowModal(false);
    updateDisplay();
  };

  const deleteVisualization = (id) => {
    window.confirm(
      "Are you sure you want to delete this type of visualization?"
    )
      ? axios
          .delete(`${REACT_APP_BASE_API}visualizations/${id}`)
          .then((res) => {
            setVisualizations(
              visualizations.filter((item) => {
                return item.id !== id;
              })
            );
          })
      : (id = id);
    updateDisplay();
  };

  const getVisualizations = () => {
    axios.get(REACT_APP_BASE_API+"visualizations").then((res) => {
      setVisualizations(res.data);
    });
  };

  useEffect(() => {
    getVisualizations();
  }, []);

  const updateDisplay = () => {
    getVisualizations();
  };

  const decodeChart = (blob) => {
    if (!blob) return;
    if (typeof blob === "string") return blob;
    const { data } = blob;
    const img = new Buffer.from(data).toString("ascii");

    return img;
  };

  const [currentElement, setCurrentElement] = useState();
  const [creationMode, setCreationMode] = useState(true);
  const vizContext = [currentElement, setCurrentElement];

  const CreateNewVisualization = () => {
    const item = {
      title: "New",
      description: "Description",
      chart: null,
      class: "Distribution",
    };

    setCurrentElement(item);
    setCreationMode(true);
    setShowModal(true);

    return;
  };
  const EditVisualization = (item) => {
    setCurrentElement(item);
    setCreationMode(false);
    setShowModal(true);
  };
  return (
    <VizContext.Provider value={vizContext}>
      <Actions
        title="un titre"
        show={showModal}
        mode="Creation"
        visualizations={visualizations}
        setVisualizations={setVisualizations}
        updateDisplay={updateDisplay}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />

      <div>
        <button className="btn btn-success" onClick={CreateNewVisualization}>
          <AddBoxRounded /> &nbsp; New visualization type
        </button>
      </div>
      <table className="table table-bordered table-hover table-dark table-striped text-md-start">
        <thead>
          <tr>
            {/* <th scope="col">#</th> */}
            <th scope="col">Title</th>
            <th scope="col">CLass</th>
            <th scope="col">Representation</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visualizations.map((item) => {
            return (
              <tr key={item.id}>
                {/* <th scope="row">{item.id}</th> */}
                <td>{item.title}</td>
                <td>{item.class}</td>
                <td>
                  <div className="chart_box">
                    <img alt="Chart" src={decodeChart(item.chart)} />
                  </div>
                </td>
                <td>{item.description}</td>

                <td>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => EditVisualization(item)}
                  >
                    <EditRounded />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteVisualization(item.id)}
                  >
                    <HighlightOffRounded />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </VizContext.Provider>
  );
}

export default Visualizations;
