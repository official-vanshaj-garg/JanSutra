# Secret Manager Deployment Guide

To deploy JanSutra to Google Cloud Run while keeping the Gemini API key perfectly secure, we recommend using Google Cloud Secret Manager instead of plaintext environment variables.

### 1. Enable Secret Manager API
Ensure the Secret Manager API is enabled in your Google Cloud Project:
```bash
gcloud services enable secretmanager.googleapis.com
```

### 2. Create the Secret
Create a new secret named `GEMINI_API_KEY`:
```bash
echo -n "your_actual_gemini_api_key_here" | gcloud secrets create GEMINI_API_KEY --data-file=-
```

### 3. Grant Cloud Run Access
The default compute service account needs permission to access this secret. First, find your project number, then grant the `Secret Accessor` role:
```bash
PROJECT_NUMBER=$(gcloud projects describe YOUR_PROJECT_ID --format="value(projectNumber)")

gcloud secrets add-iam-policy-binding GEMINI_API_KEY \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

### 4. Deploy using the Secret
Instead of using `--set-env-vars`, use `--set-secrets` when deploying to Cloud Run. This mounts the secret securely as an environment variable (`GEMINI_API_KEY`) inside the container at runtime.
```bash
gcloud run deploy jansutra \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-secrets="GEMINI_API_KEY=GEMINI_API_KEY:latest"
```

**Note**: For local development, JanSutra securely uses `dotenv` to load the `.env` file from the `server/` directory. You do not need to configure Secret Manager or Google Cloud credentials to run the app locally on your machine.
