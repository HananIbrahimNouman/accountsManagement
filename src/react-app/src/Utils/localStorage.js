export const setLS = (key, value) => {
    localStorage.setItem(key, value);
  };
  
  export const getLS = key => {
    return localStorage.getItem(key);
  };
  