
//validate middleware which catch joi error and tell us 
export const validate = (schema) => (req, res, next) => {
    // Check if req.body is undefined or null
    if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Request body is empty. Make sure to send data with Content-Type: application/json header"
        });
    }

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    next();
};