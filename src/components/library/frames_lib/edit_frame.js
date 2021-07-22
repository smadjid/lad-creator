import "../library-view.css";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Edit(props) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    data["id"] = props.id;
    updateFrame(data);
  };

  const updateFrame = (data) => {
    axios.put("http://localhost:3001/frames", data).then((res) => {
      props.setFrames(
        props.frames.map((item) => {
          return item.id === props.id
            ? {
                id: item.id,
                title: item.title,
                description: item.description,
                rating: item.rating,
              }
            : item;
        })
      );
    });
  };

  return (
    <form className="add-frame" onSubmit={handleSubmit(onSubmit)}>
      <textarea
        type="text"
        placeholder="Description..."
        name="description"
        {...register("description", { required: true })}
      />

      <select
        class="formselect"
        placeholder="Rating"
        name="rating"
        {...register("rating", { required: true })}
      >
        <option value="1">Elaboration</option>
        <option value="2">Inquiry</option>
        <option value="3">Preservation</option>
        <option value="4">Comparison</option>
        <option value="5">Reframing</option>
        <option value="6">Seeking</option>
      </select>

      <input className="btn btn-outline-success" value="Update" type="submit" />
    </form>
  );
}
