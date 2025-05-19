const categoryValidation = require("../Validator/category.validator")

const validatorCategory = async (req,res,next) =>{
    try {
        const {error} = await categoryValidation(req.body)
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
module.exports = validatorCategory