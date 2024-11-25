import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Paper, Box, Typography, TablePagination } from '@mui/material';
import xcellogo from '../../assets/images/xcellogo1.png'
const ExcelDataExtractor = () => {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [hoveredCellData, setHoveredCellData] = useState(null);
  const [cellPosition, setCellPosition] = useState({ top: 0, left: 0 });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Function to handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'text/csv' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        setData(data);
        setFileName(file.name);
        setFileUploaded(true);
      };

      reader.readAsArrayBuffer(file);
    } else {
      alert('Please upload a CSV or Excel file.');
    }
  };

  // Function to handle updates to table data
  const handleInputChange = (e, rowIndex, columnName) => {
    const updatedData = [...data];
    updatedData[rowIndex][columnName] = e.target.value;
    setData(updatedData);
  };

  // Function to handle the generation of the updated data (CSV download)
  const handleGenerateData = () => {
    const csv = XLSX.utils.json_to_sheet(data);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, csv, 'Updated Data');
    XLSX.writeFile(newWorkbook, `Updated_${fileName}`);
  };

  // Function to handle hover and display magnified data
  const handleCellHover = (event, cellData) => {
    const rect = event.target.getBoundingClientRect();
    setCellPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setHoveredCellData(cellData);
  };

  // Handle Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom sx={{textAlign:'center'}}>
        Upload Excel or CSV File to Modify Data
      </Typography>
      <input
        type="file"
        accept=".csv, .xlsx"
        onChange={handleFileChange}
        style={{
          display: 'none', // Hide the default file input
        }}
        id="excel-file-input"
      />
      <label htmlFor="excel-file-input">
        <Button variant="outlined" component="span" fullWidth sx={{ marginBottom: 2 }}>
          Choose File
        </Button>
      </label>
      {!fileUploaded &&(
         <img src={xcellogo} alt='xcel sheet logo' style={{ 
    padding: '20px 20px', 
    display: 'block', 
    marginLeft: 'auto', 
    marginRight: 'auto',
    maxWidth: '100%', 
    height: 'auto' 
  }} ></img>
      )}

      {fileUploaded && (
        <Box>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            File: <strong>{fileName}</strong>
          </Typography>

          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead >
                <TableRow >
                  {Object.keys(data[0]).map((key) => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                      {Object.keys(row).map((columnName) => (
                        <TableCell
                          key={columnName}
                          sx={{
                            padding: 1, // Padding for better readability
                            cursor: 'pointer',
                            position: 'relative',

                          }}
                          onMouseEnter={(event) => handleCellHover(event, row[columnName])} // Trigger hover
                          onMouseLeave={() => setHoveredCellData(null)} // Reset hover on leave
                        >
                          <TextField
                            value={row[columnName]}
                            onChange={(e) => handleInputChange(e, rowIndex, columnName)}
                            fullWidth
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Magnified Data Display beside the cell */}
          {hoveredCellData && (
            <Box
              sx={{
                position: 'absolute',
                top: `${cellPosition.top + 40}px`, // Slight offset from the cell's top
                left: `${cellPosition.left + 40}px`, // Slight offset from the cell's left
                backgroundColor: '#fff',
                border: '2px solid #ccc',
                padding: 2,
                borderRadius: 2,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                maxWidth: '200px',
                width: 'auto',
                fontSize: '16px', // Larger font size for magnified view
                zIndex: 999,
                color:'#f96d00'
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {hoveredCellData}
              </Typography>
            </Box>
          )}

          <Box sx={{ marginTop: 2, textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateData}
              sx={{ width: '100%', maxWidth: 200 }}
            >
              Generate Updated Data
            </Button>
          </Box>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[10, 25, 40]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
    </Box>
  );
};

export default ExcelDataExtractor;
