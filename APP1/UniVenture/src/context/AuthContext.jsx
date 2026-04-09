// ========================================
// AuthContext.jsx - Manages Login/Logout State
// We use React Context so any component can access the user
// ========================================

import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, setCurrentUser, getUsers, saveUsers } from '../data/seedData';

// Step 1: Create a Context (like a global variable for React)
const AuthContext = createContext(null);

// Step 2: Create a Provider component that wraps our app
export function AuthProvider({ children }) {
  // This holds the logged-in user (null if not logged in)
  const [user, setUser] = useState(null);

  // On page load, check if user was previously logged in
  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Login function — checks email & password against stored users
  function login(email, password) {
    const allUsers = getUsers();
    const foundUser = allUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      setUser(foundUser);
      setCurrentUser(foundUser); // save to localStorage
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  }

  // Signup function — creates a new user
  function signup(name, email, password, role) {
    const allUsers = getUsers();

    // Check if email already exists
    if (allUsers.find(u => u.email === email)) {
      return { success: false, message: 'Email already exists' };
    }

    // Create new user object
    const newUser = {
      id: 'user-' + Date.now(),
      name: name,
      email: email,
      password: password,
      role: role,
      bio: '',
      skills: [],
      savedStartups: [],
      collaborationRequests: []
    };

    // Save to localStorage
    allUsers.push(newUser);
    saveUsers(allUsers);
    setUser(newUser);
    setCurrentUser(newUser);
    return { success: true };
  }

  // Logout function
  function logout() {
    setUser(null);
    setCurrentUser(null);
  }

  // Update user profile
  function updateUser(newData) {
    const allUsers = getUsers();
    const index = allUsers.findIndex(u => u.id === user.id);
    if (index !== -1) {
      allUsers[index] = { ...allUsers[index], ...newData };
      saveUsers(allUsers);
      setUser(allUsers[index]);
      setCurrentUser(allUsers[index]);
    }
  }

  // Step 3: Provide these values to all child components
  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Step 4: Custom hook — use this in any component to get user data
// Usage: const { user, login, logout } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}
