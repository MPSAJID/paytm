const express = require('express');
const router = express.Router();
const z = require('zod');
const { User } = require('../db');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware');

const signupSchema = z.object({
    username: z.string().enmail().min(3).max(30).trim().toLowerCase(),
    firstName: z.string().max(50).trim(),
    lastName: z.string().max(50).trim(),
    password: z.string().min(6)
});

const signinSchema = z.object({
    username: z.string().email(),
    password: z.string()
});

const updateSchema = z.object({
    password: z.string().min(6),
    firstName: z.string().max(50).trim(),
    lastName: z.string().max(50).trim()
});


router.post('/signup', async (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(body);
    if (!success) {
        return res.status(411).json({
            message: "email taken / incorrect inputs"
        })
    }

    const existingUser = User.findOne({
        username: body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "email taken / incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userId = user._id;


    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_secret);

    res.status(200).json({
        message: "user created succesfully",
        token: token
    })


});


router.post('/signin', async (req, res) => {
    const body = req.body;
    const { success } = signinSchema.safeParse(body);
    if (!success) {
        return res.status(411).json({
            message: "incorrect email/password"
        })
    }

    const user = await User.findOne({
        username: body.username,
        password: body.password
    });

    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_secret);
        res.status(200).json({
            message: "signin successful",
            token: token
        });
    } else {
        res.status(411).json({
            message: "usernot found / signin error"
        });
    }

});


router.put('/', authMiddleware, async (req, res) => {
    const body = req.body;
    const { success } = updateSchema.safeParse(body);
    if (!success) {
        return res.status(411).json({
            message: "error updating / check inputs"
        })
    }

    await User.updateOne(body, {
        id: req.userId
    })
});


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;