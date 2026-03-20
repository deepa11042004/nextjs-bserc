// lib/validation.ts

export interface FileValidationOptions {
  allowedTypes: string[];
  maxSizeMB: number;
  minFiles?: number;
  maxFiles?: number;
}

export function validateFile(
  file: File | null | undefined,
  options: FileValidationOptions
): {
  valid: boolean;
  error?: string;
  warnings?: string[];
} {
  const { allowedTypes, maxSizeMB, minFiles = 0, maxFiles = 1 } = options;
  const warnings: string[] = [];
  
  // Handle optional files
  if (!file) {
    if (minFiles > 0) {
      return { valid: false, error: "File is required" };
    }
    return { valid: true };
  }
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${allowedTypes.join(", ")}`,
    };
  }
  
  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${maxSizeMB}MB`,
    };
  }
  
  // Warning for very small files
  if (file.size < 1024) {
    warnings.push("File is very small (< 1KB)");
  }
  
  return { valid: true, warnings };
}

export function validateFileList(
  files: FileList | null | undefined,
  options: FileValidationOptions
): {
  valid: boolean;
  error?: string;
  warnings?: string[];
} {
  if (!files || files.length === 0) {
    if (options.minFiles && options.minFiles > 0) {
      return { valid: false, error: "At least one file is required" };
    }
    return { valid: true };
  }
  
  if (options.maxFiles && files.length > options.maxFiles) {
    return {
      valid: false,
      error: `Maximum ${options.maxFiles} file(s) allowed`,
    };
  }
  
  // Validate each file
  for (let i = 0; i < files.length; i++) {
    const result = validateFile(files[i], options);
    if (!result.valid) {
      return result;
    }
  }
  
  return { valid: true };
}