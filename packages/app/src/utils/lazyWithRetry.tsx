import { lazy, ComponentType } from 'react';
import { logger } from './logger';

/**
 * Creates a lazy-loaded component with retry logic for failed dynamic imports.
 * This helps handle network issues, incorrect base paths, or temporary failures.
 * 
 * @param importFn - Function that returns a dynamic import promise
 * @param retries - Number of retry attempts (default: 3)
 * @param retryDelay - Delay between retries in milliseconds (default: 1000)
 * @returns Lazy-loaded React component
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  retries: number = 3,
  retryDelay: number = 1000
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const module = await importFn();
        return module;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        // Log the error for debugging
        logger.warn(`Dynamic import failed (attempt ${attempt}/${retries}):`, {
          error: lastError.message,
          stack: lastError.stack,
          url: typeof window !== 'undefined' ? window.location.href : 'server-side',
        });

        // If this is the last attempt, throw the error
        if (attempt === retries) {
          // Enhance error message with helpful context
          const enhancedError = new Error(
            `Failed to load module after ${retries} attempts. ` +
            `Original error: ${lastError.message}. ` +
            `This may be due to network issues, incorrect base path configuration, or missing build files. ` +
            `Please check your network connection and try refreshing the page.`
          );
          enhancedError.stack = lastError.stack;
          throw enhancedError;
        }

        // Wait before retrying (exponential backoff)
        const delay = retryDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    // This should never be reached, but TypeScript needs it
    throw lastError || new Error('Failed to load module');
  });
}

