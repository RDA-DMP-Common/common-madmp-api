# Documentation Index

Welcome to the maDMP Validator & Diff Tool documentation.

## Main Documentation

- [Project README](../README.md) - Overview, features, and getting started guide
- [Changelog](../CHANGELOG.md) - Version history and release notes
- [Contributing Guide](../CONTRIBUTING.md) - How to contribute to this project

## Reports

Historical reports documenting the development and testing of the project:

- [Bug Fixes](reports/BUG_FIXES.md) - Initial bug fixes during development
- [Final Bug Fixes](reports/FINAL_BUG_FIXES.md) - Final round of bug fixes
- [Comprehensive Test Report](reports/COMPREHENSIVE_TEST_REPORT.md) - Full test results
- [Library Localization Summary](reports/LIBRARY_LOCALIZATION_SUMMARY.md) - Library integration notes

## Backend Documentation

- [Rust Backend README](../rust-backend/README.md) - Backend API documentation
- [Quick Start Guide](../rust-backend/QUICKSTART.md) - Fast setup instructions
- [Implementation Summary](../rust-backend/IMPLEMENTATION_SUMMARY.md) - Technical details

## Related Resources

- [RDA DMP Common Standard](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard) - Official standard specification
- [maDMP Schema v1.2](../schemas/maDMP-schema-1.2.json) - JSON Schema file

## Architecture

### Frontend Architecture

```
Frontend (Vanilla JavaScript)
├── State Management (store.js)
├── Validation (validator.js, Ajv)
├── Diff Engine (diff-engine.js, jsdiff)
├── Renderers (4 visualization modes)
├── Exporters (5 export formats)
└── UI Components (Bootstrap 5)
```

### Backend Architecture

```
Backend (Rust + Axum)
├── API Handlers
├── JWT Authentication
├── PostgreSQL Database (JSONB)
├── JSON Schema Validation
└── OpenAPI Documentation
```

## Support

For questions or issues:
1. Check the main [README.md](../README.md)
2. Review the [reports](reports/) for known issues
3. See the backend [README](../rust-backend/README.md) for API issues
4. Create an issue on GitHub

---

*Last updated: October 2025*
