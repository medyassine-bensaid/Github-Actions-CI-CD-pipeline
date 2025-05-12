# 🚀 DevOps Challenge – React App Deployment

Welcome to the DevOps technical challenge for **Converty**! This challenge is designed to simulate a real-world CI/CD pipeline with security and access controls using a simple React application.

---

## 🧾 Overview

You'll work with a minimal React application and build out Docker support, CI/CD pipelines, and branch protection. You'll also be expected to implement proper secret management and enforce a workflow where **I (the reviewer)** can only contribute via pull requests — without direct access to secrets or deployment controls.

---

## ✅ Instructions

### 1. 📦 Fork & Setup

- Fork this repository.
- Set your forked repo to **private**.
- Invite **`converty-username`** (replace with actual GitHub username) as a **collaborator**.

---

### 2. 🐳 Dockerize the App

- Create a `Dockerfile` that:
  - Builds the React app
  - Serves it using `serve` or `nginx`
- Add a `.dockerignore` to clean up your Docker context.
- **✅ Bonus:** Optimize the image size — it should **not exceed 60MB uncompressed** (you may use multi-stage builds, minimal base images, etc.).

---

### 3. 🔁 CI/CD with GitHub Actions

#### a. **Pull Request Workflow**

Create a workflow in `.github/workflows/pr-check.yml` that runs when pull requests are opened against `main`. It should:

- Install dependencies
- Run `npm run lint`
- Run `npm run test` (include at least 1 dummy test)
- Optionally: run `npm run build`

#### b. **Docker Build & Push**

Create another workflow in `.github/workflows/docker-deploy.yml` that:

- Runs on `push` or `merge` to `main`
- Builds the Docker image
- Pushes it to your **Docker Hub** account
- Uses GitHub Actions secrets to store your Docker credentials

**✅ Bonus:** Add additional testing stages (e.g., integration tests, image vulnerability scans like Trivy, or checking if the container starts correctly using `docker run`).

---

### 4. 🔒 Secure the Repo

Configure the following GitHub protections:

- Enable **branch protection** for `main`:

  - Require pull request reviews before merging
  - Require status checks to pass
  - Prevent force pushes and direct pushes

- Ensure that:
  - I **cannot access or view your secrets**
  - I **cannot push directly** to `main`
  - I **can only open PRs** from a branch

---

## 🧪 How I’ll Test It

Once invited:

1. I will create a branch and open a pull request.
2. I will verify:
   - CI workflow triggers and runs correctly
   - Secrets are secure
   - Main branch protection is enforced
   - Docker image is pushed on merge to main
   - Docker image size is within acceptable range (bonus)
   - Additional test or validation stages exist (bonus)

---

## 🌟 Bonus Points

- Optimize Docker image size (under 60MB uncompressed)
- Add Trivy or similar vulnerability scan
- Include end-to-end or smoke tests
- Add GitHub badges (build status, Docker push)
- Discuss potential scaling strategies or cost optimizations in README
- **Document how to run and develop the app locally (see below)**

---

## 🛠️ Project Setup & Developer Guide (Bonus)

This project is a Vite-based React app (with TypeScript).

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) or [yarn](https://yarnpkg.com/)

### Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Lint the code
npm run lint

# Run unit tests
npm test

# Build for production
npm run build
```
