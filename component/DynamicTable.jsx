import React, { useState, useMemo } from "react";
import "./datable.css"; 

const DynamicTable = ({ data, columns, rowsPerPageOptions = [5, 10, 15] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [filters, setFilters] = useState({});

  // Handle searching
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.some(
        (col) =>
          row[col.accessor]
            ?.toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    );
  }, [data, columns, searchQuery]);

  // Handle sorting
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    const sorted = [...filteredData];
    sorted.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredData, sortConfig]);

  // Handle pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === "ascending" ? "descending" : "ascending",
        };
      }
      return { key, direction: "ascending" };
    });
  };

  return (
    <div className="table-container">
      <div className="table-controls">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option} rows
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} onClick={() => handleSort(col.accessor)}>
                {col.label}
                {sortConfig?.key === col.accessor ? (
                  sortConfig.direction === "ascending" ?
                    " ↑" :
                    " ↓"
                ) : (
                  // Always show up and down arrows, even if not sorted
                  <span> &uarr; &darr; </span> 
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={col.accessor}>{row[col.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(sortedData.length / rowsPerPage)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(sortedData.length / rowsPerPage))
            )
          }
          disabled={currentPage === Math.ceil(sortedData.length / rowsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DynamicTable;