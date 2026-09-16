# Perfect Science Academy Certificate Studio

The Certificate Studio is available at `/admin/login`. It is intentionally locked until administrator environment variables are configured.

## Temporary administrator access

Set these variables locally and in the Vercel project:

```text
PSA_ADMIN_PASSWORD=<a unique password with at least 12 characters>
PSA_SESSION_SECRET=<a random secret with at least 32 characters>
```

Generate a strong session secret locally:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

Never commit the real values. Never share the password, session secret, database password, or a Supabase service-role key in chat.

## Current capabilities

- Create and edit position-holder certificates.
- Automatically generate certificate IDs by year and class.
- Calculate percentages from obtained and total marks.
- Store drafts in the administrator's current browser.
- Import a complete class from CSV.
- Search, edit, and delete local drafts.
- Print one certificate or all saved certificates to A4 landscape PDF.
- Export a JSON backup of local drafts.

Local drafts are deliberately marked as unpublished and do not appear in public certificate verification.

## CSV columns

Use the downloadable template in the dashboard. Supported columns are:

```text
student_name,class,position,exam,session,marks,total_marks,percentage,issue_date,issuer,remarks
```

## Supabase phase

When Supabase is connected, local draft storage will be replaced by authenticated database storage. Publishing a reviewed certificate will create its permanent public verification record. Until that phase, the dashboard cannot mark new certificates as verified.
