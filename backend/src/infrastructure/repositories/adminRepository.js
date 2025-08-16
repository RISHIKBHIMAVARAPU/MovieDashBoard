import Admin from '../databaseModels/admin.js';

export const getAdminByPhoneNo = async (phoneNo) => {
  try {
    const admin = await Admin.findOne({ phoneNo });
    return admin;
  } catch (error) {
    console.error('Error fetching admin by Phone No:', error);
    throw error;
  }
};
