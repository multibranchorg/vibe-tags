# PII Assessment (DPIA Starter)

Status: Draft, enterprise-ready staging.

## Scope

VibeCraft.js processes AI prompts that may include personally identifiable information (PII).
This assessment documents the detection, minimization, and denial controls.

## Data Inventory

- Inputs: AI prompts, .vcx files, environment variables.
- Outputs: generated HTML, build artifacts.
- Storage: local files only, unless configured otherwise.

## Risks

- Prompts may contain emails, names, or customer identifiers.
- Output may inadvertently echo PII into generated HTML.

## Controls

- Default PII handling mode is deny.
- PII scan in `scripts/pii-scan.js` blocks release on findings.
- Change control required for any PII scope expansion.

## Open Items

- Define data retention for generated artifacts.
- Establish approval workflow for PII tokenization.
