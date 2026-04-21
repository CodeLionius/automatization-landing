# Security Guide

## Overview
This document outlines the security measures implemented in the LandingPage-AI_Automatization project and provides guidelines for secure deployment and maintenance.

## Current Security Status (Audit 2026)
- **Vulnerabilities**: 0 (Full resolution of all identified high-severity deep dependencies).
- **Hardening Level**: Advanced (includes environment-level and application-level protection).

## Security Measures Implemented

### 1. Content Security Policy (CSP)
- Tightened policy implemented in both `public/index.html` and Nginx configuration.
- Restricted directives: `object-src 'none'`, `base-uri 'self'`, `form-action 'self' https://tally.so`.
- Prevents cross-site scripting (XSS), data-jacking, and injection attacks.

### 2. Hardened Production Environment (Docker)
- **Non-Root Execution**: The production Nginx server runs as a non-privileged `appuser`.
- **Restricted Ports**: Internal service runs on port `8080` (non-standard for additional obfuscation and rootless compatibility).
- **Advanced Headers**: Every response includes:
    - `Strict-Transport-Security` (HSTS)
    - `Cross-Origin-Opener-Policy` (COOP)
    - `Cross-Origin-Resource-Policy` (CORP)
    - `Permissions-Policy` (disabling Camera, Microphone, Geolocation)

### 3. Calculator Tool Security (Defense in Depth)
- **Safe Rendering**: Interactive tools in `public/tools/` have been refactored to use `textContent` and DOM manipulation instead of `innerHTML`.
- **LocalStorage Sanitization**: Evaluation history retrieved from browser storage is treated as untrusted and safely rendered to prevent persistent XSS.
- **Input Limits**: Strict character counts and type validation for all task descriptions.

### 4. Dependency Management
- **Security Overrides**: Critical patches for deep dependencies (e.g., `lodash`, `serialize-javascript`) are enforced via `overrides` in `package.json`.
- **Compatibility**: Build pipeline uses `--experimental-global-webcrypto` to ensure consistent security across different Node.js versions.

### 5. Error Handling & Privacy
- **Source Map Protection**: Production source maps are disabled (`GENERATE_SOURCEMAP=false`) to prevent reverse engineering.
- **Secret Management**: Sensitive configuration files (e.g., `.env.production`) are untracked and excluded via `.gitignore`.

## Deployment Security Checklist

### Pre-Deployment
- [x] Verify dependency status: `npm audit` (must be 0)
- [x] Test CSP against Tally/Cal.com widgets
- [x] Ensure non-root user is configured in `Dockerfile`

### Production Configuration
- [x] Ensure `8080` is the exposed port in infrastructure
- [x] Verify HSTS "preload" requirements if applicable
- [ ] Configure TLS (SSL) at the Load Balancer/Proxy level

## Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Nginx Security Guide](https://www.nginx.com/blog/tuning-optimizing-nginx-security/)
- [React Security Best Practices](https://snyk.io/blog/10-react-security-best-practices/)

Last Updated: April 2026