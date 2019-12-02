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
        `SELECT * FROM users
        WHERE email = $1`,
        [email]
    );
};

module.exports.getUserInfo = function(id) {
    return db.query(
        `SELECT id, firstname, lastname, email, url, bio FROM users
        WHERE id = $1`,
        [id]
    );
};
module.exports.updateImage = function(url, id) {
    return db.query(
        `UPDATE users SET url=$1
        WHERE id=$2
        RETURNING *`,
        [url, id]
    );
};

module.exports.updateBio = (bio, id) => {
    return db.query(
        `UPDATE users SET bio=$1
        WHERE id=$2
        RETURNING bio`,
        [bio, id]
    );
};
