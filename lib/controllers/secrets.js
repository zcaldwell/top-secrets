const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Secret = require('../models/Secret');

module.exports = Router()
  .get('/', authenticate, authorize, async (req, res, next) => {
    try {
      const secrets = [
        {
          id: '1',
          title: 'secrets',
          description: 'ill never tell',
        },
      ];

      res.send(secrets);
    } catch (error) {
      next(error);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { title, createdAt, description } = req.body;
      const secret = await Secret.create({
        userId,
        title,
        createdAt,
        description,
      });
      res.send(secret);
    } catch (error) {
      next(error);
    }
  });
