# maDMP Validator & Diff Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![RDA DMP Common Standard](https://img.shields.io/badge/RDA-DMP%20v1.2-blue.svg)](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard)

> A powerful, client-side web application for validating and comparing machine-actionable Data Management Plans (maDMP) according to the RDA DMP Common Standard.

## Overview

This tool provides researchers, data managers, and institutions with a comprehensive solution for:
- **Validating** maDMP documents against the official RDA schema v1.2
- **Comparing** different versions of maDMP files with multiple visualization formats
- **Analyzing** changes between original and API-processed maDMP documents
- **Managing** multiple maDMP files with a built-in file library
- **Exporting** comparison results in various formats (JSON, HTML, PDF, CSV, Markdown)

**Key Advantages:**
- 🔒 **Privacy First**: All processing happens in your browser - no data sent to external servers
- ⚡ **Fast & Lightweight**: No installation required, runs entirely client-side
- 🎨 **Multiple Views**: 4 different visualization formats to suit your workflow
- 🔍 **Powerful Search**: Find changes instantly with real-time search and filtering
- 💾 **Session Management**: Save and restore comparison sessions for later review
- ⌨️ **Keyboard Shortcuts**: Work efficiently with comprehensive keyboard navigation

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/standard-diff.git
cd standard-diff

# Open in browser (no build required!)
open index.html

# Or use a local server
python3 -m http.server 8000
# Navigate to http://localhost:8000
```

**That's it!** The tool includes example files that are automatically loaded when you first open it.

## Demo Usage

```javascript
// 1. Open index.html in your browser
// 2. Five example files are automatically loaded in the File Library

// 3. Click [L] on "Funded DMP" to select it as the left file
// 4. Click [R] on "Planned Dataset" to select it as the right file
// 5. Comparison appears instantly in all four visualization modes!

// 6. Try different views:
//    - Side-by-Side: Visual comparison with color-coded changes
//    - Unified: Git-style diff format
//    - JSONata: Transformation queries
//    - Tree: Hierarchical structure view

// 7. Search for specific changes:
//    - Press Ctrl+F or click the search box
//    - Type "dataset" to find all dataset-related changes
//    - Use F3/Shift+F3 to navigate matches

// 8. Export your comparison:
//    - Click Export dropdown
//    - Choose format (JSON, HTML, PDF, CSV, Markdown)
//    - Save or share your report
```

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [File Structure](#file-structure)
- [Example maDMP Files](#example-madmp-files)
- [Browser Compatibility](#browser-compatibility)
- [Features in Detail](#features-in-detail)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [Roadmap](#roadmap)
- [License](#license)
- [Credits](#credits)
- [Changelog](#changelog)

## Features

### 1. JSON Validation
- Validates maDMP JSON against schema version 1.2
- Detailed error reporting with paths and descriptions
- Real-time validation feedback

### 2. Multiple Upload Methods
- **File Picker**: Traditional browse and select
- **Drag & Drop**: Drag JSON files directly into the browser
- **Paste JSON**: Copy and paste JSON content directly

### 3. File Library
- **Multiple Files**: Upload and manage multiple maDMP files
- **Example Files**: Pre-loaded example files for quick testing
- **Selection System**: Mark files as Left [L] or Right [R] for comparison
- **Auto-Compare**: Automatically compares when both files are selected
- **Metadata Display**: Shows validation status, file size, and timestamp
- **File Actions**: Rename, delete, or clear all files
- **Persistence**: Optional localStorage persistence across sessions
- **Import/Export**: Export library and import on another machine

### 4. API Integration
- Send maDMP to common-madmp-api endpoint
- Receive merged maDMP response
- Configurable endpoint URL (saved in localStorage)
- Connection testing

### 5. Diff Visualization (4 Formats)

#### Side-by-Side View
- Two-panel comparison with synchronized scrolling
- Color-coded changes (green=added, red=removed, yellow=modified)
- Line numbers for easy reference

#### Unified Diff View
- Git-style unified diff format
- Single panel showing all changes
- Context lines around modifications

#### JSONata Queries
- Transformation queries to convert input to output
- Grouped by change type (additions, deletions, modifications)
- Copy-to-clipboard functionality
- Value previews for each change

#### Tree View
- Hierarchical structure visualization
- Expandable/collapsible nodes
- Change indicators at each level
- Icons for different data types

### 6. Statistics
- Input JSON metrics (size, object count, depth)
- Diff statistics (total changes, percentages)
- Real-time updates

### 7. Search & Filter
- **Real-time Search**: Search across all changes by path or value
- **Filter by Type**: Show/hide added, removed, modified, or unchanged fields
- **Match Highlighting**: Visual highlighting of search results
- **Match Navigation**: Navigate through search results with keyboard shortcuts
- **Live Counters**: See counts of each change type with badge indicators

### 8. Change Navigation
- **Next/Previous Controls**: Navigate through changes sequentially
- **Keyboard Shortcuts**: Use Alt+Arrow keys for quick navigation
- **Visual Highlighting**: Current change highlighted in active view
- **Change Counter**: Track your position (e.g., "3 / 15")
- **Cross-View Support**: Navigation works across all diff visualization formats

### 9. Session Management
- **Save Sessions**: Save current comparison state for later review
- **Session History**: Browse previously saved sessions
- **Bookmarks**: Star important sessions for quick access
- **Auto-naming**: Sessions automatically named with timestamps
- **Quick Restore**: Click any session to instantly restore it
- **Clear History**: Remove old sessions to keep history manageable

### 10. Export & Share (Multiple Formats)
- **JSON Export**: Raw diff data for programmatic use
- **HTML Export**: Self-contained report viewable in any browser
- **PDF Export**: Professional formatted reports with statistics
- **CSV Export**: Tabular data for spreadsheet analysis
- **Markdown Export**: Documentation-friendly format for wikis/README files
- **Copy to Clipboard**: Quick copy of diff results as text

### 11. Keyboard Shortcuts
- **File Operations**: Ctrl+O (open), Ctrl+S (save session), Ctrl+E (export)
- **Navigation**: Alt+Arrows (next/prev change)
- **Search**: Ctrl+F (focus search), F3 (next match), Shift+F3 (prev match), Esc (clear)
- **Views**: Ctrl+1/2/3/4 (switch diff views)
- **Other**: Ctrl+D (dark mode), F11 (fullscreen), ? (show shortcuts help)
- **API**: Ctrl+Enter (send to API)

### 12. UI Features
- Dark mode toggle (with localStorage persistence)
- Responsive design (mobile-friendly)
- Fullscreen mode for diff views
- Toast notifications for user feedback
- Loading indicators for async operations
- Tooltips on all interactive elements
- Professional color-coded changes
- Collapsible tree nodes

## Technology Stack

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.2-purple?logo=bootstrap)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

- **UI Framework**: Bootstrap 5.2 (Bootswatch Yeti theme)
- **JavaScript**: Vanilla ES6+ (no build tools required)
- **State Management**: Zustand v4
- **JSON Validation**: Ajv v8 (draft-2020-12)
- **Query Language**: JSONata v2
- **Diff Engine**: jsdiff v5
- **PDF Generation**: jsPDF v2.5
- **Schema**: RDA-DMP-Common-Standard v1.2
- **Icons**: Bootstrap Icons
- **Storage**: localStorage API for persistence

## Getting Started

### 1. Open the Application

Simply open `index.html` in a modern web browser. No build process or server required!

```bash
# Open with default browser
open index.html

# Or use a local server
python3 -m http.server 8000
# Then navigate to http://localhost:8000
```

### 2. Explore Example Files

The File Library is **pre-loaded with 5 example maDMP files**:
- Select any file as Left [L] by clicking the left button
- Select another file as Right [R] by clicking the right button
- The comparison automatically appears when both are selected!

### 3. Upload Your Own Files (Optional)

Choose one of three methods:
- Click "File" tab and browse for a JSON file
- Click "Drop" tab and drag a file into the drop zone
- Click "Paste" tab and paste JSON content directly

All files are automatically validated against maDMP schema v1.2.

### 4. Configure API (Optional)

1. Enter your common-madmp-api endpoint URL
2. Click "Test Connection" to verify
3. Click "Send to API" to submit your maDMP

### 5. View Differences

Switch between the four visualization formats to explore changes:
- **Side-by-Side**: Visual comparison
- **Unified**: Git-style diff
- **JSONata**: Transformation queries
- **Tree**: Structural view

### 6. Search and Navigate Changes

- Use the search bar to find specific changes by path or value
- Toggle filters to show/hide change types (added, removed, modified, unchanged)
- Use navigation buttons or Alt+Arrow keys to move between changes
- Press Ctrl+F to focus the search box, F3 for next match

### 7. Save and Manage Sessions

- Click "Save Session" to save the current comparison
- View session history in the left sidebar
- Click the star icon to bookmark important sessions
- Click any session to restore it instantly
- Click "Clear History" to remove all saved sessions

### 8. Export Results (Multiple Formats)

- Click the "Export" dropdown to choose format:
  - **JSON**: Raw diff data
  - **HTML**: Self-contained browser report
  - **PDF**: Professional formatted document
  - **CSV**: Spreadsheet-compatible table
  - **Markdown**: Documentation-friendly format
- Use "Copy" button for quick clipboard copy
- Press ? key to view all keyboard shortcuts

## File Structure

```
standard-diff/
├── index.html                          # Main HTML file
├── README.md                           # This file
├── css/
│   └── styles.css                      # Custom styles & dark mode
├── js/
│   ├── main.js                         # Application entry point
│   ├── store.js                        # Zustand state management
│   ├── utils.js                        # Utility functions
│   ├── validator.js                    # JSON schema validation
│   ├── api.js                          # API integration
│   ├── diff-engine.js                  # Diff calculation
│   ├── diff-search.js                  # Search & filter functionality
│   ├── diff-navigation.js              # Change navigation controls
│   ├── session-manager.js              # Session save/load/history
│   ├── file-library.js                 # File library management
│   ├── keyboard-shortcuts.js           # Keyboard shortcuts system
│   ├── sidebar-toggle.js               # Sidebar collapse/expand
│   ├── diff-renderers/
│   │   ├── side-by-side.js             # Side-by-side view
│   │   ├── unified.js                  # Unified diff view
│   │   ├── jsonata.js                  # JSONata queries
│   │   └── tree.js                     # Tree structure view
│   └── exporters/
│       ├── pdf-exporter.js             # PDF report generation
│       ├── csv-exporter.js             # CSV export
│       ├── markdown-exporter.js        # Markdown export
│       └── html-exporter.js            # HTML report generation
├── schemas/
│   └── maDMP-schema-1.2.json           # maDMP JSON schema v1.2
└── examples/
    └── JSON/                           # Example maDMP files
        ├── ex1-header-fundedProject.json
        ├── ex2-dataset-planned.json
        ├── ex3-dataset-finished.json
        ├── missing-title.json
        └── missing-dataset.json
```

## Example maDMP Files

The tool includes example maDMP JSON files in the `examples/JSON/` directory that are **automatically preloaded** into the File Library when you first open the application:

- **ex1-header-fundedProject.json** - Example of a funded project DMP with complete metadata
- **ex2-dataset-planned.json** - DMP for a planned dataset
- **ex3-dataset-finished.json** - DMP for a completed dataset
- **missing-title.json** - Example with validation errors (missing required title)
- **missing-dataset.json** - Example with validation errors (missing dataset)

These examples demonstrate:
- Valid maDMP structure and syntax
- Required vs optional fields
- Common validation issues
- Different project states (planned, active, finished)

You can immediately select any two files using the [L] and [R] buttons to see a live comparison!

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## API Endpoint Configuration

The tool expects a common-madmp-api endpoint that:

1. Accepts POST requests with maDMP JSON
2. Returns merged/processed maDMP JSON
3. Supports content negotiation:
   - Accepts: `application/vnd.org.rd-alliance.dmp-common.v1.2+json`
   - Returns: `application/vnd.org.rd-alliance.dmp-common.v1.2+json`

Example endpoint: `https://your-api.example.com/dmps`

## Validation Schema

The tool validates against RDA DMP Common Standard v1.2:
- Schema location: `schemas/maDMP-schema-1.2.json`
- Standard: [RDA-DMP-Common-Standard](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard)

## Features in Detail

### Validation Errors

When validation fails, you'll see:
- Error count badge
- JSON path to error location
- Detailed error message
- Error type (required, type, format, etc.)

### Diff Statistics

The tool calculates and displays:
- Total number of changes
- Added fields count
- Removed fields count
- Modified fields count
- Change percentage

### Search & Filter

The search functionality allows you to:
- Search by JSON path (e.g., "dmp.title")
- Search by value (e.g., "MIT License")
- Filter results by change type
- See match counts in real-time
- Navigate matches with F3/Shift+F3
- Clear search with Esc key

### Session Management

Sessions store complete comparison state:
- Input and output JSON
- Validation results
- Diff results and statistics
- API endpoint configuration
- Maximum 20 sessions kept (oldest auto-deleted)
- Bookmark favorite sessions with star icon
- Export sessions for sharing

### Keyboard Shortcuts Reference

| Category | Shortcut | Action |
|----------|----------|--------|
| **File** | Ctrl+O | Open file picker |
| | Ctrl+S | Save current session |
| | Ctrl+E | Export diff |
| **Navigation** | Alt+← / Alt+↑ | Previous change |
| | Alt+→ / Alt+↓ | Next change |
| **Search** | Ctrl+F | Focus search box |
| | F3 | Next search result |
| | Shift+F3 | Previous search result |
| | Esc | Clear search |
| **Views** | Ctrl+1 | Side-by-side view |
| | Ctrl+2 | Unified view |
| | Ctrl+3 | JSONata view |
| | Ctrl+4 | Tree view |
| **Other** | Ctrl+D | Toggle dark mode |
| | F11 | Toggle fullscreen |
| | ? | Show shortcuts help |
| | Ctrl+Enter | Send to API |

### Export Formats Comparison

| Format | Best For | Features |
|--------|----------|----------|
| **JSON** | APIs, automation | Raw structured data |
| **HTML** | Sharing, archiving | Self-contained, interactive |
| **PDF** | Reports, printing | Professional formatting |
| **CSV** | Spreadsheets, analysis | Tabular data |
| **Markdown** | Documentation, wikis | Human-readable text |

### Dark Mode

Toggle between light and dark themes:
- Preference saved to localStorage
- Optimized color schemes for both modes
- Reduced eye strain in low-light environments
- Toggle with button or Ctrl+D shortcut

## Troubleshooting

### Validation Fails
- Ensure JSON is valid (use JSONLint.com)
- Check that it follows maDMP schema v1.2
- Review error messages for specific issues

### API Connection Fails
- Verify endpoint URL is correct
- Check CORS headers are enabled on API
- Test endpoint with curl/Postman first
- Check browser console for errors

### Diff Not Showing
- Ensure both input and output are loaded
- Check that validation passes for both
- Refresh the page and try again

## Development

### Local Development

1. Clone the repository
2. Open `index.html` in a browser
3. Make changes to JS/CSS files
4. Refresh browser to see changes

### Code Structure

- **Modular Design**: Each component is self-contained
- **State Management**: Zustand for reactive state
- **Event-Driven**: DOM events trigger state updates
- **No Build Required**: Pure vanilla JavaScript

### Adding Features

1. Create new module in `js/`
2. Add to `index.html` script tags
3. Wire up in `main.js`
4. Test thoroughly

## License

MIT License - see [LICENSE](./LICENSE) file for details.

This tool is provided as-is for validating and comparing maDMP documents according to the RDA DMP Common Standard.

## Development

### AI-Assisted Development

This project was developed with assistance from multiple AI coding assistants and large language models:

- **[Claude Code](https://claude.ai/claude-code)** (Anthropic) - Primary development assistant for architecture, feature implementation, and code quality
- **OpenAI Codex** - Code generation and optimization
- **Google Gemini** - Algorithm design and problem-solving
- **Qwen** (Alibaba Cloud) - Code review and refinement
- **MiniMax M2** - Testing and debugging assistance

These AI tools helped accelerate development, improve code quality, and implement best practices. However, all code has been reviewed, tested, and validated by human developers to ensure functionality, security, and maintainability.

### Technology Stack

The project uses modern web technologies without requiring build tools:

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **UI Framework**: Bootstrap 5.2 with Bootswatch Yeti theme
- **State Management**: Zustand v4
- **Validation**: Ajv v8 (JSON Schema validator)
- **Diff Engine**: jsdiff v5
- **Query Language**: JSONata v2
- **PDF Generation**: jsPDF v2.5
- **Icons**: Bootstrap Icons

### Contributing

Contributions are welcome! Whether you're fixing bugs, adding features, or improving documentation:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and test thoroughly
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please ensure your code:
- Follows existing code style and conventions
- Includes comments for complex logic
- Works in all major browsers (Chrome, Firefox, Safari, Edge)
- Doesn't introduce security vulnerabilities

## Credits

- **RDA DMP Common Standards Working Group** - For the maDMP standard and schema
- **Bootstrap Team** - For the excellent UI framework
- **Library Authors**:
  - Zustand state management
  - Ajv JSON schema validator
  - JSONata query language
  - jsdiff library
  - jsPDF PDF generation
- **AI Development Partners** - Claude Code, OpenAI Codex, Google Gemini, Qwen, MiniMax M2

## Roadmap

### Upcoming Features

#### API Testing & Integration (Priority: High)
- **Automated API Testing Suite**: Comprehensive API testing functionality will be added as soon as a publicly accessible maDMP API endpoint is available for testing
  - Automated request/response validation
  - API endpoint health monitoring
  - Mock API server for local testing
  - Response time metrics
  - Error handling test scenarios
  - CORS configuration validator

#### Other Planned Enhancements
- **Batch Processing**: Compare multiple files simultaneously
- **Custom Schema Support**: Allow users to upload custom JSON schemas
- **Diff Templates**: Save and reuse custom diff configurations
- **Advanced Filtering**: More granular filtering options for change types
- **Collaboration Features**: Share comparisons with team members via URLs
- **Version History**: Track changes across multiple versions of the same file
- **Integration APIs**: REST API for programmatic access
- **Plugin System**: Allow community-contributed extensions

Want to contribute or suggest features? Open an issue on our [GitHub repository](https://github.com/yourusername/standard-diff/issues)!

## Support

For issues related to:
- **This tool**: Check browser console for errors
- **maDMP Standard**: See [RDA-DMP-Common-Standard](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard)
- **API Issues**: Contact your API provider
- **Feature Requests**: Open an issue on GitHub

## Changelog

### Version 2.1.0 (2025-11-11)
- **File Library**: Multi-file management with Left/Right selection system
- **Auto-Preload Examples**: 5 example files automatically loaded on first use
- **File Persistence**: Optional localStorage persistence across browser sessions
- **Library Import/Export**: Save and share entire file libraries
- **File Metadata**: Display validation status, size, and timestamp for each file
- **Auto-Compare**: Automatic diff calculation when both files selected
- **Improved README**: Enhanced documentation with AI development acknowledgment

### Version 2.0.0 (2025)
- **Search & Filter**: Real-time search across all changes with type filtering
- **Navigation Controls**: Next/previous change navigation with keyboard shortcuts
- **Session Management**: Save, load, and manage comparison sessions with history
- **Multiple Export Formats**: Added HTML, PDF, CSV, and Markdown exports
- **Keyboard Shortcuts**: Comprehensive keyboard navigation system
- **Enhanced UI**: Improved visual highlighting, collapsible sections, bookmarks
- **Performance**: Optimized rendering for large diffs
- **Documentation**: Comprehensive README with feature guide

### Version 1.0.0 (2025)
- Initial release
- Full maDMP v1.2 validation
- Four diff visualization formats (Side-by-Side, Unified, JSONata, Tree)
- API integration with common-madmp-api
- Dark mode support
- Export/import functionality
- Three upload methods (File, Drag & Drop, Paste)

---

**Made with ❤️ for the research data management community**

*Developed with AI assistance from Claude Code, OpenAI Codex, Google Gemini, Qwen, and MiniMax M2*
