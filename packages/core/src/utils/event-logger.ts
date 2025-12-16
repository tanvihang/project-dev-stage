/**
 * Generate a unique ID for playground events
 */
export const generateEventId = (): string => {
  return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format timestamp for display
 */
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};
