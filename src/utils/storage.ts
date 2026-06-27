export const setStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to storage', error);
  }
};

export const getStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from storage', error);
    return defaultValue;
  }
};

export const removeStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from storage', error);
  }
};
