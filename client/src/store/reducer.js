import { combineReducers } from 'redux';

// reducer imports
import customizationReducer from './customizationReducer';
import invoiceReducer from './invoiceSlice';

// ==============================|| COMBINE REDUCER ||============================== //
const rootReducer = combineReducers({
  customization: customizationReducer,
  invoice: invoiceReducer, // Add the invoice slice here
});

export default rootReducer;
