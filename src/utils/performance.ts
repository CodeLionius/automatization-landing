import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';
import React from 'react';

// Performance monitoring and reporting
interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private readonly isProduction = process.env.NODE_ENV === 'production';

  constructor() {
    if (this.isProduction && typeof window !== 'undefined') {
      this.initWebVitals();
    }
  }

  private initWebVitals() {
    // Core Web Vitals
    onCLS(this.onVitalMetric.bind(this));
    onINP(this.onVitalMetric.bind(this));
    onFCP(this.onVitalMetric.bind(this));
    onLCP(this.onVitalMetric.bind(this));
    onTTFB(this.onVitalMetric.bind(this));
  }

  private onVitalMetric(metric: any) {
    const performanceMetric: PerformanceMetric = {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      timestamp: Date.now()
    };

    this.metrics.push(performanceMetric);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Performance Metric:', performanceMetric);
    }

    // Send to analytics in production
    if (this.isProduction) {
      this.sendToAnalytics(performanceMetric);
    }
  }

  private sendToAnalytics(metric: PerformanceMetric) {
    // Example: Send to Google Analytics, Datadog, or custom endpoint
    // @ts-ignore - gtag is global when GA is loaded
    if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
      // @ts-ignore
      (window as any).gtag('event', metric.name, {
        custom_parameter_1: metric.value,
        custom_parameter_2: metric.rating
      });
    }

    // Custom analytics endpoint (replace with your actual endpoint)
    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      const body = JSON.stringify({
        metric: metric.name,
        value: metric.value,
        rating: metric.rating,
        url: window.location.href,
        timestamp: metric.timestamp,
        userAgent: navigator.userAgent
      });

      // navigator.sendBeacon('/api/performance', body);
    }
  }

  // Method to get current performance metrics
  public getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  // Method to measure custom performance marks
  public measureCustom(name: string, startTime?: number): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const endTime = performance.now();
      const value = startTime ? endTime - startTime : endTime;
      
      this.onVitalMetric({
        name: `custom_${name}`,
        value,
        rating: value < 100 ? 'good' : value < 300 ? 'needs-improvement' : 'poor'
      });
    }
  }

  // Method to mark the start of a custom measurement
  public markStart(name: string): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${name}_start`);
    }
  }

  // Method to mark the end of a custom measurement
  public markEnd(name: string): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${name}_end`);
      performance.measure(name, `${name}_start`, `${name}_end`);
      
      const measures = performance.getEntriesByName(name);
      if (measures.length > 0) {
        const measure = measures[measures.length - 1];
        this.measureCustom(name, measure.startTime);
      }
    }
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Utility function to measure component render time (simplified)
export const withPerformanceTracking = (componentName: string) => {
  return <P extends object>(Component: React.ComponentType<P>) => {
    const WrappedComponent = (props: P) => {
      React.useEffect(() => {
        performanceMonitor.markStart(`${componentName}_render`);
        return () => {
          performanceMonitor.markEnd(`${componentName}_render`);
        };
      });

      return React.createElement(Component, props);
    };
    
    WrappedComponent.displayName = `withPerformanceTracking(${Component.displayName || Component.name})`;
    return React.memo(WrappedComponent);
  };
};

// Performance hook for components
export const usePerformanceTracking = (componentName: string) => {
  React.useEffect(() => {
    const startTime = performance.now();
    performanceMonitor.markStart(`${componentName}_mount`);
    
    return () => {
      performanceMonitor.markEnd(`${componentName}_mount`);
      performanceMonitor.measureCustom(`${componentName}_lifecycle`, startTime);
    };
  }, [componentName]);
};