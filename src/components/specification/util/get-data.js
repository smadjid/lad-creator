function createItem(_, id) {
    return {
      id: `item-${id}`,
      title: `item ${id}`
    };
  }
  
  function getArray(count, cb) {
    return Array(count)
      .fill(true)
      .map(cb);
  }
  
  export function createItemArray(count) {
    return getArray(count, createItem);
  }
  
  function createColumns(count) {
    return getArray(count, (col, index) => ({
      id: `col-${index}`,
      title: `col with id ${index}`,
      items: createItemArray(Math.floor(Math.random() * 1000 + 1000))
    }));
  }
  
  export default function getData(count) {
    return createColumns(count);
  }
  