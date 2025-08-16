import User from '../databaseModels/user.js';

export const getUserByPhoneNo = async (phoneNo) => {
  try {
    const user = await User.findOne({ phoneNo });
    return user;
  } catch (error) {
    console.error('Error fetching user by Phone No:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const newUser = new User(user);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
  console.error('Error creating user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
  console.error('Error deleting user:', error);
    throw error;
  }
};
