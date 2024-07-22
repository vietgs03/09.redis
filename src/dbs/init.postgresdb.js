const {Pool} = require('pg');
const {db:{host,port,name,user,password}} = require('../configs/config.postgres')

class Database {
    constructor() {
        this.connect()
    }

    connect(type = 'postgres') {
        this.pool = new Pool({
            host,
            port,
            database: name,
            user,
            password
        })
        this.pool.connect()
            .then(() => console.log(`Connected to ${type} database`))
            .catch(err => console.error('connection error', err.stack))
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instancePostgres = Database.getInstance();
module.exports = instancePostgres;