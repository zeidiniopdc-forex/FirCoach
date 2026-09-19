# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please report it responsibly.

### How to Report

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please report via:

1. **Email**: Send details to [security@fitforge.app](mailto:security@fitforge.app)
2. **GitHub Security Advisories**: Use the "Report a vulnerability" feature in the Security tab

### What to Include

Please include the following information:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Suggested fix (if any)
- Your contact information for follow-up

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution Target**: Within 30 days (depending on severity)

### What to Expect

1. **Acknowledgment**: We will acknowledge receipt of your report within 48 hours
2. **Assessment**: We will assess the severity and impact
3. **Fix Development**: We will work on a fix
4. **Disclosure**: We will coordinate disclosure with you
5. **Credit**: We will credit you in the security advisory (unless you prefer to remain anonymous)

### Responsible Disclosure

Please follow responsible disclosure practices:

- Do not publicly disclose the vulnerability until we have had a chance to address it
- Do not access or modify other users' data
- Do not perform attacks that could harm the service or its users
- Do not use the vulnerability for any malicious purposes

### Bug Bounty

Currently, we do not offer a bug bounty program. However, we deeply appreciate responsible disclosure and will credit security researchers who help us improve our security.

## Security Best Practices

When contributing to FitForge, please follow these security best practices:

### Code Security

1. **Input Validation**: Always validate and sanitize user input
2. **Output Encoding**: Encode output to prevent XSS attacks
3. **Authentication**: Implement proper authentication mechanisms
4. **Authorization**: Check permissions before allowing access to resources
5. **Data Protection**: Never expose sensitive data in client-side code

### Dependencies

1. **Keep Updated**: Regularly update dependencies to latest secure versions
2. **Audit Dependencies**: Use `npm audit` to check for known vulnerabilities
3. **Minimal Dependencies**: Only include necessary dependencies
4. **Trust Sources**: Only use packages from trusted sources

### Data Handling

1. **Local Storage**: All user data is stored locally
2. **No External Servers**: No data is sent to external servers
3. **Encryption**: Consider encryption for sensitive data
4. **Data Minimization**: Only collect necessary data

### Development

1. **Code Review**: All code changes require review
2. **Testing**: Write tests for security-critical code
3. **Static Analysis**: Use static analysis tools
4. **Secrets Management**: Never commit secrets or API keys

## Security Features

FitForge implements the following security features:

- ✅ Local-first data storage
- ✅ No external API calls
- ✅ No user tracking
- ✅ No analytics
- ✅ Open source code
- ✅ Regular dependency updates
- ✅ Automated security scanning (CodeQL)
- ✅ Dependency review in PRs

## Security Updates

Security updates are released as soon as possible after a vulnerability is confirmed and a fix is developed.

To stay informed about security updates:

1. Watch the repository
2. Subscribe to releases
3. Follow our security advisories

## Contact

For security-related questions or concerns:

- **Email**: security@fitforge.app
- **GitHub**: Use the Security tab to report vulnerabilities

---

Thank you for helping keep FitForge and its users safe!
