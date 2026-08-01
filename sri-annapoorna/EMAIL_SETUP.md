# Email Setup — Franchise Enquiry Form

The franchise enquiry form uses **Web3Forms** — a free service that
sends real emails with zero backend configuration.

## Activate in 3 Steps

### Step 1 — Get your free access key
1. Go to → **https://web3forms.com**
2. Type in the email: `worklancers.support@gmail.com`
3. Click **"Create Access Key"**
4. Copy the key that appears (looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### Step 2 — Add the key to your project
Open the file `.env` in the project root and replace the placeholder:

```
VITE_WEB3FORMS_KEY=paste_your_key_here
```

### Step 3 — Restart the dev server
```bash
npm run dev
```

That's it. Submit the form — the email arrives at `worklancers.support@gmail.com`.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Email goes to spam | Open the first email, click "Not Spam" — all future emails will land in inbox |
| "Access key" error in console | Key is wrong or still placeholder — redo Step 1 |
| Form shows success but no email | Check spam folder first. Wait 2–3 minutes |
| CORS error | Web3Forms is a public API, no CORS issues expected — check network tab |

## Email Format Received

```
Subject: New Franchise Enquiry — [Name] ([City])

New Franchise Enquiry
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name             : Arjun Kumar
Phone            : 9876543210
Email            : arjun@example.com
City             : Bangalore
Investment Budget: ₹10 Lakh – ₹20 Lakh

Message:
I am interested in opening a franchise in Koramangala area.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted At: 12 July 2026, 02:30 PM
Source: Sri Annapoorna Website — Franchise Enquiry Form
```

Replies go directly to the enquirer's email address.
