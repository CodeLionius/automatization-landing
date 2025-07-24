# AI Automatization Landing Page

A modern, responsive landing page for an AI automation service, built with React and TypeScript. This project is designed to showcase features, collect user feedback, and provide a professional web presence for AI-driven business solutions.

## Features
- Responsive design (mobile & desktop)
- Multi-language support (English & Lithuanian)
- Modern UI with Tailwind CSS
- Feedback/contact form integration (Tally) with robust reloading (always visible when navigating)
- Interactive tools (ROI, AI Automation Value) in both EN and LT
- Easy deployment to Vercel, Netlify, or GitHub Pages
- Unit tests with React Testing Library

## App Architecture & Logic
- **App.tsx** is the main entry point, handling routing, language switching, and state for privacy/calculator modals.
- **Navigation**: All main sections (Home, Features, Contact Us, Tools) are accessible from the header and mobile menu. Language can be switched at any time.
- **Tally Feedback Form**: The contact form is embedded via iframe and is always reloaded when navigating to the feedback section, ensuring it is never blank or stuck (even after switching sections or languages).
- **Tools**: Two tools (ROI and AI Automation Value) are available in both English and Lithuanian. The correct version is shown based on language and user selection.
- **Localization**: All UI text is managed via a single translations file. Adding new languages is straightforward.
- **Footer**: Contains company info, privacy policy, and quick links (no calculator link).

## Getting Started

### Prerequisites
- Node.js (v16 or later recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
Start the development server:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Running Tests
Run the test suite:
```bash
npm test
```

## Deployment
You can deploy this project for free using:
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

### Example: Deploy to Vercel
1. Push your code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
3. Import your repository and follow the prompts (build command: `npm run build`, output directory: `build`).
4. Click "Deploy" and get your live site URL.

## Project Structure
```
├── public/
│   └── tools/           # Standalone HTML tools (EN/LT)
├── src/
│   ├── components/
│   │   └── sections/         # Main page sections (Hero, Features, CTA, Footer, etc.)
│   ├── constants/
│   ├── lib/
│   ├── locales/              # translations.ts (all UI text)
│   ├── types/
│   ├── App.tsx               # Main app logic
│   ├── App.test.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## License
This project is licensed under the MIT License. 