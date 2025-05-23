import express from 'express'
import { signup,signin,google } from '../controllers/auth.controller.js';
import { signout } from '../controllers/user.controller.js';


const router = express.Router();


router.post('/signup',signup);
router.post('/signin',signin);
router.post('/signout',signout);
router.post('/google', google);

export default router;