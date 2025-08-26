# effectivesoft-login

A minimal **Email/Password Sign-In** example built with **React + Vite + TypeScript**.  
Form validation shows errors only after user interaction (touched/blur or submit). API calls use **JSONPlaceholder** to simulate a real network round-trip.

**Live Demo:** https://sameermanjrekar.github.io/effectivesoft-login/

---

## Tech Stack

- React 18 + TypeScript
- Vite
- CSS (single `App.css` file;)
- JSONPlaceholder (POST echo) for mock server

---

## Features

- Single component: `Login.tsx`
- Email + Password with **Show/Hide** toggle (toggle below the input)
- **Validation errors only when touched/submitted**
- Red outline for invalid inputs; light inputs for readability

---

## Quick Start

```bash
# install
npm i

# run locally
npm run dev

# build
npm run build

# preview local production build
npm run preview
