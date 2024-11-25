// assets
import { IconTypography, IconPalette, IconShadow } from '@tabler/icons-react';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import ScienceIcon from '@mui/icons-material/Science';
import StorageIcon from '@mui/icons-material/Storage';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { isAdmin } from './isadmin';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  CorporateFareIcon,
  ScienceIcon,
  StorageIcon,
  UploadFileIcon,
  AlignHorizontalLeftIcon,
  ReceiptIcon,
  PeopleAltIcon,
  ShoppingCartIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  type: 'group',
  title: 'Blocks',
  
  children: [
    {
      id: 'Alldata',
      title: 'Upload Invoice',
      type: 'item',
      url: '/alldata',
      icon: UploadFileIcon,
      breadcrumbs: false
    },
    // {
    //   id: 'admin-bulkupload',
    //   title: 'Bulk Upload',
    //   type: 'item',
    //   url: '/bulkupload',
    //   icon: DriveFolderUploadIcon,
    //   breadcrumbs: false
    // },
    {
      id: 'blocks',
      title: 'Sections',
      type: 'collapse',
      icon: icons.AlignHorizontalLeftIcon,
      children: [
        {
          id: 'block-a',
          title: 'Invoices',
          type: 'item',
          icon:icons.ReceiptIcon,
          url: '/blocks/Ablock',
          breadcrumbs: false,
        },
        {
          id: 'block-b',
          title: 'Customers',
          type: 'item',
          icon:icons.PeopleAltIcon,
          url: '/blocks/Bblock',
          breadcrumbs: false,
          
        },
        {
          id: 'block-c',
          title: 'Products',
          type: 'item',
          icon:icons.ShoppingCartIcon,
          url: '/blocks/Cblock',
          breadcrumbs: false,
          
        }
      ]
    },
    
  ],
  breadcrumbs: 'false',
  
};




export default utilities;