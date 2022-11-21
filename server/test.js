const text = '012dsf123q'

const bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10)
var hash = bcrypt.hashSync(text, salt)
console.log(bcrypt.compareSync(text, hash))