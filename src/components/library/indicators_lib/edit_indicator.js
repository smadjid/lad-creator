import "../library-view.css";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Edit(props) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    data["id"] = props.id;
    updateIndicator(data);
  };

  const updateIndicator = (data) => {
    axios.put("http://localhost:3001/indicators", data).then((res) => {
      props.setIndicators(
        props.indicators.map((item) => {
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
    <form className="add-indicator" onSubmit={handleSubmit(onSubmit)}>
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
        <option value="1">Monitoring the use of media and tools</option>
        <option value="2">Monitoring Information Retrieval</option>
        <option value="3">Monitoring student activity</option>
        <option value="4">Monitoring student comprehension</option>
      </select>

      <input className="btn btn-outline-success" value="Update" type="submit" />
    </form>
  );
}
