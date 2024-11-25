import React, { useState,useEffect} from 'react';
import axios from 'axios';
import ImageRow from './Imagedisplay'
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';



const Home = () => {
  const [file, setFile] = useState(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCustomerChecked, setIsCustomerChecked] = useState(true);
  const [isProductChecked, setIsProductChecked] = useState(true);
  const [openDialog, setOpenDialog] = useState(true);

  const [customerInvoicedata, setCustomersData] = useState([]);
  const [productsData, setProductsData] = useState([]);

  const [customerPage, setCustomerPage] = useState(0);
  const [productPage, setProductPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenDialog(false);
    }, 30000); 

    return () => clearTimeout(timer); 
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  

  const handleUserPromptChange = (e) => {
    setUserPrompt(e.target.value);
  };

  const handleCustomerChange = (e) => {
    setIsCustomerChecked(e.target.checked);
  };

  const handleProductChange = (e) => {
    setIsProductChecked(e.target.checked);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const CustomerData = new FormData();
    const systemPrompt="You are a specialist in comprehending receipts.Input images in the form of receipts will be provided to you,and your task is to respond to questions based on the content of the input image."
    const productprompt =
      "Convert the Invoice data into an array with fields containing Customer Name, Phone Number, Total Amount";
    const customerprompt =
      "Convert the Invoice data into an array with fields containing Product Name, Quantity, Unit Price, Tax, Price with Tax";
    formData.append('file', file);
    formData.append('system_prompt', systemPrompt);
    formData.append('user_prompt', productprompt);
    CustomerData.append('file', file);
    CustomerData.append('system_prompt', systemPrompt);
    CustomerData.append('user_prompt', customerprompt);

    setLoading(true);

    try {
      const customerPromise = isCustomerChecked
        ? axios.post('http://127.0.0.1:5000/upload', formData)
        : null;

      const productPromise = isProductChecked
        ? axios.post('http://127.0.0.1:5000/upload', CustomerData)
        : null;

      const responses = await Promise.all([customerPromise, productPromise]);

      if (responses[0]) {
        setCustomersData(responses[0]?.data?.response || []);
      }

      if (responses[1]) {
        setProductsData(responses[1]?.data?.response || []);
      }
    } catch (error) {
      console.error('There was an error uploading the file!', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage, type) => {
    if (type === 'customer') {
      setCustomerPage(newPage);
    } else {
      setProductPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (event, type) => {
    const rowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(rowsPerPage);
    if (type === 'customer') {
      setCustomerPage(0);
    } else {
      setProductPage(0);
    }
  };

  const handleSaveEdit = () => {
    let lastInvoiceNumber = parseInt(localStorage.getItem('lastInvoiceNumber')) || 0;
  
    const newInvoiceNumber = lastInvoiceNumber + 1;
  
    const invoiceData = {
      invoiceNumber: newInvoiceNumber,
      customerData: isCustomerChecked ? customerInvoicedata : [], 
      productData: isProductChecked ? productsData : []          
    };
  
    // Get existing invoices from localStorage, or initialize an empty object if none exist
    let existingInvoices = localStorage.getItem('InvoiceData');
    
    // Check if the retrieved value is a valid JSON object
    if (existingInvoices) {
      try {
        existingInvoices = JSON.parse(existingInvoices);
        if (typeof existingInvoices !== 'object' || Array.isArray(existingInvoices)) {
          throw new Error('Data is not a valid object');
        }
      } catch (e) {
        console.error('Error parsing existing invoices:', e);
        existingInvoices = {};
      }
    } else {
      existingInvoices = {};
    }
  
    // Add the new invoice to the object using the new invoice number as the key
    existingInvoices[newInvoiceNumber] = invoiceData;
  
    // Save the updated invoices object back to localStorage
    localStorage.setItem('InvoiceData', JSON.stringify(existingInvoices));
  
    // Update the last invoice number in localStorage
    localStorage.setItem('lastInvoiceNumber', newInvoiceNumber);
  
    alert(`Invoice ${newInvoiceNumber} has been saved to localStorage!`);
  };
  
  
  
  const renderTable = (data, type) => {
    const validData = Array.isArray(data) ? data : [];

    if (validData.length === 0) {
      return <Typography>No {type} data available</Typography>;
    }

    const startIndex = (type === 'Customer' ? customerPage : productPage) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = validData.slice(startIndex, endIndex);

    return (
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 1,
          }}
        >
          <Typography variant="h6">{type} Table</Typography>
        </Box>
        <TableContainer component={Paper} sx={{ marginTop: 2, border: '1px solid #ddd' }}>
          <Table>
            <TableHead>
              <TableRow>
                {type === 'Customer' ? (
                  <>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Total Amount</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Unit Price</TableCell>
                    <TableCell>Tax</TableCell>
                    <TableCell>Price with Tax</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item, index) => (
                <TableRow key={index}>
                  {type === 'Customer' ? (
                    <>
                      <TableCell>{item['Customer Name']}</TableCell>
                      <TableCell>{item['Phone Number']}</TableCell>
                      <TableCell>{item['Total Amount']}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{item['Product Name'] || item['ProductName'] }</TableCell>
                      <TableCell>{item['Quantity'] }</TableCell>
                      <TableCell>{item['Unit Price'] || item['UnitPrice']}</TableCell>
                      <TableCell>{item['Tax']}</TableCell>
                      <TableCell>{item['Price with Tax'] || item['PriceWithTax']}</TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[2, 5, 10]}
            component="div"
            count={validData.length}
            rowsPerPage={rowsPerPage}
            page={type === 'Customer' ? customerPage : productPage}
            onPageChange={(e, newPage) => handleChangePage(e, newPage, type)}
            onRowsPerPageChange={(e) => handleChangeRowsPerPage(e, type)}
          />
        </TableContainer>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        marginLeft:'50px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 2,
        width: '80%',
      }}
    >
      <Dialog open={openDialog}>
        <DialogTitle>Welcome How are you?</DialogTitle>
        <DialogContent>
          <Typography>Upload Your Invoice Here! Get Data ! If you are facing problem in extracting data, it might be due to two reasons : 1.Gemini API resource got exhausted 2.Uploading unsupported file format. Try after few minutes if the problem is with gemini. </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Card sx={{ maxWidth: 600, width: '100%', boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Upload and Process Invoice
          </Typography>

          <Box sx={{ marginBottom: 3, textAlign: 'center' }}>
            <input
              type="file"
              id="file-input"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor="file-input">
              <Button
                variant="contained"
                component="span"
                color="primary"
                sx={{ width: '200px', marginBottom: 3 }}
              >
                {file ? `Selected File: ${file.name}` : 'Choose File'}
              </Button>
            </label>
            <ImageRow/>
          </Box>

          
          {/* <TextField
            fullWidth
            label="User Prompt"
            variant="outlined"
            value={userPrompt}
            onChange={handleUserPromptChange}
            sx={{ marginBottom: 2 }}
          /> */}

          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              sx={{ width: '150px' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox checked={isCustomerChecked} onChange={handleCustomerChange} />
              }
              label="Include Customer Data"
            />
            <FormControlLabel
              control={
                <Checkbox checked={isProductChecked} onChange={handleProductChange} />
              }
              label="Include Product Data"
            />
          </Box>
        </CardContent>
      </Card>

      {isCustomerChecked && (
        <Box sx={{ marginTop: 5, width: '100%' }}>{renderTable(customerInvoicedata, 'Customer')}</Box>
      )}
      {isProductChecked && (
        <Box sx={{ marginTop: 5, width: '100%' }}>{renderTable(productsData, 'Product')}</Box>
      )}
       <Box sx={{ textAlign: 'center', marginTop: 3 }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleSaveEdit}
          sx={{ width: '200px' }}
        >
          Save & Edit All
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
