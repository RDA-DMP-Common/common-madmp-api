# Changelog

All notable changes to the maDMP Validator & Diff Tool will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Git repository initialization
- Comprehensive .gitignore file
- Organized documentation structure
- Documentation moved to docs/reports/

### Changed
- Repository structure reorganization

## [2.0.0] - 2025-10-21

### Added
- **Search & Filter**: Real-time search across all changes with type filtering
- **Navigation Controls**: Next/previous change navigation with keyboard shortcuts
- **Session Management**: Save, load, and manage comparison sessions with history
- **Multiple Export Formats**: HTML, PDF, CSV, and Markdown exports
- **Keyboard Shortcuts**: Comprehensive keyboard navigation system
- **Enhanced UI**: Improved visual highlighting, collapsible sections, bookmarks
- **Rust Backend**: Production-ready API with PostgreSQL and JWT authentication
- **Database Support**: Full CRUD operations with advanced search and filtering
- **API Documentation**: Auto-generated Swagger UI
- **Docker Support**: Multi-stage Dockerfile and docker-compose setup

### Fixed
- Zustand library loading issue - replaced with custom vanilla JS store
- AJV JSON Schema validator library compatibility
- CORS policy blocking for local file loading
- Validator initialization dependencies

### Performance
- Optimized rendering for large diffs
- Database query optimization with indexes
- Connection pooling for API

## [1.0.0] - 2025-01-01

### Added
- Initial release
- Full maDMP v1.2 validation
- Four diff visualization formats (Side-by-Side, Unified, JSONata, Tree)
- API integration capability
- Dark mode support
- Basic export/import functionality
- Multiple upload methods (File picker, Drag & Drop, Paste JSON)
- Statistics panel with metrics
- Toast notifications

### Technical Stack
- Bootstrap 5.2 UI framework
- Vanilla ES6+ JavaScript
- Custom state management
- Ajv v8 for JSON validation
- JSONata v2 for queries
- jsdiff v5 for diff engine
- jsPDF v2.5 for PDF generation
- RDA-DMP-Common-Standard v1.2 schema

---

## Version History

- **2.0.0** - Major feature release with backend API
- **1.0.0** - Initial release with core functionality

## Links

- [RDA DMP Common Standard](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard)
- [Bug Fix Reports](docs/reports/)
- [Test Reports](docs/reports/COMPREHENSIVE_TEST_REPORT.md)
