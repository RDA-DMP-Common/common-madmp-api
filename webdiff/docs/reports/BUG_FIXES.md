# Bug Fixes Summary

## Bugs Identified and Fixed

### 1. Zustand Library Loading Issue
**Problem**: `Cannot destructure property 'create' of 'window.zustand' as it is undefined`
- The Zustand library CDN URL was incorrect
- Zustand requires React in UMD builds
- Browser was blocking the unpkg.com CDN due to OPAQUE Response Blocking (ORB)

**Solution**: Replaced Zustand with a custom vanilla JavaScript store implementation in `js/store.js`

### 2. AJV JSON Schema Validator Library Issue  
**Problem**: `Uncaught ReferenceError: exports is not defined`
- Using CommonJS version (`dist/2020.min.js`) instead of browser bundle
- The 2020.bundle.js was also blocked by ORB

**Solution**: Changed to `ajv7.min.js` which is a proper browser bundle
```html
<!-- Changed from -->
<script src="https://cdn.jsdelivr.net/npm/ajv@8.12.0/dist/2020.min.js"></script>
<!-- To -->
<script src="https://cdn.jsdelivr.net/npm/ajv@8.12.0/dist/ajv7.min.js"></script>
```

### 3. CORS Policy Blocking Local File Loading
**Problem**: `Access to fetch at 'file:///...schemas/maDMP-schema-1.2.json' blocked by CORS policy`
- Cannot use `fetch()` with `file://` protocol
- XMLHttpRequest also blocked for local files

**Solution**: 
- Added fallback method `loadSchemaLocal()` in `js/validator.js` using XMLHttpRequest
- **Required**: Must run application via HTTP server, not file:// protocol
```bash
python3 -m http.server 8080
```

### 4. Validator Initialization Dependency
**Problem**: Validator failed to initialize properly
- Wrong Ajv constructor reference (`window.ajv2020` doesn't exist)

**Solution**: Updated validator.js to use correct reference:
```javascript
const Ajv = window.ajv7 || window.Ajv;
```

## Files Modified

1. `index.html` - Fixed library CDN URLs, removed Zustand dependency
2. `js/store.js` - Implemented custom vanilla JS store (replaces Zustand)
3. `js/validator.js` - Fixed Ajv reference and added local file loading support

## How to Test

1. Start HTTP server:
   ```bash
   cd /home/xrzhou/git/standard-diff
   python3 -m http.server 8080
   ```

2. Open in browser with DevTools:
   ```
   http://localhost:8080/index.html
   ```

3. Check console for errors (should be clean now)

4. Test functionality:
   - Upload a JSON file
   - Validate against maDMP schema
   - Configure API endpoint
   - View diff visualizations

## Remaining Issues

Note: Browser caching may require hard refresh (Ctrl+Shift+R) or clearing cache to see changes.

