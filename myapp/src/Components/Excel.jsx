import { useState, useEffect } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function Excel() {
  const [result, setResult] = useState([]);

  // fetch the data for import to excel sheet
  const getData = () => {
    fetch("https://dark-rose-gharial-vest.cyclic.cloud/taskmanager")
      .then((response) => response.json())
      .then((res) => setResult(res));
  };

  useEffect(() => {
    getData();
  });

  return (
    <div className="container">
      <h3 className="mt-12 text-success">
        <center>Export Task into EXCEL Sheet</center>
      </h3>
      <div className="row mt-4">
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button btn btn-success mb-3"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Export Data to Excel Sheet"
        />
        <table className="table" id="table-to-xls">
          <thead className="thead-dark"></thead>
          <tbody>
            {result.map((res) => (
              <ul>
                <li>
                  <h4>{res.title1}</h4>
                </li>
              </ul>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Excel;
