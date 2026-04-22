You are contributing to a production-minded web application for youth soccer clubs.

The product helps club admins and coaches:

- create structured training plans
- share training plans with individual coaches or teams
- print training plans for use on the field

## Why this product exists

Youth recreational soccer clubs depend heavily on volunteer coaches who often have limited experience or soccer knowledge.

This creates:

- inconsistent training quality across teams
- poor coordination between head and assistant coaches
- large development gaps between teams and age groups

This product exists to:

- standardize training across a club
- make it easy for coaches to prepare sessions
- improve the overall quality of player development

## Core workflow

The primary user flow is:

1. A club admin or coach creates a structured training plan
2. The plan is shared with individual coaches or entire teams
3. Coaches review the plan before practice
4. Coaches print the plan or bring it to the field
5. (Future) Coaches view plans on a mobile device during sessions

Always optimize for this workflow.

## Users

- Club Admin
- Coach
- Assistant Coach

## MVP goals

- Create training plans
- Edit training plans
- Share training plans to an individual or a team
- View plans shared with the current user
- Print training plans in a clean, field-friendly layout

## Product priorities

Optimize for:

- simplicity for volunteer coaches
- structured, easy-to-follow training plans
- fast and reliable sharing
- clean, readable session layouts
- print-friendly output
- consistency across teams and age groups

Do not optimize for:

- flashy UI
- premature complexity
- speculative features
- over-customization
- non-essential features outside MVP

## Explicitly out of scope (for now)

Do NOT build unless explicitly asked:

- drill animations or diagram engines
- video libraries
- messaging/chat systems
- attendance tracking
- payments or billing
- AI-generated training plans
- offline sync
- native mobile features

## Future direction

This product will be built in two phases:

1. Web application (current focus)
2. Mobile application for viewing training plans

Because of this:

- keep domain logic separate from UI where practical
- prefer reusable validation schemas
- avoid tightly coupling logic to web-only patterns
- design backend logic so it can support mobile clients later
- do not build mobile features yet unless explicitly asked

## Engineering rules

- Keep PRs small and focused on one logical change
- Do not mix unrelated refactors with feature work
- Preserve existing architecture and patterns unless instructed otherwise
- Prefer the simplest secure implementation
- Do not introduce abstractions too early
- Do not add dependencies unless clearly justified

## Security requirements

- Never hardcode secrets, credentials, API keys, or tokens
- Use environment variables for configuration
- Validate all external input with Zod
- Enforce authentication and authorization on the server
- Scope all data access by club/account boundaries
- Never trust client-provided IDs without verifying access
- Do not expose sensitive internal errors to clients
- Do not log secrets, tokens, or sensitive personal data
- Use least-privilege principles for auth and data access

## Auth and authorization rules

- Authentication is handled through Clerk
- Authorization must always be enforced server-side
- UI visibility is not a substitute for server-side authorization
- A user may only access data for clubs and teams they belong to
- Plan access, edit, and share permissions must be checked explicitly

## Architecture guidance

- Keep business logic out of UI components
- Use server-side domain functions where possible
- Separate:
  - domain logic
  - data access
  - authorization
  - presentation
- Prefer reusable modules over duplication
- Avoid burying critical logic inside React components

## Data and domain expectations

Core entities include:

- Club
- User
- ClubMembership
- Team
- TeamMembership
- TrainingPlan
- TrainingBlock
- PlanShare

Sharing rules:

- A plan can be shared to either:
  - one individual user
  - or one team
- It must never point to both at once

## Code quality rules

- Use TypeScript in strict mode
- Prefer clear names over clever code
- Keep functions and components small
- Keep server-only logic out of client components
- Use shared validation schemas where useful
- Fail safely and explicitly
- Keep comments minimal and useful

## Testing requirements

With every meaningful behavior change:

- add or update tests

Expected test mix:

- unit tests for pure logic
- integration tests for auth, authorization, routes, and data access
- e2e tests for critical user journeys

Rules:

- every bug fix should include a regression test where practical
- every auth rule should have test coverage
- do not skip tests to move faster

## Delivery checklist

Before considering work complete:

- run lint
- run typecheck
- run tests
- confirm the build works
- summarize what changed
- note any follow-up work without implementing it unless asked

## PR sizing rules

If a task is too large:

- propose the smallest safe implementation slice
- implement only that slice
- clearly mark what is out of scope

Examples of good PR sizes:

- add typed environment validation
- add initial Prisma schema
- add authorization helpers
- add create-plan form
- add plan sharing flow
- add print-friendly plan view

Examples of bad PR sizes:

- build the entire app in one PR
- combine auth, schema, UI, and features together
- refactor unrelated code during feature work

## Working style

When given a task:

1. Keep scope tightly defined
2. Implement only what is required
3. Consider security implications
4. Add tests alongside the change
5. Avoid unrelated cleanup
6. Summarize tradeoffs briefly

When something is unclear:

- choose the simpler and more secure path
- do not invent new product requirements
- do not expand scope without instruction

## Current stack

- Next.js
- TypeScript
- Tailwind
- Clerk
- Postgres
- Prisma
- Zod
- Vitest
- Playwright
- GitHub Actions

## Product mindset

This is not a generic content tool.

It is an operational product for youth soccer clubs.

Optimize for:

- clarity
- repeatability
- usability under time pressure
- real-world coaching workflows

Build for the field, not for demos.
