import "./library-view.css";

import React, { useState, useEffect } from "react";
import AddVisualization from "./visualizations_lib/add_visualization";
import Edit from "./visualizations_lib/edit_visualization";
import Delete from "./visualizations_lib/delete_visualization";
import Actions from "./visualizations_lib/visualization_actions";
import axios from "axios";

export const VizContext = React.createContext();

function Visualizations() {
  const [visualizations, setVisualizations] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSave = () => {
    if (creationMode)
      axios
        .post("http://localhost:3001/visualizations", currentElement)
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
        .put("http://localhost:3001/visualizations", currentElement)
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
    axios
      .delete(`http://localhost:3001/visualizations/${id}`)
      .then((res) => {
        setVisualizations(
          visualizations.filter((item) => {
            return item.id !== id;
          })
        );
      });
      updateDisplay();
  };

  const getVisualizations = () => {
    axios.get("http://localhost:3001/visualizations").then((res) => {
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
      <hr />

      <button className="btn btn-success" onClick={CreateNewVisualization}>
        NEW
      </button>
      <h4>View, edit or delete defined types of visualizations</h4>
      <table className="table table-bordered table-hover table-dark table-striped text-md-start">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Type</th>
            <th scope="col">Representation</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visualizations.map((item) => {
            return (
              <tr>
                <th scope="row">{item.id}</th>
                <td>{item.title}</td>
                <td>{item.class}</td>
                <td>
                  <div className="chart_box">
                    <img alt="Chart" src={decodeChart(item.chart)} />
                  </div>
                </td>
                <td>{item.description}</td>

                <td></td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => EditVisualization(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteVisualization(item.id)}
                  >
                    Delete
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
