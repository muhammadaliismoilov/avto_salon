const carsValidation = require("../Validator/cars.validator")

const validatorCars = async (req,res,next) =>{
    try {
        const {error} = await carsValidation(req.body)
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
module.exports = validatorCars