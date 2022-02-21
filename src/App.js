import React, { useState } from 'react';
import './App.css';
import './table.css';

function App() {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState("⬇️ Select Status");

  const fetchData = () => {
    // const url =`https://api.github.com/search/repositories?q=${keyword}`;
    const url = `http://localhost:8081/api/v1/phone-numbers?pageNo=0&pageSize=50&sortBy=id&country=${keyword}&state=${status}`;
    fetch(url)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      setData(response);
    });
  }

  const statuses = [
    { label: "VALID", value: "VALID" },
    { label: "NOT VALID", value: "NOT_VALID" }
  ]
  

  const handleFruitChange = (e) => {
    setStatus(e.target.value)
  }

  const handleChange = (e) => {
    setKeyword(e.target.value);
  }

  const tableRows = data.map((item, index) =>
  <tr key={index}>
         <td>{item.phoneNumber}</td>
         <td>{item.status}</td>
  </tr>);

return (
    <div className="App">
      <div>
        <input type="text" onChange={handleChange} />
        <button onClick={fetchData} value={keyword}>fetch</button>
        
        <br />
        
        <select onChange={handleFruitChange}> 
            {/* Creating the default / starting option for our 
              dropdown.
            */}
          <option value="⬇️ Select a fruit ⬇️"> -- Select a Status -- </option>
          {statuses.map((status) => <option value={status.value}>{status.label}</option>)}
        </select>
      

        <h3>List of Phone Numbers</h3>
        <table id='phonenumbers'>
              <tr>
                <th>Phone Number</th>
                <th>Status</th>
              </tr>
        <tbody>{tableRows}</tbody></table>
      </div>
    </div> 
);

}

export default App;