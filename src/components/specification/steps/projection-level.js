import React, { useState } from "react";
import Frame from "../util/frame";
const ProjectionLevel=()=>{
    return(
        <form className="needs-validation" novalidate>
            <div class="form-group row">
          <h3>Complementary analysis of the situation</h3>
          <panel>What other insights need to be gainded before taking a decision ?</panel>
          <hr className="my-1" />
        </div>
        <Frame />
        </form>
    )
};

export default ProjectionLevel;
