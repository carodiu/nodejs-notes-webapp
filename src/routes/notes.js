import  {Router} from 'express';

import {notes}  from '../controllers/notes.controller';

import { isLoggedIn } from '../lib/auth';

const router = Router();

router.get('/',  isLoggedIn, async(req,res)=>{
    const userId = req.user.id;
   
    let results = await notes.getByUserId(userId);
 
    res.render('notes/list',{notes:results});
   
});   
router.get('/add', isLoggedIn, async(req,res)=>{
   
    res.render('notes/add');
   
});    

router.post('/add',  isLoggedIn, async(req,res)=>{
    const { title, text } = req.body;
    const newNote = {
        title,
        text,        
        userId: req.user.id
    };
    let results = await notes.new(newNote);

    req.flash('success', 'Note has been saved successfully');
    res.redirect('/notes');
});

router.get('/delete/:id',  isLoggedIn, async(req,res)=>{   
   await notes.deleteById(req.params);
   req.flash('success', 'Note has been deleted successfully');
   res.redirect('/notes');
});

router.get('/edit/:id',  isLoggedIn, async(req,res)=>{   
    const item = await notes.getById(req.params);
    res.render('notes/edit', { note:item[0] });
 });
 
 router.post('/edit/:id',  isLoggedIn, async(req,res)=>{
    const id= req.params;
    const data= req.body;
    await notes.update(id, data);
    req.flash('success', 'Note has been updated successfully');
    res.redirect('/notes');
 });



module.exports = router;