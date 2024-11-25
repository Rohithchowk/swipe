// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';
import SportsIcon from '@mui/icons-material/Sports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

// constant
const icons = {
  EmojiEventsIcon,
  InsertDriveFileIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Edit-XcelSheets',
  type: 'group',
  children: [
    {
      id: 'xcel',
      title: 'Excel Upload',
      type: 'item',
      url: '/excelupload',
      icon: icons.InsertDriveFileIcon,
      breadcrumbs: false
    },
    
  ]
};

export default utilities;
