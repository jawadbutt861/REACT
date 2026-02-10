// Toast utility functions
export const showToast = (message, type = 'info', duration = 4000) => {
  if (window.showToast) {
    return window.showToast(message, type, duration);
  } else {
    // Fallback to alert if toast system isn't loaded
    alert(message);
  }
};

export const showSuccess = (message, duration = 4000) => {
  return showToast(message, 'success', duration);
};

export const showError = (message, duration = 5000) => {
  return showToast(message, 'error', duration);
};

export const showWarning = (message, duration = 4000) => {
  return showToast(message, 'warning', duration);
};

export const showInfo = (message, duration = 4000) => {
  return showToast(message, 'info', duration);
};