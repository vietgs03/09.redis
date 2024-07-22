const Test = require("../middlewares/test");
const {SuccessResponse} = require("../core/success.response");
class TestController {
    getSeat = async (req, res, next) => {
        new SuccessResponse({
            message:"get seat success",
            metadata: await Test.getSeats()
        }).send(res)
    }

    testCache = async (req, res, next) => {
        const id = req.params.id;
        new SuccessResponse({
            message:"get seat success",
            metadata: await Test.WADRA(id)
        }).send(res)
    }
}

module.exports = new TestController();