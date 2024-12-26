import './App.css';
import {useTable} from 'react-table';

const data = [
  {
    id: 1,
    name: 'John Doe',
    age: 30,
  },
  {
    id: 2,
    name: 'Avniash Rajput',
    age: 25,
  },
];

const columns = [{
  Header: 'ID',   //jo table header me show hoga
  accessor: 'id',  //its like id.
}]

function App() {

  const {getTableProps,getTableBodyProps, headerGroups, rows, prepareRow} = useTable({
    columns, data
  });

  const  props = getTableProps();

  return (
    <div className="App">
    <div className='container'>
    <table {...getTableProps()}>
    <thead>
    <tr>
        <th>ID</th>
        <th>Gender</th>
        <th>Salary</th>
      </tr>
    </thead>

    <tbody>
    {
      data.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.age}</td>
        </tr>
      ))
    }
    </tbody>
 

    </table>

    </div>
      
    </div>
  );
}

export default App;
