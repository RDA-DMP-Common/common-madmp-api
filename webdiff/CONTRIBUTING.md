# Contributing to maDMP Validator & Diff Tool

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

This project follows the principles of respect, collaboration, and inclusivity. Please:

- Be respectful and constructive in all communications
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

**For Frontend Development:**
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Basic knowledge of HTML, CSS, and JavaScript
- Text editor or IDE (VS Code, Sublime Text, etc.)

**For Backend Development:**
- Rust 1.75 or later
- PostgreSQL 16 or later
- Docker (optional, for containerized development)

### Setting Up Development Environment

1. **Fork and Clone the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/standard-diff.git
   cd standard-diff
   ```

2. **Frontend Setup**
   ```bash
   # Start a local HTTP server
   python3 -m http.server 8080
   # Open http://localhost:8080 in your browser
   ```

3. **Backend Setup**
   ```bash
   cd rust-backend
   cp .env.example .env
   # Edit .env with your configuration
   cargo build
   cargo run
   ```

## Development Workflow

### Branch Naming Convention

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions or modifications

**Example:**
```bash
git checkout -b feature/add-xml-export
```

### Making Changes

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clear, concise code
   - Follow the coding standards (see below)
   - Add comments where necessary
   - Update documentation if needed

3. **Test Your Changes**
   - Test manually in the browser
   - Run automated tests (if available)
   - Verify no console errors
   - Test in multiple browsers if UI changes

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add XML export functionality"
   ```

### Commit Message Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

**Examples:**
```
feat(diff): add XML export format
fix(validator): resolve schema loading issue
docs(readme): update installation instructions
refactor(api): simplify error handling
```

## Coding Standards

### JavaScript

- **Use ES6+ syntax** (const/let, arrow functions, template literals)
- **Use meaningful variable names**
  ```javascript
  // Good
  const validationResult = validateMaDMP(data);

  // Avoid
  const vr = validateMaDMP(data);
  ```

- **Add JSDoc comments** for functions
  ```javascript
  /**
   * Validates maDMP JSON against schema v1.2
   * @param {Object} jsonData - The maDMP JSON to validate
   * @returns {Promise<{valid: boolean, errors: Array}>}
   */
  async function validateMaDMP(jsonData) {
    // implementation
  }
  ```

- **Use consistent formatting**
  - 2 spaces for indentation
  - Single quotes for strings
  - Semicolons at end of statements
  - Max line length: 100 characters

- **Error handling**
  ```javascript
  try {
    const result = await someAsyncOperation();
    return result;
  } catch (error) {
    console.error('Operation failed:', error);
    showToast('An error occurred', 'error');
  }
  ```

### Rust

- **Follow Rust naming conventions**
  - `snake_case` for functions and variables
  - `PascalCase` for types and structs
  - `SCREAMING_SNAKE_CASE` for constants

- **Format code with rustfmt**
  ```bash
  cargo fmt
  ```

- **Check for common issues with clippy**
  ```bash
  cargo clippy
  ```

- **Add documentation comments**
  ```rust
  /// Validates a DMP against the maDMP schema
  ///
  /// # Arguments
  /// * `dmp_data` - The DMP JSON data to validate
  ///
  /// # Returns
  /// Result indicating whether the DMP is valid
  pub fn validate_dmp(dmp_data: &Value) -> Result<(), ValidationError> {
      // implementation
  }
  ```

### CSS

- **Use consistent naming** (BEM methodology preferred)
- **Group related properties**
- **Use variables for colors and common values**
- **Ensure responsive design**

## Testing

### Frontend Testing

**Manual Testing Checklist:**
- [ ] Test in Chrome, Firefox, Safari
- [ ] Test file upload (all three methods)
- [ ] Test validation with valid/invalid JSON
- [ ] Test all diff view modes
- [ ] Test all export formats
- [ ] Test keyboard shortcuts
- [ ] Test dark mode toggle
- [ ] Check browser console for errors
- [ ] Test on mobile/tablet devices

**Automated Testing (when added):**
```bash
npm test
```

### Backend Testing

```bash
cd rust-backend
cargo test
cargo test -- --nocapture  # Show output
```

**Test Coverage:**
```bash
cargo tarpaulin --out Html
```

## Submitting Changes

### Pull Request Process

1. **Update Documentation**
   - Update README.md if needed
   - Update CHANGELOG.md
   - Add JSDoc/Rustdoc comments

2. **Ensure Tests Pass**
   - All existing tests pass
   - New tests added for new features
   - No console errors or warnings

3. **Create Pull Request**
   - Use a clear, descriptive title
   - Reference related issues
   - Describe what changed and why
   - Include screenshots for UI changes
   - List any breaking changes

**Pull Request Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] Automated tests added
- [ ] No console errors

## Screenshots (if applicable)
[Add screenshots here]

## Related Issues
Closes #issue_number
```

4. **Review Process**
   - Address reviewer feedback
   - Make requested changes
   - Push updates to your branch

5. **Merge**
   - Once approved, your PR will be merged
   - Delete your feature branch after merge

## Reporting Bugs

### Before Submitting a Bug Report

- Check existing issues to avoid duplicates
- Test in the latest version
- Try to reproduce in a fresh environment
- Gather relevant information

### Bug Report Template

```markdown
**Describe the bug**
Clear and concise description

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable

**Environment:**
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Version: [e.g., 2.0.0]

**Additional context**
Any other relevant information
```

## Suggesting Features

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of what you want to happen

**Describe alternatives you've considered**
Other solutions or features you've considered

**Additional context**
Mockups, examples, or other context
```

## Project Structure

Understanding the project structure will help you navigate the codebase:

```
standard-diff/
├── index.html              # Main application file
├── README.md              # Project documentation
├── CHANGELOG.md           # Version history
├── CONTRIBUTING.md        # This file
├── css/                   # Stylesheets
├── js/                    # JavaScript modules
│   ├── main.js           # Application entry
│   ├── store.js          # State management
│   ├── validator.js      # Validation logic
│   ├── diff-renderers/   # Diff visualization
│   └── exporters/        # Export functionality
├── schemas/              # JSON schemas
├── docs/                 # Documentation
│   └── reports/         # Test and bug reports
└── rust-backend/        # Backend API
    ├── src/             # Rust source code
    ├── tests/           # Integration tests
    └── migrations/      # Database migrations
```

## Questions?

If you have questions:
- Check the [README.md](README.md)
- Review existing issues and pull requests
- Create a new issue with the "question" label

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (Creative Commons Zero - CC0).

---

Thank you for contributing to the maDMP Validator & Diff Tool! 🎉
