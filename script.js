// VULNERABLE WEBSITE - FOR EDUCATIONAL PURPOSES ONLY
// This demonstrates common security vulnerabilities

// Real database using localStorage for persistent storage
class Database {
    constructor() {
        this.initDatabase();
    }

    initDatabase() {
        if (!localStorage.getItem('securebank_users')) {
            // Initialize with realistic fake users
            const defaultUsers = [
                { 
                    id: 1, 
                    username: 'admin', 
                    password: 'admin123', 
                    email: 'admin@securebank.com', 
                    role: 'admin',
                    firstName: 'John',
                    lastName: 'Administrator',
                    phone: '+1-555-0100',
                    address: '123 Bank Street, Financial District, NY 10001',
                    accountNumber: '1001-2345-6789-0123',
                    balance: 125000.00,
                    lastLogin: '2024-01-21T10:30:00Z',
                    securityQuestions: {
                        q1: 'What was your first pet\'s name?',
                        a1: 'Fluffy',
                        q2: 'What city were you born in?',
                        a2: 'New York'
                    }
                },
                { 
                    id: 2, 
                    username: 'sarah.johnson', 
                    password: 'password123', 
                    email: 'sarah.johnson@email.com', 
                    role: 'user',
                    firstName: 'Sarah',
                    lastName: 'Johnson',
                    phone: '+1-555-0101',
                    address: '456 Oak Avenue, Suburbia, CA 90210',
                    accountNumber: '1002-3456-7890-1234',
                    balance: 45678.90,
                    lastLogin: '2024-01-21T09:15:00Z',
                    securityQuestions: {
                        q1: 'What was your first pet\'s name?',
                        a1: 'Buddy',
                        q2: 'What city were you born in?',
                        a2: 'Los Angeles'
                    }
                },
                { 
                    id: 3, 
                    username: 'mike.chen', 
                    password: 'qwerty', 
                    email: 'mike.chen@techcorp.com', 
                    role: 'user',
                    firstName: 'Mike',
                    lastName: 'Chen',
                    phone: '+1-555-0102',
                    address: '789 Tech Boulevard, Silicon Valley, CA 94025',
                    accountNumber: '1003-4567-8901-2345',
                    balance: 89234.56,
                    lastLogin: '2024-01-21T08:45:00Z',
                    securityQuestions: {
                        q1: 'What was your first pet\'s name?',
                        a1: 'Whiskers',
                        q2: 'What city were you born in?',
                        a2: 'San Francisco'
                    }
                },
                { 
                    id: 4, 
                    username: 'emma.wilson', 
                    password: 'secure456', 
                    email: 'emma.wilson@consulting.com', 
                    role: 'user',
                    firstName: 'Emma',
                    lastName: 'Wilson',
                    phone: '+1-555-0103',
                    address: '321 Business Park, Corporate City, TX 75001',
                    accountNumber: '1004-5678-9012-3456',
                    balance: 234567.89,
                    lastLogin: '2024-01-21T11:20:00Z',
                    securityQuestions: {
                        q1: 'What was your first pet\'s name?',
                        a1: 'Max',
                        q2: 'What city were you born in?',
                        a2: 'Dallas'
                    }
                },
                { 
                    id: 5, 
                    username: 'david.brown', 
                    password: 'brown789', 
                    email: 'david.brown@freelance.com', 
                    role: 'user',
                    firstName: 'David',
                    lastName: 'Brown',
                    phone: '+1-555-0104',
                    address: '654 Creative Lane, Arts District, FL 33101',
                    accountNumber: '1005-6789-0123-4567',
                    balance: 15678.45,
                    lastLogin: '2024-01-21T07:30:00Z',
                    securityQuestions: {
                        q1: 'What was your first pet\'s name?',
                        a1: 'Shadow',
                        q2: 'What city were you born in?',
                        a2: 'Miami'
                    }
                }
            ];
            localStorage.setItem('securebank_users', JSON.stringify(defaultUsers));
        }

        if (!localStorage.getItem('securebank_transactions')) {
            const defaultTransactions = [
                // Admin transactions
                { id: 1, user_id: 1, amount: 125000.00, description: 'Initial account funding', date: '2024-01-01', type: 'deposit', category: 'account', reference: 'ACC-001-2024' },
                { id: 2, user_id: 1, amount: -2500.00, description: 'Monthly mortgage payment', date: '2024-01-15', type: 'withdrawal', category: 'housing', reference: 'MORT-001-2024' },
                { id: 3, user_id: 1, amount: -150.00, description: 'Grocery shopping at Whole Foods', date: '2024-01-16', type: 'withdrawal', category: 'food', reference: 'POS-001-2024' },
                { id: 4, user_id: 1, amount: -89.99, description: 'Amazon purchase - Electronics', date: '2024-01-17', type: 'withdrawal', category: 'shopping', reference: 'ONL-001-2024' },
                { id: 5, user_id: 1, amount: 5000.00, description: 'Salary deposit from SecureCorp', date: '2024-01-20', type: 'deposit', category: 'income', reference: 'SAL-001-2024' },
                
                // Sarah Johnson transactions
                { id: 6, user_id: 2, amount: 45678.90, description: 'Account opening deposit', date: '2024-01-02', type: 'deposit', category: 'account', reference: 'ACC-002-2024' },
                { id: 7, user_id: 2, amount: -1200.00, description: 'Rent payment', date: '2024-01-05', type: 'withdrawal', category: 'housing', reference: 'RENT-001-2024' },
                { id: 8, user_id: 2, amount: -75.50, description: 'Gas station - Shell', date: '2024-01-10', type: 'withdrawal', category: 'transportation', reference: 'GAS-001-2024' },
                { id: 9, user_id: 2, amount: -45.00, description: 'Restaurant - Italian Bistro', date: '2024-01-12', type: 'withdrawal', category: 'food', reference: 'DINE-001-2024' },
                { id: 10, user_id: 2, amount: 3200.00, description: 'Freelance payment - Web Design', date: '2024-01-18', type: 'deposit', category: 'income', reference: 'FREEL-001-2024' },
                
                // Mike Chen transactions
                { id: 11, user_id: 3, amount: 89234.56, description: 'Investment account transfer', date: '2024-01-03', type: 'deposit', category: 'investment', reference: 'INV-001-2024' },
                { id: 12, user_id: 3, amount: -1800.00, description: 'Car loan payment', date: '2024-01-08', type: 'withdrawal', category: 'transportation', reference: 'CAR-001-2024' },
                { id: 13, user_id: 3, amount: -200.00, description: 'Utility bills - Electricity & Water', date: '2024-01-10', type: 'withdrawal', category: 'utilities', reference: 'UTIL-001-2024' },
                { id: 14, user_id: 3, amount: -120.00, description: 'Gym membership - Fitness Plus', date: '2024-01-15', type: 'withdrawal', category: 'health', reference: 'GYM-001-2024' },
                { id: 15, user_id: 3, amount: 8500.00, description: 'Salary deposit - TechCorp Inc', date: '2024-01-19', type: 'deposit', category: 'income', reference: 'SAL-002-2024' },
                
                // Emma Wilson transactions
                { id: 16, user_id: 4, amount: 234567.89, description: 'Business account funding', date: '2024-01-01', type: 'deposit', category: 'business', reference: 'BUS-001-2024' },
                { id: 17, user_id: 4, amount: -5000.00, description: 'Office rent payment', date: '2024-01-05', type: 'withdrawal', category: 'business', reference: 'OFFICE-001-2024' },
                { id: 18, user_id: 4, amount: -1500.00, description: 'Employee payroll - Consultant A', date: '2024-01-10', type: 'withdrawal', category: 'business', reference: 'PAY-001-2024' },
                { id: 19, user_id: 4, amount: -800.00, description: 'Marketing expenses - Digital Ads', date: '2024-01-15', type: 'withdrawal', category: 'business', reference: 'MKT-001-2024' },
                { id: 20, user_id: 4, amount: 25000.00, description: 'Client payment - Consulting Services', date: '2024-01-20', type: 'deposit', category: 'income', reference: 'CONS-001-2024' },
                
                // David Brown transactions
                { id: 21, user_id: 5, amount: 15678.45, description: 'Savings account transfer', date: '2024-01-04', type: 'deposit', category: 'savings', reference: 'SAV-001-2024' },
                { id: 22, user_id: 5, amount: -300.00, description: 'Insurance premium - Auto & Home', date: '2024-01-08', type: 'withdrawal', category: 'insurance', reference: 'INS-001-2024' },
                { id: 23, user_id: 5, amount: -65.00, description: 'Phone bill - Verizon', date: '2024-01-12', type: 'withdrawal', category: 'utilities', reference: 'PHONE-001-2024' },
                { id: 24, user_id: 5, amount: -180.00, description: 'Internet & Cable - Comcast', date: '2024-01-14', type: 'withdrawal', category: 'utilities', reference: 'INTERNET-001-2024' },
                { id: 25, user_id: 5, amount: 1200.00, description: 'Art commission payment', date: '2024-01-21', type: 'deposit', category: 'income', reference: 'ART-001-2024' }
            ];
            localStorage.setItem('securebank_transactions', JSON.stringify(defaultTransactions));
        }

        if (!localStorage.getItem('securebank_slides')) {
            const defaultSlides = [
                { id: 1, title: 'Welcome to SecureBank', content: 'Your trusted partner for secure online banking with 24/7 support and advanced security features.', active: true },
                { id: 2, title: 'Security Features', content: 'Advanced encryption, multi-factor authentication, and real-time fraud monitoring to protect your financial data.', active: false },
                { id: 3, title: 'Mobile Banking', content: 'Bank anywhere, anytime with our award-winning mobile app featuring biometric login and instant notifications.', active: false },
                { id: 4, title: 'Investment Services', content: 'Grow your wealth with our comprehensive investment portfolio management and financial planning services.', active: false },
                { id: 5, title: 'Business Solutions', content: 'Streamline your business finances with our corporate banking solutions, including payroll and merchant services.', active: false }
            ];
            localStorage.setItem('securebank_slides', JSON.stringify(defaultSlides));
        }

        if (!localStorage.getItem('securebank_accounts')) {
            const defaultAccounts = [
                { id: 1, user_id: 1, accountNumber: '1001-2345-6789-0123', type: 'checking', balance: 125000.00, currency: 'USD', status: 'active', opened: '2020-03-15' },
                { id: 2, user_id: 1, accountNumber: '1001-2345-6789-0124', type: 'savings', balance: 500000.00, currency: 'USD', status: 'active', opened: '2020-03-15' },
                { id: 3, user_id: 2, accountNumber: '1002-3456-7890-1234', type: 'checking', balance: 45678.90, currency: 'USD', status: 'active', opened: '2021-06-20' },
                { id: 4, user_id: 3, accountNumber: '1003-4567-8901-2345', type: 'checking', balance: 89234.56, currency: 'USD', status: 'active', opened: '2019-11-10' },
                { id: 5, user_id: 4, accountNumber: '1004-5678-9012-3456', type: 'business', balance: 234567.89, currency: 'USD', status: 'active', opened: '2018-09-05' },
                { id: 6, user_id: 5, accountNumber: '1005-6789-0123-4567', type: 'checking', balance: 15678.45, currency: 'USD', status: 'active', opened: '2022-01-12' }
            ];
            localStorage.setItem('securebank_accounts', JSON.stringify(defaultAccounts));
        }

        if (!localStorage.getItem('securebank_cards')) {
            const defaultCards = [
                { id: 1, user_id: 1, cardNumber: '4111-1111-1111-1111', type: 'credit', limit: 50000, balance: 1250.50, expiry: '2026-12', status: 'active' },
                { id: 2, user_id: 1, cardNumber: '5555-5555-5555-4444', type: 'debit', limit: null, balance: 0, expiry: '2027-08', status: 'active' },
                { id: 3, user_id: 2, cardNumber: '4000-0000-0000-0002', type: 'debit', limit: null, balance: 0, expiry: '2026-06', status: 'active' },
                { id: 4, user_id: 3, cardNumber: '5105-1051-0510-5100', type: 'credit', limit: 25000, balance: 3200.75, expiry: '2027-03', status: 'active' },
                { id: 5, user_id: 4, cardNumber: '3782-8224-6310-005', type: 'credit', limit: 100000, balance: 15450.25, expiry: '2026-09', status: 'active' },
                { id: 6, user_id: 5, cardNumber: '6011-1111-1111-1117', type: 'debit', limit: null, balance: 0, expiry: '2027-01', status: 'active' }
            ];
            localStorage.setItem('securebank_cards', JSON.stringify(defaultCards));
        }
    }

    getUsers() {
        return JSON.parse(localStorage.getItem('securebank_users') || '[]');
    }

    getTransactions() {
        return JSON.parse(localStorage.getItem('securebank_transactions') || '[]');
    }

    getSlides() {
        return JSON.parse(localStorage.getItem('securebank_slides') || '[]');
    }

    getAccounts() {
        return JSON.parse(localStorage.getItem('securebank_accounts') || '[]');
    }

    getCards() {
        return JSON.parse(localStorage.getItem('securebank_cards') || '[]');
    }

    addUser(user) {
        const users = this.getUsers();
        user.id = users.length + 1;
        users.push(user);
        localStorage.setItem('securebank_users', JSON.stringify(users));
        return user;
    }

    addTransaction(transaction) {
        const transactions = this.getTransactions();
        transaction.id = transactions.length + 1;
        transaction.date = new Date().toISOString().split('T')[0];
        transactions.push(transaction);
        localStorage.setItem('securebank_transactions', JSON.stringify(transactions));
        return transaction;
    }

    updateSlide(slideId, updates) {
        const slides = this.getSlides();
        const slideIndex = slides.findIndex(s => s.id === slideId);
        if (slideIndex !== -1) {
            slides[slideIndex] = { ...slides[slideIndex], ...updates };
            localStorage.setItem('securebank_slides', JSON.stringify(slides));
        }
    }

    getUserTransactions(userId) {
        return this.getTransactions().filter(t => t.user_id === userId);
    }

    getUserAccounts(userId) {
        return this.getAccounts().filter(a => a.user_id === userId);
    }

    getUserCards(userId) {
        return this.getCards().filter(c => c.user_id === userId);
    }
}

// Initialize database
const db = new Database();

// Transaction Search Function
function searchTransactions() {
    // Check if user is authenticated
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Please login to access transaction details');
        showLogin();
        return;
    }

    const searchTerm = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('searchResults');
    
    if (!searchTerm.trim()) {
        resultsDiv.innerHTML = '<div class="error-message">Please enter a search term</div>';
        return;
    }
    
    try {
        // Normal search using database
        const results = db.getTransactions().filter(t => 
            t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.id.toString() === searchTerm ||
            t.amount.toString().includes(searchTerm) ||
            t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.reference.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        displaySearchResults(results, resultsDiv);
        
    } catch (error) {
        resultsDiv.innerHTML = `<div class="error-message">Error: ${error.message}</div>`;
    }
}

function displaySearchResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = '<h4>No transactions found</h4>';
        return;
    }
    
    let html = '<h4>Search Results:</h4>';
    results.forEach(t => {
        const amountClass = t.amount >= 0 ? 'positive' : 'negative';
        html += `
            <div class="transaction-item">
                <div class="transaction-header">
                    <strong>ID:</strong> ${t.id} | 
                    <strong>Date:</strong> ${t.date} | 
                    <strong>Type:</strong> ${t.type} | 
                    <strong>Category:</strong> ${t.category}
                </div>
                <div class="transaction-details">
                    <strong>Description:</strong> ${t.description}
                </div>
                <div class="transaction-amount ${amountClass}">
                    <strong>Amount:</strong> $${Math.abs(t.amount).toFixed(2)} ${t.amount >= 0 ? '(Credit)' : '(Debit)'}
                </div>
                <div class="transaction-reference">
                    <strong>Reference:</strong> ${t.reference}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Display user profile information
function loadProfile() {
    // Check if user is authenticated
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Please login to access profile features');
        showLogin();
        return;
    }

    const user = JSON.parse(currentUser);
    const profileContent = document.getElementById('userProfileInfo');
    
    profileContent.innerHTML = `
        <div class="profile-details">
            <div class="profile-item">
                <strong>Full Name:</strong> ${user.firstName} ${user.lastName}
            </div>
            <div class="profile-item">
                <strong>Username:</strong> ${user.username}
            </div>
            <div class="profile-item">
                <strong>Email:</strong> ${user.email}
            </div>
            <div class="profile-item">
                <strong>Role:</strong> ${user.role}
            </div>
            <div class="profile-item">
                <strong>Account Number:</strong> ${user.accountNumber}
            </div>
            <div class="profile-item">
                <strong>Balance:</strong> $${user.balance.toLocaleString()}
            </div>
            <div class="profile-item">
                <strong>Phone:</strong> ${user.phone}
            </div>
            <div class="profile-item">
                <strong>Address:</strong> ${user.address}
            </div>
            <div class="profile-item">
                <strong>Last Login:</strong> ${new Date(user.lastLogin).toLocaleString()}
            </div>
        </div>
    `;
}





// Modal functions
function showLogin() {
    document.getElementById('loginModal').style.display = 'block';
}

function showRegister() {
    document.getElementById('registerModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Form submissions
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const identifier = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const resp = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier: identifier, password: password })
        });
        if (!resp.ok) {
            const err = await resp.json().catch(() => ({ error: 'Login failed' }));
            alert(err.error || 'Login failed');
            return;
        }
        const data = await resp.json();
        const apiUser = data.user;

        // Map to local demo DB user for rich UI fields
        let users = db.getUsers();
        let user = users.find(u => u.username === apiUser.username || u.email === apiUser.email);
        if (!user) {
            user = {
                username: apiUser.username,
                email: apiUser.email,
                password: password,
                role: 'user',
                firstName: (apiUser.name || apiUser.username || 'New').split(' ')[0] || 'New',
                lastName: (apiUser.name || '').split(' ').slice(1).join(' ') || 'User',
                phone: '+1-555-0000',
                address: 'New Address',
                accountNumber: '9999-9999-9999-9999',
                balance: 0.00,
                lastLogin: new Date().toISOString(),
                securityQuestions: {
                    q1: 'What was your first pet\'s name?',
                    a1: 'Unknown',
                    q2: 'What city were you born in?',
                    a2: 'Unknown'
                }
            };
            db.addUser(user);
        }

        alert(`Login successful! Welcome ${user.firstName} ${user.lastName} (${user.role}).\nAccount Balance: $${user.balance.toLocaleString()}`);
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        updateUserInterface(user);
        showAllPages();
        loadProfile(); // Auto-load profile information
        closeModal('loginModal');
    } catch (err) {
        alert(`Login error: ${err.message}`);
    }
});

document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if (name && username && email && password) {
        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, username: username, email: email, password: password })
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
                alert(`Registration failed: ${errorData.error || response.statusText}`);
                return;
            }
            const data = await response.json();

            // Also add to local demo database for UI continuity
            const newUser = {
                username: username,
                email: email,
                password: password,
                role: 'user',
                firstName: name.split(' ')[0] || 'New',
                lastName: name.split(' ').slice(1).join(' ') || 'User',
                phone: '+1-555-0000',
                address: 'New Address',
                accountNumber: '9999-9999-9999-9999',
                balance: Math.floor(Math.random() * 50000) + 1000, // Random balance between 1000-51000
                lastLogin: new Date().toISOString(),
                securityQuestions: {
                    q1: 'What was your first pet\'s name?',
                    a1: 'Unknown',
                    q2: 'What city were you born in?',
                    a2: 'Unknown'
                }
            };
            db.addUser(newUser);

            alert(`Registration successful for ${username}! (Saved to users.json)\nInitial balance: $${newUser.balance.toLocaleString()}`);
            // Auto-login after registration
            sessionStorage.setItem('currentUser', JSON.stringify(newUser));
            updateUserInterface(newUser);
            showAllPages();
            loadProfile(); // Auto-load profile information
            closeModal('registerModal');
        } catch (err) {
            alert(`Registration error: ${err.message}`);
        }
    } else {
        alert('Please fill in all fields.');
    }
});

function updateUserInterface(user) {
    // Update UI to show logged in user
    const userInfo = document.getElementById('userInfo');
    if (userInfo) {
        userInfo.innerHTML = `
            <span>Welcome, ${user.firstName} ${user.lastName} (${user.role})</span>
            <span class="balance">Balance: $${user.balance.toLocaleString()}</span>
            <button onclick="logout()" class="btn btn-secondary">Logout</button>
        `;
    }
}

function logout() {
    sessionStorage.removeItem('currentUser');
    showOnlyHome();
    location.reload();
}

// Add some demo data for testing
window.onload = function() {
    console.log('VULNERABLE WEBSITE LOADED - FOR EDUCATIONAL PURPOSES ONLY');
    console.log('Demo credentials: admin/admin123');
    console.log('SQL Injection examples: \' OR 1=1--, \'; DROP TABLE users--');
    console.log('SSRF examples: http://localhost:8080, http://127.0.0.1:3306');
    console.log('ReDoS examples: (a+)+b, (a|aa)+b, (a|a?)+b');
    console.log('Rich dataset includes: Users, Transactions, Accounts, Cards, Slides');
    

    
    // Check if user is logged in
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        updateUserInterface(JSON.parse(currentUser));
        showAllPages();
    } else {
        showOnlyHome();
    }
};

function showOnlyHome() {
    // Hide all sections except home
    document.querySelectorAll('main > section').forEach(section => {
        if (section.id !== 'home') {
            section.style.display = 'none';
        }
    });
    // Hide navigation menu items except home
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        if (link.getAttribute('href') !== '#home') {
            link.style.display = 'none';
        }
    });
}

function showAllPages() {
    // Show all sections
    document.querySelectorAll('main > section').forEach(section => {
        section.style.display = 'block';
    });
    // Show all navigation menu items
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.style.display = 'inline';
    });
}
