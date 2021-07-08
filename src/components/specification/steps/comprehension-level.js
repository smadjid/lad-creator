import React, { useState } from "react";
import Frame from "../util/frame";
const ComprehensionLevel=()=>{
    return(
        <form className="needs-validation" novalidate>
            <div class="form-group row">
          <h3>Fine-grainded analysis of the situation</h3>
          <panel>Build the process that can help you build an accurate understanding of the situation at hand</panel>
          <hr className="my-1" />
        </div>
        <Frame />
        </form>
    )
};

export default ComprehensionLevel;
