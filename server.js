const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Data file setup
const dataDir = path.join(__dirname, 'data');
const usersFilePath = path.join(dataDir, 'users.json');
const transactionsFilePath = path.join(dataDir, 'transactions.json');
const profilesFilePath = path.join(dataDir, 'profiles.json');

function ensureDataFileExists() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([] , null, 2), 'utf8');
  }
  if (!fs.existsSync(transactionsFilePath)) {
    fs.writeFileSync(transactionsFilePath, JSON.stringify([] , null, 2), 'utf8');
  }
  if (!fs.existsSync(profilesFilePath)) {
    fs.writeFileSync(profilesFilePath, JSON.stringify([] , null, 2), 'utf8');
  }
}

function readUsersFromFile() {
  ensureDataFileExists();
  const raw = fs.readFileSync(usersFilePath, 'utf8');
  try {
    const parsed = JSON.parse(raw || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (_err) {
    return [];
  }
}

function writeUsersToFile(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
}

function readTransactionsFromFile() {
  ensureDataFileExists();
  const raw = fs.readFileSync(transactionsFilePath, 'utf8');
  try {
    const parsed = JSON.parse(raw || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (_err) {
    return [];
  }
}

function writeTransactionsToFile(transactions) {
  fs.writeFileSync(transactionsFilePath, JSON.stringify(transactions, null, 2), 'utf8');
}

function readProfilesFromFile() {
  ensureDataFileExists();
  const raw = fs.readFileSync(profilesFilePath, 'utf8');
  try {
    const parsed = JSON.parse(raw || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (_err) {
    return [];
  }
}

function writeProfilesToFile(profiles) {
  fs.writeFileSync(profilesFilePath, JSON.stringify(profiles, null, 2), 'utf8');
}

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Get all users (for quick verification)
app.get('/api/users', (_req, res) => {
  const users = readUsersFromFile();
  res.json({ users });
});

// Register endpoint: save name/username, email, password
app.post('/api/register', (req, res) => {
  const { name, username, email, password } = req.body || {};

  // Minimal validation (demo): require at least one of name/username
  const providedName = name || username;
  if (!providedName || !email || !password) {
    return res.status(400).json({ error: 'name/username, email and password are required' });
  }

  const users = readUsersFromFile();

  // Prevent duplicate by email or username
  const exists = users.find(u => (email && u.email === email) || (username && u.username === username));
  if (exists) {
    return res.status(409).json({ error: 'User with same email or username already exists' });
  }
  const newUser = {
    id: users.length + 1,
    name: providedName,
    username: username || providedName,
    email,
    password, // Intentionally stored as plain text for this educational demo
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  writeUsersToFile(users);

  // Create initial transaction record for this user
  const transactions = readTransactionsFromFile();
  const newTransaction = {
    id: transactions.length + 1,
    userId: newUser.id,
    type: 'system',
    description: 'Account created',
    amount: 0,
    date: new Date().toISOString()
  };
  transactions.push(newTransaction);
  writeTransactionsToFile(transactions);

  // Create a basic profile entry for this user
  const profiles = readProfilesFromFile();
  const newProfile = {
    userId: newUser.id,
    content: `Welcome ${newUser.name}! This is your profile.`,
    updatedAt: new Date().toISOString()
  };
  profiles.push(newProfile);
  writeProfilesToFile(profiles);

  res.status(201).json({ message: 'Registered successfully', user: { id: newUser.id, name: newUser.name, email: newUser.email } });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { identifier, password } = req.body || {};
  if (!identifier || !password) {
    return res.status(400).json({ error: 'identifier and password are required' });
  }

  const users = readUsersFromFile();
  const user = users.find(u => (u.email === identifier || u.username === identifier) && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    }
  });
});

// List transactions (optionally filter by userId)
app.get('/api/transactions', (req, res) => {
  const userId = req.query.userId ? Number(req.query.userId) : undefined;
  const transactions = readTransactionsFromFile();
  const result = userId ? transactions.filter(t => t.userId === userId) : transactions;
  res.json({ transactions: result });
});

// Get profile by userId
app.get('/api/profile/:userId', (req, res) => {
  const userId = Number(req.params.userId);
  const profiles = readProfilesFromFile();
  const profile = profiles.find(p => p.userId === userId);
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  res.json({ profile });
});

// Update profile content
app.post('/api/profile/:userId', (req, res) => {
  const userId = Number(req.params.userId);
  const { content } = req.body || {};
  if (!content) {
    return res.status(400).json({ error: 'content is required' });
  }
  const profiles = readProfilesFromFile();
  const index = profiles.findIndex(p => p.userId === userId);
  if (index === -1) {
    profiles.push({ userId, content, updatedAt: new Date().toISOString() });
  } else {
    profiles[index] = { userId, content, updatedAt: new Date().toISOString() };
  }
  writeProfilesToFile(profiles);
  res.json({ message: 'Profile updated' });
});

app.listen(PORT, () => {
  ensureDataFileExists();
  // eslint-disable-next-line no-console
  console.log(`API server listening on http://localhost:${PORT}`);
});


