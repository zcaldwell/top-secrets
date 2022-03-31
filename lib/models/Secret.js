const pool = require('../utils/pool');

module.exports = class Secret {
  id;
  title;
  description;
  createdAt;
  userId;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
    this.createdAt = row.created_at;
    this.userId = row.user_id;
  }

  static async insert({ title, description, createdAt, userId }) {
    const { rows } = await pool.query(
      `
          INSERT INTO
            secrets (title, description, created_at, user_id)
          VALUES
            ($1, $2, $3, $4)
          RETURNING
            *
          `,
      [title, description, createdAt, userId]
    );
    return new Secret(rows[0]);
  }
};
