const { createPool } = require("mysql");

const pool = createPool({
    host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
    user: "bsale_test",
    password: "bsale_test",
    database: "bsale_test",
});

function persistConnection() {

    new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {

            if (err) console.log('query connec error!', err);

            connection.query((err, rows) => {
                err ? reject(err) : resolve(rows)
            });
            connection.release();
        });

    });
};

setInterval(persistConnection, 120000);

module.exports = pool;