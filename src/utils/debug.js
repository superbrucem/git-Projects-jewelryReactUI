// Debug utility for the application
// Set DEBUG_MODE to true to enable debug features

export const DEBUG_MODE = process.env.NODE_ENV === 'development';

// Debug logger that only logs in development mode
export const debugLog = (...args) => {
  if (DEBUG_MODE) {
    console.log('[DEBUG]', ...args);
  }
};

// Helper to measure component render time
export const measurePerformance = (label, callback) => {
  if (!DEBUG_MODE) {
    return callback();
  }

  console.time(`[PERF] ${label}`);
  const result = callback();
  console.timeEnd(`[PERF] ${label}`);
  return result;
};
