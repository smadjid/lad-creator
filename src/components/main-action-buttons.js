import Card from "./card";
import * as Icon from "react-bootstrap-icons";
import "./main-action-buttons.css";
function MainActionButtons(props) {
  return (
    <Card className="actionButtons">
      <button type="button" className="btn btn-outline-light btn-lg">
        <Icon.ShieldPlus />  &nbsp;&nbsp;|&nbsp;&nbsp; Create a new LAD Specification
      </button>
      <button type="button" className="btn btn-outline-light btn-lg">
        <Icon.LayoutWtf />  &nbsp;&nbsp;|&nbsp;&nbsp; Open and edit an existing LAD specification
      </button>
      <button type="button" className="btn btn-outline-light btn-lg">
        <Icon.Collection />  &nbsp;&nbsp;|&nbsp;&nbsp; Explorer and manage the current Library
      </button>
      <button type="button" className="btn btn-outline-light btn-lg">
        <Icon.GearWideConnected />  &nbsp;&nbsp;|&nbsp;&nbsp;
        Specify and manage the creation rules
      </button>
    </Card>
  );
}

export default MainActionButtons;
