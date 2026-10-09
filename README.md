# FraudGuard AI · Node.js + React

A financial transaction risk-analysis portfolio demo. Entire inference stack implemented in JavaScript: **Node.js API, trained logistic-regression classifier, and React frontend**. No Python or FastAPI needed.

## Run on macOS

```bash
node --version    # Requires Node.js 20+
npm install
npm run dev
```

Open **http://localhost:5173**. Vite proxies `/api` to Node.js on port 4000. Stop the old Python/Uvicorn terminal with Control+C if it is still running; this project does not use it.

## Production-like local test

```bash
npm run build
npm start
```

Open **http://localhost:4000**. Build `dist/` before running production or deploying.

## Main features

- Overview dashboard and sample transaction risk distribution
- One-transaction analysis with risk score and contextual indicators
- CSV batch scoring up to 5,000 rows and CSV export
- Model insights and portfolio information
- Model training in JavaScript: `npm run train`

## API routes

- `GET /api/health`
- `GET /api/demo`
- `GET /api/model`
- `POST /api/predict` JSON body with transaction fields
- `POST /api/batch` JSON body `{ "csv": "transaction_id,transaction_type,..." }`

## Data requirements

`transaction_type`, `amount`, `available_balance`, `avg_amount_30d`, `account_age_days`, `device_age_days`, `txns_last_hour`, `failed_logins_24h`, `hour`, `is_international`, `new_beneficiary`.

## Model details

The logistic regression model is **trained on simulated labeled records**, with JavaScript gradient-descent code in `scripts/train.mjs`. It is a technical demonstration, **not a model trained on real observed fraud**. The percentages are model scores, not verified probabilities of financial crime. Contextual indicator tags are not feature attribution. Do not claim that real bank datasets were used or that the system is production compliant.

## Deployment

- Commit this project to GitHub.
- On Render, create a Node web service with build command `npm install && npm run build` and start command `npm start`.
- Set `NODE_ENV=production`; Render provides `PORT`.
- Deploy using a current Node LTS runtime.

## Security notes

Not for real customer data. No authentication or persistent audit logging is included. The CSV endpoint has 5000-record limit and ~3MB request limit. Demo transactions are synthetic.
