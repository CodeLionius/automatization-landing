import { useEffect, useCallback, useRef, useState } from 'react';
import { performanceMonitor } from '../utils/performance';

// Hook for intersection observer (lazy loading, viewport detection)
export const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      const isIntersecting = entry.isIntersecting;
      setIsVisible(isIntersecting);
      
      if (isIntersecting && !hasBeenVisible) {
        setHasBeenVisible(true);
        performanceMonitor.measureCustom('component_visible', performance.now());
      }
    }, {
      threshold: 0.1,
      ...options
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasBeenVisible, options]);

  return { elementRef, isVisible, hasBeenVisible };
};

// Hook for debounced state updates (performance optimization for frequent updates)
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook for throttled callbacks (performance optimization for scroll, resize events)
export const useThrottle = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T => {
  const lastRun = useRef(Date.now());

  return useCallback(
    ((...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
};

// Hook for measuring component performance
export const useComponentPerformance = (componentName: string) => {
  const renderStartTime = useRef<number>();
  const mountStartTime = useRef<number>();

  useEffect(() => {
    mountStartTime.current = performance.now();
    performanceMonitor.markStart(`${componentName}_mount`);

    return () => {
      if (mountStartTime.current) {
        const mountTime = performance.now() - mountStartTime.current;
        performanceMonitor.measureCustom(`${componentName}_mount_duration`, mountTime);
      }
      performanceMonitor.markEnd(`${componentName}_mount`);
    };
  }, [componentName]);

  const markRenderStart = useCallback(() => {
    renderStartTime.current = performance.now();
    performanceMonitor.markStart(`${componentName}_render`);
  }, [componentName]);

  const markRenderEnd = useCallback(() => {
    if (renderStartTime.current) {
      const renderTime = performance.now() - renderStartTime.current;
      performanceMonitor.measureCustom(`${componentName}_render_duration`, renderTime);
    }
    performanceMonitor.markEnd(`${componentName}_render`);
  }, [componentName]);

  return { markRenderStart, markRenderEnd };
};

// Hook for prefetching resources
export const usePrefetch = (urls: string[], condition: boolean = true) => {
  useEffect(() => {
    if (!condition || typeof window === 'undefined') return;

    const links: HTMLLinkElement[] = [];

    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      links.push(link);
    });

    return () => {
      links.forEach(link => {
        if (link.parentElement) {
          document.head.removeChild(link);
        }
      });
    };
  }, [urls, condition]);
};

// Hook for preloading critical resources
export const usePreload = (
  resources: Array<{ href: string; as: string; type?: string }>
) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const links: HTMLLinkElement[] = [];

    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) {
        link.type = resource.type;
      }
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      links.push(link);
    });

    return () => {
      links.forEach(link => {
        if (link.parentElement) {
          document.head.removeChild(link);
        }
      });
    };
  }, [resources]);
};

// Hook for viewport-based lazy loading
export const useLazyLoad = (threshold = 0.1) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin: '50px'
  });

  useEffect(() => {
    if (isVisible && !shouldLoad) {
      setShouldLoad(true);
    }
  }, [isVisible, shouldLoad]);

  return { elementRef, shouldLoad };
};

// Hook for network status
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    
    // @ts-ignore - connection API is experimental
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
      setConnectionType(connection.effectiveType || 'unknown');
      
      const updateConnectionType = () => {
        setConnectionType(connection.effectiveType || 'unknown');
      };
      
      connection.addEventListener('change', updateConnectionType);
      
      return () => {
        connection.removeEventListener('change', updateConnectionType);
      };
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return { isOnline, connectionType };
};