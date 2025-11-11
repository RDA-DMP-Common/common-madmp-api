# Pull Request: Integrate maDMP Validator & Diff Tool (webdiff)

## Summary

This PR proposes integrating the **maDMP Validator & Diff Tool** (formerly `standard-diff`) into the `common-madmp-api` repository as the `webdiff` branch. This client-side web application complements the API specification by providing an interactive interface for validating and comparing maDMP documents.

## Changes

### Repository Structure
- Created new `webdiff` branch containing the validator/diff tool in the `webdiff/` subdirectory
- Preserved complete git history from the original `standard-diff` repository using `git subtree`
- Updated documentation to reflect the new repository structure

### Documentation Updates
1. **webdiff/README.md**
   - Updated Quick Start instructions to reflect new repository location
   - Added deployment section with GitHub Pages setup instructions (gh-pages branch and GitHub Actions)
   - Added reference to production test site at [xrzhou.com/webdiff](https://xrzhou.com/webdiff)
   - Updated file structure to show integration with common-madmp-api
   - Added version 2.2.0 changelog entry

2. **README.md** (root)
   - Added "Web-Based Validator & Diff Tool" section introducing the webdiff branch
   - Included quick access links to online demo and documentation
   - Explained how the tool complements the API specification

## Features

The integrated webdiff tool provides:

- ✅ **Validation**: JSON validation against maDMP schema v1.2 with detailed error reporting
- ✅ **Multiple Upload Methods**: File picker, drag & drop, paste JSON
- ✅ **File Library**: Manage multiple maDMP files with auto-preloaded examples
- ✅ **API Integration**: Test integration with common-madmp-api endpoints
- ✅ **Diff Visualization**: 4 formats (Side-by-Side, Unified, JSONata, Tree)
- ✅ **Search & Filter**: Real-time search with type filtering and navigation
- ✅ **Session Management**: Save, load, and manage comparison sessions
- ✅ **Export**: Multiple formats (JSON, HTML, PDF, CSV, Markdown)
- ✅ **Keyboard Shortcuts**: Comprehensive keyboard navigation
- ✅ **Dark Mode**: Theme toggle with localStorage persistence
- ✅ **Client-Side**: All processing in browser, no server required

## Deployment Options

The tool can be deployed using:

1. **GitHub Pages via gh-pages branch**: Manual deployment by moving webdiff contents to a gh-pages branch
2. **GitHub Pages via GitHub Actions**: Automated deployment on push to webdiff branch
3. **Custom domain**: Already live at [xrzhou.com/webdiff](https://xrzhou.com/webdiff) for testing

## Testing

Before merging, the application can be thoroughly tested at:
- **Production test site**: [xrzhou.com/webdiff](https://xrzhou.com/webdiff)
- **Local testing**: Follow instructions in webdiff/README.md

## Technical Details

### Integration Method
- Used `git subtree add` to merge repositories while preserving history
- All 5 commits from standard-diff are maintained in the git history
- Original standard-diff repository remains unchanged

### Technology Stack
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3 - no build tools required
- **UI Framework**: Bootstrap 5.2 (Bootswatch Yeti theme)
- **State Management**: Zustand v4
- **Validation**: Ajv v8 (JSON Schema draft-2020-12)
- **Diff Engine**: jsdiff v5
- **Query Language**: JSONata v2
- **PDF Generation**: jsPDF v2.5
- **Schema**: RDA-DMP-Common-Standard v1.2

### File Size
- Total size: ~3.4M (139 files)
- No external dependencies need to be installed
- All libraries loaded via CDN

## Benefits

1. **Unified Repository**: API specification and client tool in one place
2. **Better Discoverability**: Users find the validator when looking for the API
3. **Integrated Documentation**: Cross-references between API docs and validator
4. **Easy Deployment**: GitHub Pages deployment options included
5. **Preserved History**: Complete git history maintained for both projects
6. **Independent Development**: webdiff branch allows separate development cycle

## Compatibility

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### API Integration
- Supports content negotiation: `application/vnd.org.rd-alliance.dmp-common.v1.2+json`
- Configurable endpoint URL
- Connection testing built-in

## Migration Notes

- Original repository: `https://github.com/xiaoranzhou/webdiff.git`
- New location: `webdiff/` subdirectory in `webdiff` branch
- No breaking changes to the API specification
- The `init` and `main` branches remain unchanged

## Next Steps

After merging:
1. Deploy to GitHub Pages using one of the provided methods
2. Update external links to point to new repository location
3. Archive or redirect the original `webdiff` repository
4. Optionally merge webdiff branch into main for unified documentation

## Checklist

- [x] All commits have descriptive messages
- [x] Documentation updated (README files)
- [x] Git history preserved from original repository
- [x] Deployment instructions provided
- [x] Testing site available (xrzhou.com/webdiff)
- [x] No conflicts with existing branches
- [x] File structure clearly documented

## Questions for Review

1. Should we deploy to GitHub Pages immediately or wait for additional testing?
2. Should the webdiff branch eventually be merged into main, or kept separate?
3. Do we want to set up automatic GitHub Actions deployment?
4. Should we add a direct link from the OpenAPI documentation to the validator?

## References

- **RDA DMP Common Standard**: https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard
- **Original webdiff repo**: https://github.com/xiaoranzhou/webdiff
- **Production test site**: https://xrzhou.com/webdiff
- **License**: MIT (compatible with API spec's CC0 license)

---

**Please review and provide feedback!** The tool is fully functional and ready for testing at xrzhou.com/webdiff.
