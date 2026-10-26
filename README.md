# Recruiter Commission Dashboard

A dashboard for recruiter targets, activity, conversion ratios and commission earnings, built with React 19, TypeScript, Vite and Tailwind CSS.

Monthly and quarterly widgets show calls, jobs, CVs, interviews and revenue. Team leaderboards include placements and President's Club rankings. Use the **Widgets** button or a section's **⋮** menu to choose what appears; your preferences are saved in this browser.

The dashboard uses sample recruitment data and a local service that simulates an API response. The commission calculator works with the revenue you enter.

## Run locally

Use Node.js 24 LTS (minimum 22.12) and npm:

```sh
git clone https://github.com/ah682/commission-dashboard.git
cd commission-dashboard
npm ci
npm run dev
```

Open the localhost URL printed by Vite. `npm run build` creates `dist/`; `npm run preview` previews that build.

## How commission is calculated

Each rate applies only to revenue inside that band:

| Revenue band | Rate |
| --- | ---: |
| £0–£5,000 | 0% |
| £5,000–£10,000 | 10% |
| £10,000–£15,000 | 15% |
| £15,000–£20,000 | 20% |
| Above £20,000 | 25% |

Revenue must be a finite, non-negative number within the supported safe-integer penny range. The engine rounds revenue to pennies, rounds each band's commission half-up to a penny, then adds the rounded bands using integer arithmetic. Dashboard earnings and the simulated API use the same calculation.

For example, £18,000 earns £1,850; £50,000 earns £9,750; £5,000.05 earns £0.01. Clearing the input clears the result, and responses from earlier calculations are ignored after you edit it.

## Development checks

```sh
npm run lint
npm run test:coverage
npm run build
npm audit --audit-level=high
```

Tests cover band boundaries, fractional pennies, invalid values, shared API/dashboard results, loading and error states, stale responses, formatting and saved widget preferences. Coverage reports are written to `coverage/`. GitHub Actions runs the commands above on pushes and pull requests.

The 26 October 2026 dependency audit found no high or critical advisories. A moderate build-time denial-of-service advisory remains in Tailwind 3's `postcss-selector-parser` dependency ([GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf)); keep untrusted CSS selectors out of the build pipeline. Run the audit command to check the latest status.

## Structure and contributions

`src/utils/commissionEngine.ts` owns validation and monetary arithmetic. `src/services/commissionService.ts` adapts it to the simulated API; `src/utils/commissionCalculator.ts` adapts it to the earnings widget. UI components live in `src/components/`, and `src/contexts/` stores widget preferences in localStorage.

For a calculation bug, report the revenue, expected band breakdown and actual output. Include a regression case when changing the calculation. Check UI changes with a keyboard and at desktop and mobile widths.

## Licence

MIT, as declared by the original project. Third-party libraries and branding retain their own terms.
