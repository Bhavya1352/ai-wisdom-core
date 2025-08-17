// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const getPasswordStrength = (password: string): {
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Password should be at least 8 characters long');
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add lowercase letters');
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add uppercase letters');
  }

  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add numbers');
  }

  if (/[@$!%*?&]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add special characters');
  }

  return { score, feedback };
};

// File validation
export const isValidFileType = (filename: string, allowedTypes: string[]): boolean => {
  const extension = filename.split('.').pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
};

export const isValidFileSize = (file: File, maxSizeInMB: number): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

// Search query validation
export const isValidSearchQuery = (query: string): boolean => {
  return query.trim().length >= 2 && query.trim().length <= 500;
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Form validation helpers
export const validateLoginForm = (email: string, password: string): string[] => {
  const errors: string[] = [];

  if (!email) {
    errors.push('Email is required');
  } else if (!isValidEmail(email)) {
    errors.push('Please enter a valid email address');
  }

  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  return errors;
};

export const validateUploadForm = (files: File[]): string[] => {
  const errors: string[] = [];
  const allowedTypes = ['pdf', 'doc', 'docx', 'txt', 'md'];
  const maxSizeInMB = 10;

  if (files.length === 0) {
    errors.push('Please select at least one file');
    return errors;
  }

  files.forEach((file, index) => {
    if (!isValidFileType(file.name, allowedTypes)) {
      errors.push(`File ${index + 1}: Unsupported file type. Please use PDF, DOC, DOCX, TXT, or MD files.`);
    }

    if (!isValidFileSize(file, maxSizeInMB)) {
      errors.push(`File ${index + 1}: File size exceeds ${maxSizeInMB}MB limit.`);
    }
  });

  return errors;
};

// Text validation
export const validateSearchInput = (query: string): string[] => {
  const errors: string[] = [];

  if (!query.trim()) {
    errors.push('Search query cannot be empty');
  } else if (!isValidSearchQuery(query)) {
    errors.push('Search query must be between 2 and 500 characters');
  }

  return errors;
};

// Generic validation helper
export const validateRequired = (value: any, fieldName: string): string[] => {
  const errors: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push(`${fieldName} is required`);
  }

  return errors;
};

export const validateLength = (
  value: string,
  fieldName: string,
  minLength?: number,
  maxLength?: number
): string[] => {
  const errors: string[] = [];

  if (minLength && value.length < minLength) {
    errors.push(`${fieldName} must be at least ${minLength} characters long`);
  }

  if (maxLength && value.length > maxLength) {
    errors.push(`${fieldName} must be no more than ${maxLength} characters long`);
  }

  return errors;
};

export default {
  isValidEmail,
  isValidPassword,
  getPasswordStrength,
  isValidFileType,
  isValidFileSize,
  isValidSearchQuery,
  isValidUrl,
  validateLoginForm,
  validateUploadForm,
  validateSearchInput,
  validateRequired,
  validateLength,
};