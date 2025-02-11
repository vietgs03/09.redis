const dev = {
    app: {
        port :process.env.DEV_APP_PORT ||3000
    },
    db: {
        host:process.env.DEV_DB_HOST || 'localhost',
        port:process.env.DEV_DB_PORT || '5432',
        name:process.env.DEV_DB_NAME || 'demo',
        user:process.env.DEV_DB_USER || 'user',
        password:process.env.DEV_DB_PASSWORD || 'pass'
    }
}
const product = {
    app: {
        port :process.env.PRODUCT_APP_PORT || 3000
    },
    db: {
        host:process.env.PRODUCT_DB_HOST || 'localhost',
        port:process.env.PRODUCT_DB_PORT || '27017',
        name:process.env.PRODUCT_DB_NAME || 'shopDevPRODUCT'
    }
}
const config={dev,product}
const env = process.env.NODE_ENV || 'dev'
console.log(config[env],env)
module.exports=config[env]