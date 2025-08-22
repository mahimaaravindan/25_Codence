# SecureBank - Vulnerable Website Demo

**⚠️ WARNING: This website is intentionally vulnerable for educational purposes only. Do NOT deploy this in production or on public networks. ⚠️**

## Overview

This is a demonstration website that showcases common web security vulnerabilities in a clean, modern banking interface. It's designed to help developers and security researchers understand how these vulnerabilities work and how to prevent them.

## New Features (v2.0)

### 🗄️ Persistent Database
- **LocalStorage-based database** for persistent user accounts and data
- **User registration and login** with session management
- **Transaction storage** and search functionality
- **Slides management** for dynamic content

### 🎯 Interactive Slides
- **Information slides** with navigation controls
- **Add new slides** dynamically
- **Persistent storage** of slide content
- **Responsive design** for all devices

## Vulnerabilities Demonstrated

### 1. SQL Injection (Search Section)
- **Location**: Search Transactions functionality
- **Vulnerability**: Direct string concatenation in simulated SQL queries
- **Test Payloads**:
  - `' OR 1=1--`
  - `'; DROP TABLE users--`
  - `' UNION SELECT * FROM users--`
- **Impact**: Could allow unauthorized access to database data

### 2. Server-Side Request Forgery (SSRF) - Profile Section
- **Location**: User Profile loading functionality
- **Vulnerability**: No URL validation, allows internal network access
- **Test Payloads**:
  - `http://localhost:8080`
  - `http://127.0.0.1:3306`
  - `http://192.168.1.1`
  - `http://internal-service`
- **Impact**: Could expose internal network information and services

### 3. Regex Denial of Service (ReDoS) - Settings Section
- **Location**: Regex pattern testing functionality
- **Vulnerability**: No timeout protection on regex execution
- **Test Payloads**:
  - `(a+)+b`
  - `(a|aa)+b`
  - `(a|a?)+b`
- **Impact**: Could cause the application to hang or become unresponsive

## How to Run

1. **Simple HTTP Server** (Python 3):
   ```bash
   python -m http.server 8000
   ```

2. **Node.js HTTP Server**:
   ```bash
   npx http-server -p 8000
   ```

3. **PHP Built-in Server**:
   ```bash
   php -S localhost:8000
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:8000`

## Demo Credentials

- **Username**: `admin`
- **Password**: `admin123`

## Testing the Vulnerabilities

### SQL Injection Testing
1. Go to the Search section
2. Try entering: `' OR 1=1--`
3. Click Search
4. Observe the "SQL Injection Successful!" message

### SSRF Testing
1. Go to the Profile section
2. Enter: `http://localhost:8080`
3. Click Load Profile
4. See the SSRF attack detection message

### ReDoS Testing
1. Go to the Settings section
2. Enter: `(a+)+b`
3. Click Test Pattern
4. Watch for execution time warnings

## New Features Testing

### User Registration & Login
1. Click "Register" to create a new account
2. Use the new credentials to login
3. Observe persistent session management

### Slides Management
1. Navigate to the Slides section
2. Use Previous/Next buttons to browse slides
3. Click "Add Slide" to create new content
4. Notice how slides persist between sessions

## Security Best Practices (What NOT to do)

❌ **Never do these in production:**
- Direct string concatenation in SQL queries
- No input validation or sanitization
- No URL validation for external requests
- No timeout protection on regex operations
- Hardcoded credentials
- No rate limiting
- No input length restrictions
- Storing sensitive data in localStorage without encryption
- No CSRF protection on forms

## How to Fix These Vulnerabilities

### SQL Injection Prevention
```javascript
// ❌ Vulnerable
let query = `SELECT * FROM users WHERE id = '${userId}'`;

// ✅ Safe - Use parameterized queries
let query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);
```

### SSRF Prevention
```javascript
// ❌ Vulnerable
fetch(userProvidedUrl);

// ✅ Safe - Validate URLs
const allowedDomains = ['trusted.com', 'api.example.com'];
const url = new URL(userProvidedUrl);
if (!allowedDomains.includes(url.hostname)) {
    throw new Error('Invalid domain');
}
```

### ReDoS Prevention
```javascript
// ❌ Vulnerable
const regex = new RegExp(pattern);
regex.test(input);

// ✅ Safe - Add timeout protection
const timeout = setTimeout(() => {
    throw new Error('Regex timeout');
}, 1000);

try {
    const regex = new RegExp(pattern);
    const result = regex.test(input);
    clearTimeout(timeout);
    return result;
} catch (error) {
    clearTimeout(timeout);
    throw error;
}
```

### Secure Data Storage
```javascript
// ❌ Vulnerable - Plain localStorage
localStorage.setItem('user', JSON.stringify(userData));

// ✅ Safe - Encrypted storage
const encryptedData = encrypt(JSON.stringify(userData));
localStorage.setItem('user', encryptedData);
```

## Educational Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [SSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)
- [ReDoS Prevention](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
- [Client-Side Storage Security](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#client-side-storage)

## SEO "Visibility Killer" (Demo Only)

- Meta tags added in `index.html`: `noindex, nofollow, noarchive, nosnippet` to prevent indexing.
- `robots.txt` disallows all crawling (`Disallow: /`).
- Canonical set to an invalid domain to sabotage discovery.

To re-enable visibility, remove the meta robots tags, set a correct canonical, and update `robots.txt` to allow crawling.

## Disclaimer

This project is created solely for educational purposes to demonstrate common web security vulnerabilities. The authors are not responsible for any misuse of this code. Always practice responsible disclosure and never test vulnerabilities on systems you don't own or have explicit permission to test.

## License

This project is for educational use only. Use at your own risk.
