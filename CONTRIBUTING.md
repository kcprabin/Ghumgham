# Contributing to Travallee

Thank you for your interest in contributing to Travallee! We appreciate all contributions, whether they are bug reports, feature requests, or code changes.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/Travallee.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Install dependencies:
   ```bash
   cd Admin-Frontend
   npm install
   cd ../Travallee-Backend/Packages
   npm install
   ```

## Development Setup

### Admin Frontend
```bash
cd Admin-Frontend
npm install
npm run dev
```

### Travallee App (Mobile)
```bash
cd Travallee-App
npm install
npm run dev
```

### Backend
```bash
cd Travallee-Backend/Packages
npm install
npm run dev
```

## Code Style

- Use **consistent formatting** — run `npm run lint` before committing
- Follow **TypeScript** best practices
- Use **descriptive variable and function names**
- Add **comments** for complex logic
- Keep **components small and reusable**

## Making Changes

1. Create a feature branch from `develop` (not `main`)
2. Make your changes
3. Write or update tests
4. Run `npm run build` to ensure no errors
5. Run `npm run lint` to check code style
6. Commit with clear messages: `git commit -m "feat: add new feature"`

## Commit Message Format

We follow conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for formatting/styling
- `test:` for tests
- `chore:` for maintenance

Example: `git commit -m "feat: add user authentication"`

## Pull Request Process

1. Update [CHANGELOG.md](CHANGELOG.md) with your changes
2. Create a PR against the `develop` branch
3. Fill out the PR template completely
4. Wait for at least one review approval
5. Ensure all CI checks pass
6. Squash commits if requested

## Reporting Bugs

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md) and include:
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/logs
- Environment details

## Feature Requests

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md) and describe:
- The problem being solved
- Proposed solution
- Alternative approaches
- Use cases

## Questions?

- Open a discussion in GitHub Discussions
- Check existing issues and documentation first
- Ask in the community

## Code of Conduct

Be respectful and constructive. We're building something great together!

---

**Note:** By contributing, you agree that your contributions will be licensed under the MIT License.
