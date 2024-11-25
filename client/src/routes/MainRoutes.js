import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));


//Blocks Data 
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/Ablockdata')));
const CblockData = Loadable(lazy(() => import('views/utilities/Cblockdata')));

const BblockData = Loadable(lazy(() => import('views/utilities/Bblockdata')));

const Allfilter = Loadable(lazy(() => import('views/InvoiceUpload/InvoiceUpload')));

//Admin Data 



// sample page routing
const ViewInvoice = Loadable(lazy(() => import('views/Invoices')));
const ExcelUpload = Loadable(lazy(() => import('views/Excelupload')));

//footer 
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
   
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'blocks',
      children: [
        {
          path: 'Ablock',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'blocks',
      children: [
        {
          path: 'Bblock',
          element: <BblockData/>
        }
      ]
    },
    {
      path: 'blocks',
      children: [
        {
          path: 'Cblock',
          element: <CblockData/>
        }
      ]
    },
    
    {
      path: 'alldata',
      element: <Allfilter />
    },
    
    {
      path: '/ViewInvoice',
      element: <ViewInvoice/>
    },
   
    {
      path: 'ExcelUpload',
      element: <ExcelUpload />
    },
    
    
  ]
};

export default MainRoutes;
