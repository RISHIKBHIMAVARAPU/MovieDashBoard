export function validateUserSignup(data) {
  const { name, phoneNo, password } = data;
  if (!name || !phoneNo || !password) {
    throw new Error('All fields are required');
  }
  if (typeof name !== 'string' || typeof phoneNo !== 'string' || typeof password !== 'string') {
    throw new Error('Invalid data type');
  }
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }
}

export function validateUserLogin(data) {
  const { phoneNo, password } = data;
  if (!phoneNo || !password) {
    throw new Error('Phone number and password are required');
  }
  if (typeof phoneNo !== 'string' || typeof password !== 'string') {
    throw new Error('Invalid data type');
  }
}

export function validateUserLogout(data) {
  const { token } = data;
  if (!token) {
    throw new Error('Token is required for logout');
  }
  if (typeof token !== 'string') {
    throw new Error('Invalid token type');
  }
}

export function validateAdminLogin(data) {
  const { phoneNo, password } = data;  
  if (!phoneNo || !password) {
    throw new Error('Phone number and password are required');
  }
  if (typeof phoneNo !== 'string' || typeof password !== 'string') {
    throw new Error('Invalid data type'); 
  }
}
