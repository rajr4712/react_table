import React from "react";
import DynamicTable from "./component/DynamicTable";

const App = () => {

  const columns = [
    { label: "Name", accessor: "name" },
    { label: "Age", accessor: "age" },
    { label: "Country", accessor: "country" },
    { label: "Salary", accessor: "salary" },
    { label: "Address", accessor: "address" },
  ];

  const data = [
    { name: "Alice", age: 25, country: "USA" , salary: 50000, address: "New York" },
    { name: "Bob", age: 30, country: "Canada" , salary: 50000, address: "New York" },
    { name: "Charlie", age: 35, country: "UK" , salary: 50000, address: "New York"},
    { name: "David", age: 40, country: "Germany" , salary: 50000, address: "New York"},
    { name: "Eve", age: 45, country: "France", salary: 50000, address: "New York" },
    { name: "AkSH", age: 25, country: "USA", salary: 50000, address: "New York" },
    { name: "Bobby", age: 30, country: "Canada",salary: 50000, address: "New York" },
    { name: "Charlie", age: 35, country: "UK" , salary: 50000, address: "New York"},
    { name: "David", age: 40, country: "Germany",salary: 50000, address: "New York" },
    { name: "Eve", age: 45, country: "France" ,salary: 50000, address: "New York"},
  ];

  return (
    <div>
      <h1>Dynamic Table</h1>
      <DynamicTable data={data} columns={columns} />
    </div>
  );
};

export default App;
