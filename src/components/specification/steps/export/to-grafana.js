import React from "react"
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import axios from "axios";

const ToGrafana = (props) =>{
    // curl -H "Authorization: Bearer eyJrIjoiMjBJckFNWUwydTBhaFRyN1hjQThVWTRHUTZTSUlyMW0iLCJuIjoibGFkc3R1ZGlvIiwiaWQiOjF9" http://localhost/api/dashboards/home
    let key = "eyJrIjoiSWV4bktIMEp4MEdySmd2VU9Sbkl0V1VOWFZlbXVEWjEiLCJuIjoiSyIsImlkIjoxfQ==";
    let instanceURL = "http://localhost:3000/api"
    const sendRequest = () =>{
      console.log(props.data)
        
        axios.get(instanceURL,props.data,{
            headers: { 
                'Content-Type': 'application/json' ,
                'Accept': 'application/json' ,
                'Authorization' : 'Bearer eyJrIjoiSWV4bktIMEp4MEdySmd2VU9Sbkl0V1VOWFZlbXVEWjEiLCJuIjoiSyIsImlkIjoxfQ==',
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Credentials': 'true',
            }
        }).then((res)=>{
            console.log(res)
        })
    }
    return(
        <Modal
            show={props.show}
            backdrop="static"
            keyboard={true}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="modal-style"
            scrollable
            centered
          >
            <Modal.Header>
              <Modal.Title>Inject into a Grafana Instance</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <table className="table table-dark">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Frame Title"                        
                        name="title"                        
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Class</td>
                    <td>
                      <select
                        className="formselect"
                        name="class"
                        required
                      >
                        <option value="Perception">Perception</option>
                        <option value="Comprehension">Comprehension</option>
                        <option value="Projection">Projection</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>
                      <textarea
                        type="text"
                        placeholder="Description..."
                        
                        name="description"
                        required
                      />
                    </td>
                  </tr>
                                 
                  <tr>                  
                  </tr>
                </tbody>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={props.handleHide}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                variant="secondary"
                onClick={sendRequest}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
    );
};
export default ToGrafana;