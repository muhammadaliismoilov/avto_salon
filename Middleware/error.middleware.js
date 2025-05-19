const BaseError = require("../Utils/base.error")

module.exports = (err,req,res,next) => {
//xatolik BaseErrorda  bolsa 

if (err instanceof BaseError) {
    res.status(err.status).json({
        message:err.message,
        errors:err.message
    })
    return
}
//xatolik mongose vallidationerrorda bosa 
if (err.name === "ValidationError") {
    const errorMessages = Object.values(err.errors)
.map((error) => error.message)
res.status(400).json({
    message:"Validation Error",
    errors:errorMessages
})
}
//xatolik mongodb noyoblik xatolaridan bolsa 
if (err.code === 11000) {
    const fields = Object.keys(err.keyValue).join(",")
    res.status(400).json({
        message:`Duplicate value for fields : ${fields}`,
        errors:errorMessages
    })
}
//JWT yoki authentication bilan bogliq xatoliklar
if (err.name === "JsonWebTokenError") {
    res.status(401).json({
        message: "Invalid token"
    })
    return
}
if (err.name === "TokenExpiredError") {
    res.status(401).json({
        message: "Token has sxpired"
    })
    return
}
//umumiy xatoliklar
res.status(500).json({
    messagr:"Server error",
    errors:[err.message || "Unexpected error occured"]
})

}