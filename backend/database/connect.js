require("dotenv").config()
let {Pool} = require("pg")

module.exports = async() => {
  let pool = new Pool()
  await pool.connect()

  return pool
}