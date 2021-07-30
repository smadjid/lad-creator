import { FRAMEBOX, ROW, COLUMN } from "./constants";

const initialData = {
  layout: [
    {
      type: ROW,
      id: "row0",
      children: [
        {
          type: COLUMN,
          id: "column0",
          children: [
            {
              type: FRAMEBOX,
              id: "framebox0"
            },
            {
              type: FRAMEBOX,
              id: "framebox1"
            }
          ]
        },
        {
          type: COLUMN,
          id: "column1",
          children: [
            {
              type: FRAMEBOX,
              id: "framebox2"
            }
          ]
        }
      ]
    },
    {
      type: ROW,
      id: "row1",
      children: [
        {
          type: COLUMN,
          id: "column2",
          children: [
            {
              type: FRAMEBOX,
              id: "framebox3"
            },
            {
              type: FRAMEBOX,
              id: "framebox0"
            },
            {
              type: FRAMEBOX,
              id: "framebox2"
            }
          ]
        }
      ]
    }
  ],
  frameboxs: {
    framebox0: { id: "framebox0", type: "input", content: "Some input" },
    framebox1: { id: "framebox1", type: "image", content: "Some image" },
    framebox2: { id: "framebox2", type: "email", content: "Some email" },
    framebox3: { id: "framebox3", type: "name", content: "Some name" },
    framebox4: { id: "framebox4", type: "phone", content: "Some phone" }
  }
};

export default initialData;
