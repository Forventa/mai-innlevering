const UserService = require('../services/userService');
const userService = new UserService();

async function isAuth(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Basic ')) {
            return res.status(401).json({ success: false, message: 'Missing or invalid Authorization header' });
        }


        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        const isValid = await userService.checkPassword(username, password);
        

        if (!isValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }



        next(); 
    } catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong during authentication' });
    }
}

module.exports = isAuth;