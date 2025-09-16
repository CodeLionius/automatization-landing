import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { performanceMonitor } from "./utils/performance";
import { register as registerSW, showUpdateAvailableNotification } from "./utils/serviceWorker";

// Initialize performance monitoring
performanceMonitor.markStart('app_init');

const container = document.getElementById("root");
if (!container) throw new Error('Root container missing in index.html');
const root = createRoot(container);

// Mark app initialization complete
performanceMonitor.markEnd('app_init');
root.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

// Register service worker for caching and offline functionality
if (process.env.NODE_ENV === 'production') {
  registerSW({
    onSuccess: () => {
      console.log('✅ App is now cached and available offline');
    },
    onUpdate: () => {
      console.log('🔄 New version available');
      showUpdateAvailableNotification();
    },
    onOfflineReady: () => {
      console.log('📱 App is ready for offline use');
    }
  });
}
