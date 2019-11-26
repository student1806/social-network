const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/social"
);

module.exports.addUser = function(firstname, lastname, email, password) {
    return db.query(
        "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
        [firstname, lastname, email, password]
    );
};

module.exports.getUser = function(email) {
    return db.query(
        `SELECT users.id AS u_id, * FROM users
        FULL OUTER JOIN signatures
        ON users.id = signatures.users_id
        WHERE email = $1`,
        [email]
    );
};
