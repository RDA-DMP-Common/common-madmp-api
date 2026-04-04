# Contributing to Common maDMP API

Thank you for helping improve the Common maDMP API.

## What you are contributing to

This repository is specification-first:

- [openapi.yaml](openapi.yaml) is the source of truth
- CI validates the specification and style
- Swagger UI assets are generated from the spec

## Workflow

1. Create a branch from the default branch.
2. Make focused changes to `openapi.yaml` and related docs.
3. Run validation locally.
4. Open a pull request with a clear summary and rationale.

## Local setup

If needed, use Python 3 and install the same validator as CI:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install openapi-spec-validator==0.7.1
```

## Required check before PR

Run:

```bash
openapi-spec-validator openapi.yaml
```

If this fails, please fix the specification before opening a PR.

## Useful local preview

To rebuild Swagger UI from the current spec:

```bash
bash bin/swagger-ui.sh
```

`dist/` is generated output and should not be edited manually.

## API compatibility expectations

When changing the API, preserve interoperability across implementers:

1. Keep `Accept` content negotiation behavior intact.
2. Preserve conflict handling via `Last-Modified` and `If-Unmodified-Since` for `PUT /dmps/{id}`.
3. Document breaking changes clearly in the PR description.

## Pull request checklist

Before requesting review, confirm:

- The OpenAPI validator passes locally.
- Descriptions/examples are updated for changed behavior.
- README and docs are updated when contributor-facing behavior changes.
- [CHANGELOG.md](CHANGELOG.md) is updated under `Unreleased` when behavior changes.
- The PR explains why the change is needed and its compatibility impact.

## Style

Project style is defined by [`.editorconfig`](.editorconfig) and enforced in CI.
