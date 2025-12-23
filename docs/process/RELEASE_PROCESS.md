# Release Process

Releases are enterprise-ready only after formal validation.

## Steps

1. Open change ticket and attach RFC.
2. Run `npm run validate` and `npm run security:scan`.
3. Run `npm run compliance:pii` and `npm run compliance:iso`.
4. Capture evidence and store in audit archive.
5. Obtain approvals from Security and Compliance.
6. Publish with `npm run release`.
