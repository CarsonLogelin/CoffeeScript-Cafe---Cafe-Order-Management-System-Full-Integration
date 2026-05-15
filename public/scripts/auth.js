// auth.js
import { api } from './api.js';

export const auth = {
  // Check if user is logged in
  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  },

  // Get stored student data
  getCustomer() {
    const customerData = localStorage.getItem('customer');
    return customerData ? JSON.parse(customerData) : null;
  },

  getStudent(){
    const studentData = localStorage.getItem('student');
    return studentData ? JSON.parse(studentData) : null;
  },
  // Login
  async login(email, password) {
    const data = await api.login(email, password);

    // Store token and student data
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    if (data.student){
      localStorage.setItem('student', JSON.stringify(data.student));
    }
    else{
      localStorage.removeItem('student');
    }

    return data;
  },

  // Register
  async register(userData) {
    return api.register(userData);
  },

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('student');
  },
};
