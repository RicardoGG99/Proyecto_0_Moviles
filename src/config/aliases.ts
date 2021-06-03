require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';

export default{
    jwtSecret: process.env.JWT_SECRET || 'wildtoken'
}