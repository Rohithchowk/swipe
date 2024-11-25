// LocalStorageHelper.js
const LocalStorageHelper = {
    saveData: (key, data) => {
      try {
        const jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
        console.log(`Data saved under key: ${key}`);
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
      }
    },
  
    getData: (key) => {
      try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      } catch (error) {
        console.error('Error retrieving data from localStorage:', error);
        return null;
      }
    },
  };
  
  export default LocalStorageHelper;
  