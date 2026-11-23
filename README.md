# Skylant website and admin dashboard

## Website lead submissions

The website lead form sends its submission to `POST /api/public/leads` on the
dashboard backend. The backend stores the lead in MongoDB, where it appears in
the dashboard's **Leads** page. The dashboard's **Export Excel** action
downloads an Excel-compatible CSV containing the website and campus ambassador
lead details, including ambassador name and referral code.

For local development, run the dashboard backend on port `5001` (the website's
existing email server uses port `5000`) and set
`VITE_API_URL=http://localhost:5001` in
`skylant-tech-website-main/.env`. Restart the website dev server after changing
the Vite environment variable.

For deployment, set the website's `VITE_API_URL` to the public dashboard API
base URL, set the dashboard backend's `CLIENT_URL` to allow the deployed
website and portal origins, and set `PORTAL_URL` to the dashboard frontend
origin used in ambassador referral links. Keep API secrets and database
credentials only in the relevant server environment; do not put them in the
website's Vite environment.

Campus ambassador links continue to use the dashboard's `/r/:referralCode`
registration page. Submissions from that page are saved as attributed leads
with the ambassador name and referral code.
