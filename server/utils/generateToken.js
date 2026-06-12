import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'shopez_super_secret_key_12345', {
    expiresIn: '30d'
  });
};

export default generateToken;
