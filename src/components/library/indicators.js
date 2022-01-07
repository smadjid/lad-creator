import "./library-view.css";

import React, { useState, useEffect } from "react";
import Actions from "./indicators_lib/indicator_actions";
import axios from "axios";
import {
  AddBoxRounded,
  EditRounded,
  HighlightOffRounded,
} from "@material-ui/icons";

export const IndicatorContext = React.createContext();

function Indicators(props) {
  const { REACT_APP_BASE_API } = process.env;
  const [indicators, setIndicators] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSave = () => {
    if (creationMode)
      axios
        .post(REACT_APP_BASE_API+"indicators", currentElement)
        .then(() => {
          setIndicators([
            ...indicators,
            {
              data: currentElement,
              headers: { "Content-Type": "multipart/form-data" },
            },
          ]);
          updateDisplay();
        });
    else
      axios
        .put(REACT_APP_BASE_API+"indicators", currentElement)
        .then((res) => {
          setIndicators(
            indicators.map((item) => {
              return item.id === currentElement.id
                ? {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    class: item.class,
                  }
                : item;
            })
          );
          updateDisplay();
        });

    setShowModal(false);
    updateDisplay();
  };

  const deleteIndicator = (id) => {
    window.confirm(
      "Are you sure you want to delete this type of indicators?"
    )
      ? axios
          .delete(`${REACT_APP_BASE_API}indicators/${id}`)
          .then((res) => {
            setIndicators(
              indicators.filter((item) => {
                return item.id !== id;
              })
            );
          })
      : (id = id);
    updateDisplay();
  };

  const getIndicators = () => {
    axios.get(REACT_APP_BASE_API+"indicators").then((res) => {
      setIndicators(res.data);
    });
  };

  useEffect(() => {
    getIndicators();
  }, []);

  const updateDisplay = () => {
    getIndicators();
  };


  const [currentElement, setCurrentElement] = useState();
  const [creationMode, setCreationMode] = useState(true);
  const indicatorContext = [currentElement, setCurrentElement];

  const CreateNewIndicator = () => {
    const item = {
      title: "New",
      description: "Description",
      class: " ",
    };

    setCurrentElement(item);
    setCreationMode(true);
    setShowModal(true);

    return;
  };
  const EditIndicator = (item) => {
    setCurrentElement(item);
    setCreationMode(false);
    setShowModal(true);
  };
  return (
    <IndicatorContext.Provider value={indicatorContext}>
      <Actions
        title="un titre"
        show={showModal}
        mode="Creation"
        indicators={indicators}
        setIndicators={setIndicators}
        updateDisplay={updateDisplay}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />

      <div>
        <button className="btn btn-success" onClick={CreateNewIndicator}>
          <AddBoxRounded /> &nbsp; New indicator type
        </button>
      </div>
      <table className="table table-bordered table-hover table-dark table-striped text-md-start">
        <thead>
          <tr>
            {/* <th scope="col">#</th> */}
            <th scope="col">Name</th>
            <th scope="col">Class</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {indicators.map((item) => {
            return (
              <tr key={item.id}>
                {/* <th scope="row">{item.id}</th> */}
                <td>{item.title}</td>
                <td>{item.class}</td>               
                <td>{item.description}</td>

                <td>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => EditIndicator(item)}
                  >
                    <EditRounded />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteIndicator(item.id)}
                  >
                    <HighlightOffRounded />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </IndicatorContext.Provider>
  );
}

export default Indicators;