# React App with Docker & CI/CD Pipeline

![Build Status](https://img.shields.io/github/actions/workflow/status/medyassinebensaid/react-app/ci.yml?branch=main&label=CI)
![Deployment Status](https://img.shields.io/github/actions/workflow/status/medyassinebensaid/react-app/cd.yml?branch=main&label=CD)
![Docker Pulls](https://img.shields.io/docker/pulls/medyassinebensaid/react-app)
![GitHub last commit](https://img.shields.io/github/last-commit/medyassinebensaid/react-app)
![License](https://img.shields.io/github/license/medyassinebensaid/react-app)

This repository contains a React application with a complete Docker setup and GitHub Actions CI/CD pipeline. The project demonstrates best practices for containerization and automated workflows for testing, building, and deploying a React application.

## 📋 Table of Contents

- [Pipeline Success](#pipeline-success)
- [User Guide: Using the Pipeline](#user-guide-using-the-pipeline)
- [Development Setup](#development-setup)
- [Docker Configuration](#docker-configuration)
- [CI/CD Workflow](#cicd-workflow)
- [Best Practices Explained](#best-practices-explained)
- [Scaling Strategies & Cost Optimization](#scaling-strategies--cost-optimization)
- [Contributing](#contributing)

## 🚀 Pipeline Success

Our CI/CD pipeline is successfully operational, as evidenced by the following screenshots:

### Docker Images Successfully Built and Tagged

![image](https://github.com/user-attachments/assets/c5e92403-57ad-4c30-bd1a-6d4408ffa8a6)

This screenshot shows the Docker images successfully built and tagged with various version identifiers including commit SHA (`d0b05cd`), `latest`, and branch name tags.

### GitHub Actions Workflow Success

![image](https://github.com/user-attachments/assets/6f11736a-9914-43df-86d2-99287afbfb29)

This screenshot displays the successful execution of our CD pipeline, showing the Security Scan and Build and Push Docker Image steps completing in 3m 31s.

## 👩‍💻 User Guide: Using the Pipeline

### For Developers

1. **Making Changes**:
   - Create a feature branch from `main`:
     ```bash
     git checkout -b feature/your-feature-name
     ```
   - Make your changes
   - Commit and push:
     ```bash
     git add .
     git commit -m "Description of your changes"
     git push -u origin feature/your-feature-name
     ```

2. **Opening a Pull Request**:
   - Go to the GitHub repository
   - Create a new pull request from your feature branch to `main`
   - The CI pipeline will automatically run, checking:
     - Linting
     - Tests
     - Build verification

3. **Reviewing Pipeline Results**:
   - Check the "Checks" tab in your PR to see CI pipeline status
   - Fix any issues if checks fail
   - Request a review when all checks pass

### For Maintainers

1. **Reviewing and Merging PRs**:
   - Ensure all CI checks pass
   - Review the code changes
   - Approve and merge the PR

2. **After Merging**:
   - The CD pipeline automatically triggers
   - It will:
     - Run security scans
     - Build a new Docker image
     - Push to Docker Hub with appropriate tags
     - Deploy (if deployment steps are configured)

3. **Monitoring Deployments**:
   - Go to the "Actions" tab in GitHub
   - Check the CD workflow for the latest deployment status

### Triggering Manual Deployments

Both CI and CD workflows support manual triggering:

1. Go to the "Actions" tab in GitHub
2. Select either "CI" or "CD" workflow
3. Click "Run workflow" dropdown
4. Select the branch
5. Click "Run workflow"

## 💻 Development Setup

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Docker and Docker Compose (for containerized development)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/medyassinebensaid/react-app.git
   cd react-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (default Vite port)

### Running with Docker (locally)

1. **Build and run using Docker**:
   ```bash
   docker build -t react-app:local .
   docker run -p 8080:80 react-app:local
   ```
   Access the application at `http://localhost:8080`

2. **Using Docker Compose**:
   ```bash
   docker-compose up --build
   ```
   Access the application at `http://localhost:8080`

## 🐳 Docker Configuration

### Docker Setup Overview

The project uses a multi-stage Docker build process:

1. **Build Stage**:
   - Uses Node.js Alpine image for a smaller footprint
   - Installs dependencies and builds the React app

2. **Production Stage**:
   - Uses Nginx Alpine for serving the built static files
   - Configured with health checks for container monitoring

### Key Files

- **`Dockerfile`**: Multi-stage build configuration
- **`.dockerignore`**: Excludes unnecessary files from the Docker context
- **`docker-compose.yml`**: Local development and testing setup

## 🔄 CI/CD Workflow

### Workflow Overview

The CI/CD pipeline consists of two main workflows:

1. **CI Workflow** (`ci.yml`) - Triggered on pull requests:
   - Lint: Ensures code quality and adherence to style guidelines
   - Test: Runs unit and integration tests
   - Build: Verifies the application builds successfully

2. **CD Workflow** (`cd.yml`) - Triggered on merges to main:
   - Security Scan: Analyzes for vulnerabilities
   - Build and Push: Creates and publishes Docker images

### CI Process Flow

```
┌─────────┐     ┌─────────┐     ┌─────────┐
│  Lint   │ ──▶ │  Test   │ ──▶ │  Build  │
└─────────┘     └─────────┘     └─────────┘
```

### CD Process Flow

```
┌───────────────┐     ┌─────────────────────┐
│ Security Scan │ ──▶ │ Build & Push Docker │
└───────────────┘     └─────────────────────┘
```

## 🏆 Best Practices Explained

### Docker Best Practices

1. **Multi-stage builds**:
   - Reduces final image size by up to 75%
   - Separates build environment from runtime environment
   - Enhances security by minimizing attack surface

2. **Alpine-based images**:
   - Significantly smaller than standard images
   - Reduced attack surface with fewer installed packages
   - Faster download and startup times

3. **.dockerignore file**:
   - Prevents unnecessary files from bloating the Docker context
   - Improves build performance
   - Reduces risk of including sensitive data

4. **Health checks**:
   - Enables Docker to monitor container health
   - Facilitates automatic restarts when needed

### CI/CD Best Practices

1. **Pre-built GitHub Actions vs. Custom Shell Commands**:
   - **Why pre-built actions are superior to direct commands** (`docker run`, `docker-compose`, etc.):
     - Abstraction of complex functionality into reusable components
     - Version-controlled dependencies with predictable behavior
     - Platform-independent execution across different runners
     - Comprehensive logging and error handling built-in
   
   - **Specific pre-built actions used and their advantages**:
     - `actions/checkout@v4`: Optimized git clone with sparse checkout support and advanced security features
     - `actions/setup-node@v4`: Handles Node.js installation, version management, and caching in one step
     - `docker/setup-buildx-action@v3`: Provides enhanced Docker build capabilities including multi-platform builds
     - `docker/login-action@v3`: Securely handles Docker registry authentication with token management
     - `docker/metadata-action@v5`: Generates standardized tags and labels following OCI recommendations
     - `docker/build-push-action@v5`: Offers layer caching, build acceleration, and multi-platform support
     - `aquasecurity/trivy-action`: Integrates container security scanning directly into the workflow
     - `github/codeql-action`: Provides advanced static code analysis that would be impractical to set up manually
     - `actions/upload-artifact@v4`: Handles file persistence between jobs with compression and retention policies

2. **Job separation**:
   - Modular workflow with isolated steps
   - Parallel execution where possible
   - Clear failure points for easier debugging

3. **Caching strategies**:
   - Docker layer caching speeds up builds
   - Node modules caching reduces installation time
   - Build artifacts are preserved between jobs

4. **Security scanning**:
   - npm audit checks dependencies
   - CodeQL analyzes code for vulnerabilities
   - Trivy scans container images

5. **Branch protection rules**:
   - Prevents direct pushes to `main`
   - Requires passing status checks
   - Enforces code review

## 📈 Scaling Strategies & Cost Optimization

### Scaling Strategies

1. **Container Orchestration**:
   - Implement Kubernetes for larger-scale deployments
   - Use Docker Swarm for simpler orchestration needs

2. **Load Balancing**:
   - Add Nginx or Traefik as a load balancer in front of multiple containers
   - Configure horizontal scaling based on traffic patterns

3. **CI/CD Pipeline Enhancements**:
   - Implement parallel testing for faster feedback
   - Add staging environment with automatic deployments

### Cost Optimization

1. **Build Optimization**:
   - Use GitHub Actions matrix builds only when necessary
   - Optimize Docker builds to reduce build minutes

2. **Resource Allocation**:
   - Right-size container resources based on actual needs
   - Implement auto-scaling to handle traffic spikes efficiently

3. **Caching Strategies**:
   - Leverage GitHub's cache action to reduce build times
   - Configure proper Docker layer caching

4. **Repository Lifecycle Management**:
   - Clean up old artifacts and unused Docker images
   - Implement retention policies for workflow runs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Open a pull request

Please ensure all tests pass and linting rules are followed before submitting your PR.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
