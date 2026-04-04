# Security Policy

## Supported Versions

Current security updates are provided for:

| Version | Supported          |
|---------|-------------------|
| 1.x     | :white_check_mark: |
| 0.x     | :x:               |

## Reporting a Vulnerability

If you discover a security vulnerability in Travallee, please **do not** open a public GitHub issue. Instead:

1. **Email us** at kcprabin2063@gmail.com (or create a private security advisory)
2. **Include details:**
   - Type of vulnerability
   - Location in codebase (file/line if possible)
   - Potential impact
   - Steps to reproduce (if applicable)
   - Suggested fix (if you have one)

3. **Response timeline:**
   - Initial response: within 48 hours
   - Patch release: within 7-14 days (depending on severity)

## Security Best Practices

When contributing, please ensure:

- [ ] No hardcoded secrets, API keys, or credentials
- [ ] No sensitive data in logs or error messages
- [ ] Dependencies are kept up to date (`npm audit`)
- [ ] Input validation on all user inputs
- [ ] Environment variables for configuration
- [ ] HTTPS for all external communications

## Known Vulnerabilities

None currently known. Check [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) regularly:

```bash
npm audit
npm audit fix  # Auto-fix vulnerabilities
```

## Security Updates

We release security patches as soon as possible. Subscribe to GitHub release notifications to stay informed:
- Watch repository → Custom → Releases

## Third-party Dependencies

We regularly update dependencies to patch known vulnerabilities. If you notice an outdated package:

1. Check the issue tracker
2. Open an issue with the package name and version

## Disclosure Timeline

We follow responsible disclosure:
- Vulnerability reported
- We assess severity and impact
- We develop and test the fix
- We release a patched version
- We publicly announce the vulnerability (post-fix)

Thank you for helping keep Travallee secure!
