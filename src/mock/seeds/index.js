import { login, sendOtp, verifyOtp, checkAuth, verifyToken, refreshToken } from './registration';

export const mockDataBase = {
  checkAuth,
  verifyToken,
  refreshToken,
  sendOtp,
  verifyOtp,
  login
};
