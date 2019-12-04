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

module.exports.getNewUsers = () => {
    return db.query(
        `SELECT id, firstname, lastname, url FROM users
        ORDER BY created_at DESC
        LIMIT 3
        `
    );
};

module.exports.searchUsers = val => {
    return db.query(
        `SELECT id, firstname, lastname, url FROM users 
        WHERE firstname ILIKE $1
        LIMIT 4`,
        [val + "%"]
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

module.exports.friendStatus = (userId, otherId) => {
    return db.query(
        `SELECT * FROM friendships 
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)`,
        [otherId, userId]
    );
};

module.exports.friendRequest = (otherId, userId) => {
    return db.query(
        `INSERT INTO friendships (receiver_id, sender_id)
        VALUES ($1, $2)
        RETURNING *`,
        [otherId, userId]
    );
};

module.exports.upDateFriendRequest = (userId, otherId) => {
    return db.query(
        `
        UPDATE friendships SET accepted= $3 
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)`,
        [otherId, userId, true]
    );
};

module.exports.deleteFriendRequest = (userId, otherId) => {
    return db.query(
        `
        DELETE FROM friendships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)`,
        [otherId, userId]
    );
};
