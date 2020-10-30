const router = require('express').Router()
const {Users, Addresses, Orders} = require('../db/index')

router.get('/', async(req, res, next) => { // api/users
  try {
    res.send(await Users.findAll());
  }
  catch (ex) {
    next (ex)
  }
})

router.get('/:userId', async(req, res, next) => { // single user profile
  try {
    const userProfile = await Users.findOne({
      where: {
        id: req.params.userId
      },
      include: [
        {
          model: Addresses
        },
        {
          model: Orders
        }
      ]
    });
    res.send(userProfile)
  }
  catch (ex) {
    next (ex)
  }
})

router.post('/', async(req,res,next) => { // create a user
  try {
    const newUser = await Users.create(req.body)
    res.status(201).send(newUser)
  }
  catch (ex) {
    next (ex)
  }
})

module.exports = router;
