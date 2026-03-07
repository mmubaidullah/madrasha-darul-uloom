// Safe localStorage utilities

export function getStorageItem(key, defaultValue = null) {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  
  try {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    
    // Try to parse as JSON first
    try {
      return JSON.parse(item);
    } catch (parseError) {
      // If JSON parsing fails, return the raw string
      return item;
    }
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function setStorageItem(key, value) {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    if (value === null || value === undefined) {
      window.localStorage.removeItem(key);
      return true;
    }
    
    // If it's already a string and looks like a token, store as-is
    if (typeof value === 'string' && (
      value.startsWith('eyJ') || // JWT token
      value.startsWith('demo-') || // Demo token
      value.length > 50 // Long string likely to be a token
    )) {
      window.localStorage.setItem(key, value);
    } else {
      // Otherwise, JSON stringify
      window.localStorage.setItem(key, JSON.stringify(value));
    }
    
    return true;
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
    return false;
  }
}

export function removeStorageItem(key) {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
    return false;
  }
}

export function clearStorage() {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    window.localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}

// Auth-specific utilities
export function getAuthToken() {
  return getStorageItem('auth_token');
}

export function setAuthToken(token) {
  return setStorageItem('auth_token', token);
}

export function getUserData() {
  return getStorageItem('user_data');
}

export function setUserData(userData) {
  return setStorageItem('user_data', userData);
}

export function clearAuthData() {
  removeStorageItem('auth_token');
  removeStorageItem('user_data');
  return true;
}