// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor';
import GroupsIcon from '@mui/icons-material/Groups';
import RecentActorsIcon from '@mui/icons-material/RecentActors';


// constant
const icons = { IconBrandChrome, IconHelp, LibraryBooksIcon, CameraOutdoorIcon, GroupsIcon, RecentActorsIcon };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const ViewInvoice = {
  id: 'sample-docs-roadmap',
  type: 'group',
  title:'invoices',
  children: [
    {
      id: 'invoices',
      title: 'Invoices-List',
      type: 'item',
      url: '/viewinvoice',
      icon: icons.LibraryBooksIcon,
      breadcrumbs: false
    }
    
  ]
};

export default ViewInvoice;
