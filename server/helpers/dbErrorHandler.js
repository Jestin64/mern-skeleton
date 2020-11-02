
const getErrorHandler = function (err) {
    let message = ''
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err)
                break
            default:
                message = 'Sorry, Something went wrong'
        }
    } else {
        if (errName in err.errors) {
            message = err.errors[errName].message
        }
    }
    return message
}

function getUniqueErrorMessage(err) {
    let output
    try {   
        let fieldName =
            err.message.substring(err.message.lastIndexOf('.$') + 2,
                err.message.lastIndexOf('_1'))
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists'
    } catch (err) {
        output = 'Unique field already exists'
    }
    return output
}

export default { getErrorHandler }