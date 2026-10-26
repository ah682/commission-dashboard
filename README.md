# Recruiter commission dashboard

A React 19 and TypeScript dashboard demo with configurable widgets and a progressive commission calculator. Recruitment metrics and leaderboards are sample data. The “API” is an asynchronous local function with a simulated delay; there is no live CRM, authentication, payroll integration or backend.

## Run locally

Use Node.js 24 LTS (minimum 22.12) and npm:

```sh
git clone https://github.com/ah682/commission-dashboard.git
cd commission-dashboard
npm ci
npm run dev
```

Open the localhost URL printed by Vite. `npm run build` creates `dist/`; `npm run preview` previews that build. Keep the development server local.

## Commission contract

Each rate applies only to revenue inside that band:

| Revenue band | Rate |
| --- | ---: |
| £0–£5,000 | 0% |
| £5,000–£10,000 | 10% |
| £10,000–£15,000 | 15% |
| £15,000–£20,000 | 20% |
| Above £20,000 | 25% |

Revenue must be a finite, non-negative number within the supported safe-integer penny range. The engine rounds the input's decimal representation to pennies, rounds each band's commission half-up to a penny, and sums those rounded bands using integer arithmetic. Both dashboard earnings and the simulated API use that engine. This is the demo's explicit rounding policy, not a claim about any employer's payroll policy.

Examples: £18,000 earns £1,850; £50,000 earns £9,750; £5,000.05 earns £0.01. Empty input clears the result. An obsolete asynchronous response cannot restore a result after editing or clearing the input.

## Verify

```sh
npm run lint
npm run test:coverage
npm run build
npm audit --audit-level=high
```

Tests cover hand-calculated tier boundaries, fractional pennies, invalid values, shared API/dashboard results, loading/error states, stale responses, formatting and persisted widget preferences. Coverage is measured on each run and written to `coverage/`; no target percentage is inferred from the number of tests. GitHub Actions runs the commands above on pushes and pull requests.

The 26 October dependency refresh stays within the existing major versions. The known remaining advisory is a moderate build-time denial of service in Tailwind 3's `postcss-selector-parser` dependency ([GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf)). It processes project CSS during builds. Do not feed untrusted selectors to the build pipeline; a Tailwind migration needs its own visual review. No high or critical advisories were reported in the refreshed installation on that date. Recheck with the audit command as advisories change.

## Structure and contributions

`src/utils/commissionEngine.ts` owns validation and monetary arithmetic. `services/commissionService.ts` adapts it to the simulated API; `utils/commissionCalculator.ts` adapts it to the earnings widget. `components/` contains UI, and `contexts/` stores widget preferences in localStorage.

For a calculation bug, report the revenue, expected band breakdown and actual output. Include a regression case when changing the calculation contract. UI changes should preserve keyboard access and be checked at desktop and mobile widths. Dashboard preferences stay in this browser; they are not synced to an account.

## Licence

MIT, as declared by the original project. Third-party libraries and branding retain their own terms.
