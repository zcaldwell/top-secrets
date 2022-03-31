const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

module.exports = Router().get(
  '/',
  authenticate,
  authorize,
  async (req, res, next) => {
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
  }
);
