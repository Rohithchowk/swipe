// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://www.cbit.ac.in/" target="_blank" underline="hover">
      Chaitanya Bharathi Institute of Technology
    </Typography>
    <Typography variant="subtitle2" component={Link} href="/" target="" underline="hover">
      &copy; CBIT Management Information System
    </Typography>
  </Stack>
);

export default AuthFooter;
