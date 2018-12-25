const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

app.post('/', (req, res) => {
    // requires a string with the field 'a'
    // string CANNOT be empty
    // const bodySchema = {
    //     a: Joi.string().required()
    // };

    // requires a string with the field name 'a'
    // string CAN be empty
    // const bodySchema = {
    //     a: Joi.string().allow('').required()
    // };

    // does not require a string with the field name 'a'
    // if given the field name 'a', the value must be a non-empty string
    const bodySchema = {
        a: Joi.string()
    };
    const result = Joi.validate(req.body, bodySchema);
    if (result.error) {
        res.send({
            success: false, 
            message: result.error.details[0].message
        });
        return
    }
    res.send({
        success: true
    });
});

app.post('/1', (req, res) => {
    // the 'a' field name in body schema is not required
    // if it is there, the value must be an array
    // the array can be empty 
    // or it can have 1 or more objects
    // those objects can have the field 'a', but is it not required
    // if an object does have a field name 'a', the value must be a non empty string
    const childSchema = {
        a: Joi.string()
    };
    const bodySchema = {
        a: Joi.array().items(childSchema)
    };
    const result = Joi.validate(req.body, bodySchema);
    if (result.error) {
        res.send({
            success: false, 
            message: result.error.details[0].message
        });
        return
    }
    res.send({
        success: true
    });
});

app.post('/2', (req, res) => {
    // the 'a' field name in body schema is not required
    // if it is there, the value must be an array
    // the array can be empty 
    // or it can have 1 or more objects
    // those objects must have the field 'a'
    // if an object does have a field name 'a', the value must be a non empty string
    const childSchema = {
        a: Joi.string().required()
    }
    const bodySchema = {
        a: Joi.array().items(childSchema)
    };
    const result = Joi.validate(req.body, bodySchema);
    if (result.error) {
        res.send({
            success: false, 
            message: result.error.details[0].message
        });
        return
    }
    res.send({
        success: true
    });
});

app.post('/3', (req, res) => {
    // the 'a' field name in body schema is required
    // the value must be an array
    // the array can be empty 
    // or it can have 1 or more objects
    // those objects must have the field 'b'
    // if an object does have a field name 'b', the value must be a non empty string
    const childSchema = {
        b: Joi.string().required()
    }
    const bodySchema = {
        a: Joi.array().items(childSchema).required()
    };
    const result = Joi.validate(req.body, bodySchema);
    if (result.error) {
        res.send({
            success: false, 
            message: result.error.details[0].message
        });
        return
    }
    res.send({
        success: true
    });
});

app.post('/4', (req, res) => {
    // the 'a' field name in body schema is required
    // the value must be an array
    // the array cannot be empty 
    // it needs at least one object
    // the fields of the objects don't have to be there
    const childSchema = Joi.object({
        b: Joi.string(),
        c: Joi.string()
    }).required();
    const bodySchema = {
        a: Joi.array().items(childSchema).required()
    };
    const result = Joi.validate(req.body, bodySchema);
    if (result.error) {
        res.send({
            success: false, 
            message: result.error.details[0].message
        });
        return
    }
    res.send({
        success: true
    });
});

app.post('/5', (req, res) => {
    // the 'a' field name in body schema is not required
    // if the 'a' field is there, the value must be an array
    // the array can be empty 
    // the items in the array must be in the valid list
    const bodySchema = {
        a: Joi.array().items(Joi.valid(['austin', 'derek', 'ricky', 'ginsu']))
    };
    const result = Joi.validate(req.body, bodySchema);
    if (result.error) {
        res.send({
            success: false, 
            message: result.error.details[0].message
        });
        return
    }
    res.send({
        success: true
    });
});

app.post('/6', (req, res) => {
    // the 'a' field name in body schema is required
    // the array must have at least 1 element
    // elements in the array must be in the array ['austin', 'derek', 'ricky', 'ginsu'] and the elements must be unique
    const bodySchema = {
        a: Joi.array().items(Joi.valid(['austin', 'derek', 'ricky', 'ginsu'])).min(1).unique().required()
    };
    const result = Joi.validate(req.body, bodySchema);
    if (result.error) {
        res.send({
            success: false, 
            message: result.error.details[0].message
        });
        return
    }
    res.send({
        success: true
    });
});

app.listen(3000);