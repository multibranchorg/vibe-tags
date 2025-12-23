# Data Classification Policy

This project is enterprise-ready by default and assumes data is classified before processing.

## Classification Levels

- Public: safe for external distribution.
- Internal: non-public operational data.
- Confidential: sensitive business data.
- Restricted: regulated or high-risk data (PII, PCI, PHI, secrets).

## Handling Rules

- Restricted data requires change control, approval logging, and redaction by default.
- Confidential data requires encryption at rest and in transit.
- Internal data requires access logging and least privilege.

## Enterprise-Ready Defaults

- PII handling mode defaults to deny.
- Every change requires a change ticket ID.
- Compliance evidence is required for releases.
