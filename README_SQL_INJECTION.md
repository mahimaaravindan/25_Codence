# 🚨 SQL Injection Vulnerable Website Demo

This is an **intentionally vulnerable** website created for educational purposes to demonstrate SQL injection attacks and their consequences.

## ⚠️ IMPORTANT DISCLAIMER

**This website is intentionally vulnerable and should ONLY be used for educational purposes in controlled environments. Never deploy this on public servers or production systems.**

## 🎯 What This Demo Shows

1. **SQL Injection Vulnerabilities** - How attackers can manipulate database queries
2. **Credential Theft** - How attackers can steal user credentials
3. **Data Exposure** - How sensitive information can be leaked
4. **Security Awareness** - Why proper input validation is crucial

## 🚀 How to Use

1. Open `vulnerable_website.html` in your web browser
2. The website simulates a banking login system
3. Try the SQL injection attacks shown below

## 💥 SQL Injection Attack Examples

### Attack 1: Basic OR Injection
- **Email:** `admin@bank.com' OR '1'='1`
- **Password:** `anything`
- **What happens:** Bypasses authentication and exposes all user data

### Attack 2: UNION Attack
- **Email:** `' UNION SELECT email,password FROM users--`
- **Password:** `anything`
- **What happens:** Extracts all user credentials from the database

### Attack 3: Comment Injection
- **Email:** `admin@bank.com'--`
- **Password:** `anything`
- **What happens:** Comments out the password check

## 🔍 What You'll See

### For Attackers (Console):
- Stolen credentials logged to console
- Complete user database exposed
- Attack success confirmation

### For Victims:
- "Your Bank Account Has Been Compromised!" message
- List of security risks
- Immediate action recommendations

## 🛡️ How to Prevent SQL Injection

1. **Use Parameterized Queries** (Prepared Statements)
2. **Input Validation and Sanitization**
3. **Least Privilege Principle**
4. **Web Application Firewalls (WAF)**
5. **Regular Security Audits**

## 📚 Educational Value

This demo helps developers and security professionals understand:
- How SQL injection attacks work
- The real-world impact of security vulnerabilities
- Why proper coding practices matter
- How to implement secure authentication systems

## 🔧 Technical Details

- **Frontend:** HTML, CSS, JavaScript
- **Database Simulation:** JavaScript arrays
- **Vulnerability:** String concatenation in queries
- **Attack Detection:** Pattern matching for common SQL injection payloads

## 🎓 Learning Objectives

After using this demo, you should understand:
- SQL injection attack vectors
- The importance of input validation
- How to write secure database queries
- Real-world security implications

## ⚡ Quick Start

1. Download the HTML file
2. Open in any modern web browser
3. Try the attack examples above
4. Check the browser console for attacker view
5. Observe the victim experience

## 🚨 Security Notice

Remember: This is a **DEMONSTRATION ONLY**. The vulnerabilities shown here are intentionally implemented to teach security concepts. Never use these techniques on real systems without proper authorization.

## 📞 Support

This is an educational tool. For real security concerns, contact qualified security professionals.

---

**Stay Safe, Stay Secure! 🔒**
