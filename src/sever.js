const app = require("./app")
const {app:{port}} = require('./configs/config.postgres')

const sever = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
