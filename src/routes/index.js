import express from 'express';

const router = express.Router();
import { isLoggedIn, isNotLoggedIn } from '../lib/auth';

router.get('/',isNotLoggedIn, (req,res)=>{
    res.render('index',{'isCover':true});
});

module.exports = router;
