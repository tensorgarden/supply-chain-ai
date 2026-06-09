# Supply Chain AI

**Demand forecasting, quality control monitoring, inventory optimization, and supplier performance analytics** -- an AI-powered supply chain operations console for manufacturing.

## The Problem

Manufacturing supply chains operate with critical blind spots. Demand forecasts live in one spreadsheet, quality inspection results in another, inventory levels in an ERP that updates once daily, and supplier scorecards in someone's email inbox. When a critical component dips below reorder point, the team discovers it when the production line stops -- not when the trend first emerged.

Supplier management is equally fragmented. Performance data -- on-time delivery rates, defect percentages, lead time averages -- is scattered across systems. Teams renew contracts without knowing whether a supplier's quality has been declining for six months. A batch with an 8.6% defect rate from a supposedly "preferred" supplier goes unnoticed until the finished goods start failing in the field.

Quality control is reactive. Inspections happen, but results are filed away. Nobody connects the dots: "Three conditional passes from PolyForm Plastics in the last quarter -- is this a trend?" By the time anyone asks, the pattern has already cost real money in rework, scrap, and delayed shipments.

## What This Dashboard Does

The Supply Chain AI Dashboard brings everything into one pane of glass:

- **Demand forecasting** with 3-month projections, confidence intervals, and trend indicators (up/down/stable) for key products
- **Inventory health grid** showing on-hand quantities, reserved stock, reorder points, and days-until-stockout with color-coded alerts
- **Supplier performance scorecards** ranking 8 suppliers by performance score, on-time delivery rate, quality rating, and lead time
- **Quality control monitoring** with pass/fail/conditional pass rates, defect percentages, batch-level inspection records, and inspector notes
- **Low-stock alert panel** surfacing critical and low-stock items with days-until-stockout, reorder quantities, and supplier lead time context
- **Hero stats** showing products tracked, active suppliers, total inventory value, and forecast accuracy at a glance

## Stack

- **Next.js 15** (App Router) with React 19
- **TypeScript** strict mode
- **Tailwind CSS** with a custom slate/indigo palette
- **Vitest** for unit tests (10 data integrity tests)
- **ESLint** with next/core-web-vitals

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run test       # vitest run
npm run build      # production build
```

## Quality Gates

```bash
npm run lint       # eslint --max-warnings=0
npm run typecheck  # tsc --noEmit
npm run test       # vitest run
npm run build      # next build
```

## Data

All data is fictional demo content. No production keys, no network calls, no real customer or supplier information. Products, suppliers, inventory levels, quality checks, and demand forecasts are generated for portfolio demonstration purposes.

## License

Private portfolio demo -- all rights reserved.
