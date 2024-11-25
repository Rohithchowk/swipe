// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Paper from '@mui/material/Paper';
// import TableContainer from '@mui/material/TableContainer';
// import Table from '@mui/material/Table';
// import TableHead from '@mui/material/TableHead';
// import TableBody from '@mui/material/TableBody';
// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';
// import TablePagination from '@mui/material/TablePagination';
// import * as XLSX from 'xlsx';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';

// const SamplePage = ({blockvalue,deptvalue}) => {
//   const [blocks, setBlocks] = useState([]);
//   const [selectedBlock, setSelectedBlock] = useState('');
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [departmentData, setDepartmentData] = useState([]);
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const [jsonData, setJsonData] = useState(null);
//   const [excelGenerated, setExcelGenerated] = useState(false);
//   const [pdfGenerated, setPdfGenerated] = useState(false);

//   const fetchJsonData = (url) => {
//     fetch(url)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         return response.json();
//       })
//       .then(json => {
//         if (json && json.length > 0) {
//           setJsonData(json);
//         } else {
//           throw new Error('Empty JSON response');
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   };
  
//   const convertJsonToExcel = () => {
//     if (!jsonData) return;

//     const keys = Object.keys(jsonData[0]);
//     const data = jsonData.map(item => {
//       const row = {};
//       keys.forEach(key => {
//         row[key] = item[key];
//       });
//       return row;
//     });

//     const workSheet = XLSX.utils.json_to_sheet(data);
//     const workBook = XLSX.utils.book_new();

//     XLSX.utils.book_append_sheet(workBook, workSheet, 'posts');

//     XLSX.writeFile(workBook, 'postsData.xlsx');

//     setExcelGenerated(true);
//   };

//   const convertJsonToPDF = () => {
//     if (!jsonData) return;

//     const doc = new jsPDF();
//     doc.autoTable({ html: '#jsonTable' });
//     doc.save('jsonData.pdf');

//     setPdfGenerated(true);
//   };


//   useEffect(( ) => {
//     const fetchBlocks = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/departments/blocks');
//         setBlocks(response.data);
//       } catch (error) {
//         console.error('Error fetching blocks:', error);
//       }
//     };
//     fetchBlocks();
//   }, []);

//   const handleBlockSelect = async (event) => {
//     const block = blockvalue;
//     setSelectedBlock(block);
//     try {
//       const response = await axios.get(`http://localhost:5000/api/departments/departments/${block}`);
//       setDepartments(response.data);
//     } catch (error) {
//       console.error(`Error fetching departments for block ${block}:`, error);
//     }
//     setSelectedDepartment('');
//     setCategories([]);
//     setSelectedCategory('');
//     setDepartmentData([]);
//   };

//   const handleDepartmentSelect = async (event) => {
//     const department = deptvalue;
//     setSelectedDepartment(department);
//     try {
//       const response = await axios.get(`http://localhost:5000/api/departments/categories/${selectedBlock}/${department}`);
//       setCategories(response.data);
//     } catch (error) {
//       console.error(`Error fetching categories for department ${department} in block ${selectedBlock}:`, error);
//     }
//     setSelectedCategory('');
//     setDepartmentData([]);
//   };

//   const handleCategorySelect = async (event) => {
//     const category = event.target.value;
//     setSelectedCategory(category);
//     const url = `http://localhost:5000/api/departments/${selectedBlock}/${selectedDepartment}/${category}`;
//     try {
//       const response = await axios.get(url);
//       setDepartmentData(response.data);
//       fetchJsonData(url);
//     } catch (error) {
//       console.error(`Error fetching ${category} for department ${selectedDepartment} in block ${selectedBlock}:`, error);
//     }
//   };
  
  

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <div>
//       <Select
//         value={selectedBlock}
//         onChange={handleBlockSelect}
//         displayEmpty
//         variant="outlined"
//         style={{ marginRight: '10px' }}
//       >
//         <MenuItem value="" disabled>Select Block</MenuItem>
//         {blocks.map((block) => (
//           <MenuItem key={block} value={block}>{block}</MenuItem>
//         ))}
//       </Select>
//       <Select
//         value={selectedDepartment}
//         onChange={handleDepartmentSelect}
//         displayEmpty
//         variant="outlined"
//         style={{ marginRight: '10px' }}
//         disabled={!selectedBlock}
//       >
//         <MenuItem value="" disabled>Select Department</MenuItem>
//         {departments.map((dept) => (
//           <MenuItem key={dept._id} value={dept.name}>{dept.name}</MenuItem>
//         ))}
//       </Select>
//       <Select
//         value={selectedCategory}
//         onChange={handleCategorySelect}
//         displayEmpty
//         variant="outlined"
//         style={{ marginRight: '10px' }}
//         // disabled={!selectedDepartment}
//       >
//         <MenuItem value="" disabled>Select Category</MenuItem>
//         {categories.map((category) => (
//           <MenuItem key={category} value={category}>{category}</MenuItem>
//         ))}
//       </Select>
//       <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//         <TableContainer sx={{ maxHeight: 440 }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {/* Your table header row will be replaced with your original logic */}
//                 {/* For example, you can map through your data to generate table headers */}
//                 {departmentData.length > 0 && typeof departmentData[0] === 'object' && (
//                   Object.keys(departmentData[0]).map((key) => (
//                     key !== '_id' && <TableCell key={key}>{key}</TableCell>
//                   ))
//                 )}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {/* Your table body will be replaced with your original logic */}
//               {/* For example, you can map through your data to generate table rows */}
//               {departmentData.map((item, index) => (
//                 <TableRow key={index}>
//                   {typeof item === 'object' && Object.keys(item).map((key) => (
//                     key !== '_id' && (
//                       <TableCell key={key}>
//                         {typeof item[key] === 'boolean' ? (item[key] ? 'Yes' : 'No') : item[key]}
//                       </TableCell>
//                     )
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={departmentData.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//       <button onClick={convertJsonToExcel}>Generate Excel</button>
//           <button onClick={convertJsonToPDF}>Generate PDF</button>
//           {excelGenerated && <p>Excel file generated successfully.</p>}
//           {pdfGenerated && <p>PDF file generated successfully.</p>}
//     </div>
//   );
// };

// export default SamplePage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const SamplePage = ({ blockvalue, deptvalue }) => {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState('');
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [departmentData, setDepartmentData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [jsonData, setJsonData] = useState(null);
  const [excelGenerated, setExcelGenerated] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/departments/blocks');
        setBlocks(response.data);
      } catch (error) {
        console.error('Error fetching blocks:', error);
      }
    };
    fetchBlocks();
  }, []);

  const fetchDepartments = async (block) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/departments/departments/${block}`);
      setDepartments(response.data);
    } catch (error) {
      console.error(`Error fetching departments for block ${block}:`, error);
    }
  };

  const fetchCategories = async (block, department) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/departments/categories/${block}/${department}`);
      setCategories(response.data);
    } catch (error) {
      console.error(`Error fetching categories for department ${department} in block ${block}:`, error);
    }
  };

  const fetchDataForCategory = async (block, department, category) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/departments/${block}/${department}/${category}`);
      setDepartmentData(response.data);
    } catch (error) {
      console.error(`Error fetching ${category} for department ${department} in block ${block}:`, error);
    }
  };

  const handleBlockSelect = (event) => {
    const block = blockvalue;
    setSelectedBlock(block);
    fetchDepartments(block);
    setSelectedDepartment('');
    setCategories([]);
    setSelectedCategory('');
    setDepartmentData([]);
  };

  const handleDepartmentSelect = (event) => {
    const department = deptvalue;
    setSelectedDepartment(department);
    fetchCategories(selectedBlock, department);
    setSelectedCategory('');
    setDepartmentData([]);
  };

  const handleCategorySelect = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    fetchDataForCategory(selectedBlock, selectedDepartment, category);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteAllDataForBlock = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/departments/deleteAll/${selectedBlock}`);
      console.log('Delete all response:', response);
      setDepartmentData([]);
    } catch (error) {
      console.error(`Error deleting all data for block ${selectedBlock}:`, error);
    }
  };

  const convertJsonToExcel = () => {
    if (!jsonData) return;

    const keys = Object.keys(jsonData[0]);
    const data = jsonData.map(item => {
      const row = {};
      keys.forEach(key => {
        row[key] = item[key];
      });
      return row;
    });

    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, 'posts');

    XLSX.writeFile(workBook, 'postsData.xlsx');

    setExcelGenerated(true);
  };

  const convertJsonToPDF = () => {
    if (!jsonData) return;

    const doc = new jsPDF();
    doc.autoTable({ html: '#jsonTable' });
    doc.save('jsonData.pdf');

    setPdfGenerated(true);
  };

  return (
    <div>
      <Select
        value={selectedBlock}
        onChange={handleBlockSelect}
        displayEmpty
        variant="outlined"
        style={{ marginRight: '10px' }}
      >
        <MenuItem value="" disabled>Select Block</MenuItem>
        {blocks.map((block) => (
          <MenuItem key={block} value={block}>{block}</MenuItem>
        ))}
      </Select>
      <Select
        value={selectedDepartment}
        onChange={handleDepartmentSelect}
        displayEmpty
        variant="outlined"
        style={{ marginRight: '10px' }}
        disabled={!selectedBlock}
      >
        <MenuItem value="" disabled>Select Department</MenuItem>
        {departments.map((dept) => (
          <MenuItem key={dept._id} value={dept.name}>{dept.name}</MenuItem>
        ))}
      </Select>
      <Select
        value={selectedCategory}
        onChange={handleCategorySelect}
        displayEmpty
        variant="outlined"
        style={{ marginRight: '10px' }}
      >
        <MenuItem value="" disabled>Select Category</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>{category}</MenuItem>
        ))}
      </Select>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {/* Replace with your custom headers */}
                {departmentData.length > 0 && typeof departmentData[0] === 'object' && (
                  Object.keys(departmentData[0]).map((key) => (
                    key !== '_id' && <TableCell key={key}>{key}</TableCell>
                  ))
                )}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Replace with your custom rows */}
              {departmentData.map((item, index) => (
                <TableRow key={index}>
                  {typeof item === 'object' && Object.keys(item).map((key) => (
                    key !== '_id' && (
                      <TableCell key={key}>
                        {typeof item[key] === 'boolean' ? (item[key] ? 'Yes' : 'No') : item[key]}
                      </TableCell>
                    )
                  ))}
                  <TableCell>
                    <button onClick={() => handleDeleteData(item._id)}>Delete</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={departmentData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <button onClick={deleteAllDataForBlock} disabled={!selectedBlock}>Delete All Data for Block</button>
      <button onClick={convertJsonToExcel}>Generate Excel</button>
      <button onClick={convertJsonToPDF}>Generate PDF</button>
      {excelGenerated && <p>Excel file generated successfully.</p>}
      {pdfGenerated && <p>PDF file generated successfully.</p>}
    </div>
  );
};

export default SamplePage;


