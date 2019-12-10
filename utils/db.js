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

module.exports.getFriendList = userId => {
    return db.query(
        `
        SELECT users.id, firstname, lastname, url, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)
        `,
        [userId]
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

module.exports.getLastTenChatMessages = () => {
    return db.query(
        `SELECT firstname, lastname, url, message, messages.id FROM messages
        JOIN users
        ON sender_id = users.id
        ORDER BY messages.created_at DESC
        LIMIT 10`
    );
};

module.exports.addNewChatMessage = (id, message) => {
    return db.query(
        `INSERT INTO messages (sender_id, message)
        VALUES ($1, $2)
        RETURNING *`,
        [id, message]
    );
};

module.exports.getNewChatmessage = () => {
    return db.query(
        `
        SELECT firstname, lastname, url, message, users.id FROM messages
        JOIN users
        ON sender_id = users.id
        ORDER BY messages.created_at DESC
        LIMIT 1
        `
    );
};
