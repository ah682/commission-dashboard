# Recruiter Commission Dashboard

A modern dashboard application for recruitment professionals to track performance metrics and calculate commission earnings.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

---

## Overview

A React-based dashboard showcasing recruiter performance metrics with an interactive commission calculator. Built with TypeScript, Vite, and styled with Tailwind CSS + DaisyUI.

---

## Features

- **Monthly & Quarterly Targets** - Track calls, jobs, CVs, interviews, and revenue with progress gauges
- **Conversion Ratios** - Analyze interview-to-placement and job-to-placement metrics
- **Commission Calculator** - Progressive 5-band commission structure (0%, 10%, 15%, 20%, 25%)
- **Real-time Earnings** - Live commission calculation based on current revenue
- **Leaderboards** - Team rankings with YTD placements and President's Club views
- **Customizable Widgets** - Show/hide sections and cards, preferences saved to localStorage
- **Business Development Tracking** - Monitor meetings, calls, emails, and activities

---

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **DaisyUI** - Component library
- **React Router** - Routing
- **Vitest** - Testing

---

## Installation
```bash
# Clone repository
git clone 
cd recruiter-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Opens at `http://localhost:5173`

---

## Development
```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Testing
npm run test            # Run tests
npm run test:coverage   # Run tests with coverage

# Linting
npm run lint            # Check code quality
```

---

## Project Structure
```
src/
├── components/         # React components
├── contexts/          # React context (widget config)
├── hooks/             # Custom hooks
├── pages/             # Page components
├── types/             # TypeScript types
├── utils/             # Helper functions
└── App.tsx            # Root component
```

---

## Commission Structure

Progressive commission bands similar to tax brackets:

| Revenue Range | Rate | Example |
|--------------|------|---------|
| £0 - £5k | 0% | £0 |
| £5k - £10k | 10% | £500 |
| £10k - £15k | 15% | £750 |
| £15k - £20k | 20% | £1,000 |
| £20k+ | 25% | Variable |

**Example:** £18,000 revenue = £1,850 commission (10.28% effective rate)

---

## Customization

Users can customize their dashboard:
- Click ⋮ on any section to show/hide individual cards
- Click "Widgets" button in header for full configuration
- Preferences automatically saved to localStorage

---

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Or** connect your Git repository at [vercel.com](https://vercel.com) for automatic deployments.

### Build Settings
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

---

## Testing

Test suite includes:
- Commission calculator utility tests
- Formatter utility tests  
- Widget configuration context tests
- Component integration tests

Coverage: ~90%

---

## 📝 License

MIT License

---

## 🔗 Links

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [DaisyUI](https://daisyui.com)

---

**Built with React, TypeScript, and Tailwind CSS**