const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Secret = require('../models/Secret');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
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

  .post('/', authenticate, async (req, res, next) => {
    try {
      const { id } = req.user;
      const { title, description } = req.body;
      const secret = await Secret.create({
        id,
        title,
        description,
      });
      res.send(secret);
    } catch (error) {
      next(error);
    }
  });
