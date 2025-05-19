const userValidation = require("../Validator/users.vallidator")

const validatorUser = async (req,res,next) =>{
    try {
        const {error} = await userValidation(req.body)
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        next()
    } catch (error) {
        throw new Error(error.message);
    }
}
module.exports = validatorUser