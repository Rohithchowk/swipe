
export const isAdmin = () => {
    // Get the user role from localStorage
    const userRole = localStorage.getItem('role');
    console.log('User role:', userRole);
    
    // Check if the user role is 'admin'
    return userRole === 'admin';
  };




