const { Router } = require('express');

module.exports = Router().post('/secrets', async (req, res, next) => {
  try {
    const secrets = [
      {
        id: '1',
        title: 'secrets',
        description: 'ill never tell',
        user_id: '1',
      },
    ];

    res.send(secrets);
  } catch (error) {
    next(error);
  }
});
