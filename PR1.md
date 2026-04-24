You are working inside a production codebase. Follow the rules in CLAUDE.md at all times.

Task:
Set up the initial repository foundation for a production-minded web app.

Scope:

- Next.js with TypeScript
- Tailwind
- ESLint and Prettier
- Vitest
- Playwright
- GitHub Actions CI
- strict TypeScript configuration
- .env.example
- a minimal README
- preserve and follow CLAUDE.md

Out of scope:

- auth
- database
- Prisma
- Clerk
- product features
- domain models
- mobile support
- API/business logic beyond what is needed for setup

Step 1 — Scope Restatement
Before writing any code, restate:

- what will be built
- what is out of scope
- what files will likely be touched
- key security considerations
- which parts of CLAUDE.md are most relevant

Do not write code yet.

Step 2 — Scope Control
If this task is too large for a small, focused PR:

- propose the smallest safe implementation slice
- implement only that slice

Step 3 — Implementation
Implement only the scoped task.
Requirements:

- keep changes minimal and focused
- do not add unrelated refactors
- do not add product code
- do not add speculative abstractions
- use the simplest setup that supports future disciplined development

Step 4 — Testing
Add or update the minimum tests needed so the project foundation is verifiable.
Do not skip test setup.

Step 5 — Self Review
Review the work like a principal engineer and fix:

- scope creep
- unnecessary complexity
- missing config
- CI gaps
- unrelated file changes

Step 6 — Out-of-Scope Verification
Before finishing, explicitly confirm:

- no out-of-scope features were added
- no unrelated files were modified
- the change is limited to repo foundation only

Step 7 — Output
Provide:

1. files changed
2. commands run
3. tests/config added
4. short summary
5. any follow-up work for PR 2, but do not implement it
