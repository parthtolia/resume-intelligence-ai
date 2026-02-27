# Azure Deployment Guide for Resume Intelligence AI

## Required Tools
- Azure CLI
- Docker Desktop
- GitHub account (for actions)

## 1. Backend Deployment (Azure App Service)
We will deploy the FastAPI backend using Docker containers on Azure App Service.

1. **Create an Azure Container Registry (ACR)**
   ```bash
   az acr create --resource-group <resource-group-name> --name <acr-name> --sku Basic
   ```
2. **Login and Push Docker Image**
   ```bash
   az acr login --name <acr-name>
   docker build -t <acr-name>.azurecr.io/resume-ai-backend:v1 ./backend
   docker push <acr-name>.azurecr.io/resume-ai-backend:v1
   ```
3. **Create App Service Plan (Linux)**
   ```bash
   az appservice plan create --name backendPlan --resource-group <resource-group-name> --sku B1 --is-linux
   ```
4. **Create Web App (Container based)**
   ```bash
   az webapp create --resource-group <resource-group-name> --plan backendPlan --name <app-name> --deployment-container-image-name <acr-name>.azurecr.io/resume-ai-backend:v1
   ```
5. **Configure Environment Variables**
   Set your Supabase `DATABASE_URL` in the Azure Portal > App Service > Configuration.

## 2. Frontend Deployment (Azure Static Web Apps)
1. **GitHub Repository**
   Push the `frontend` folder to a GitHub repository.
2. **Create Azure Static Web App**
   - Go to Azure Portal -> Static Web Apps.
   - Click Create, select your GitHub repository.
   - Build Details: Choose `React`.
   - App Location: `/frontend`
   - Output Location: `dist`
3. Azure will automatically create a GitHub Action workflow file in your project `.github/workflows` to build and deploy your React app automatically.
4. **Environment Variables**: Add your backend API endpoint URL to the Static Web App configuration (`VITE_API_URL`).
