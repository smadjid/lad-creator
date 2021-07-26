import React, {useState} from "react";

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const DataTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.data);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  
 
  const getArrayPropertyNames = (arr) => {
    console.log(Object.getOwnPropertyNames(arr[0]));
    return Object.getOwnPropertyNames(arr[0]);
  };

  const properties = getArrayPropertyNames(props.data);
  return (
    <table className="table table-bordered table-hover table-dark table-striped text-md-start">
      <thead>
        <tr>
          {properties.map((item) => {
             return <th>
            <button
              type="button"
              onClick={() => requestSort(item)}
              className={getClassNamesFor(item)}
            >
              {item}
            </button>
            </th>
          })}
         
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
          {properties.map((i)=>{
              return <td>{item[i]}</td>
          })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
