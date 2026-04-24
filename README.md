# SessionBoard

Training plan management for youth soccer clubs.

## Overview

SessionBoard helps club admins and volunteer coaches create, share, and print structured training plans for youth recreational soccer teams.

## Getting Started

### Prerequisites

- Node.js 18.17 or higher
- npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run test` - Run unit tests with Vitest
- `npm run test:e2e` - Run E2E tests with Playwright
- `npm run format` - Format code with Prettier

## Project Structure

```
sessionBoard/
├── app/              # Next.js App Router pages and layouts
├── components/       # Reusable React components (to be added)
├── lib/              # Utility functions and shared logic
├── e2e/              # Playwright E2E tests
├── .github/          # GitHub Actions workflows
└── public/           # Static assets
```

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Testing:** Vitest (unit/integration), Playwright (E2E)
- **CI/CD:** GitHub Actions
- **Code Quality:** ESLint, Prettier

## Contributing

See `claude.md` for contribution guidelines and coding standards.

## License

Private project for youth soccer club use.
