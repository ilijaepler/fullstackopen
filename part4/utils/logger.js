const info = (...params) => {
    console.log(...params)
}

const error = (...params) => {
    console.error(...paramas)
}

module.exports = {
    info, error
}