const express = require('express');
const Users = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.route('/').get(async (req, res, next)=>{
    try {
        const users = await Users.findAll();
        res.json(users);
    }catch (e) {
        console.error(e);
        next(e);
    }
})
.post(async (req, res, next)=>{
    try {
        const user = await Users.create({
            name:req.body.name,
            age:req.body.age,
            married:req.body.married,
        });
        console.log(user);
        res.status(201).json(user);
    }catch (e) {
        console.error(e)
        next(e)
    }
});

router.get('/:id/comments', async (req, res, next)=>{
    try {
        const comments = await Comment.findAll({
            include:{
                model:Users,
                where:{id:req.params.id},
            },
        });
        console.log(comments);
        res.json(comments);
    }catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;