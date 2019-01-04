let router = require("express").Router()
let client; (async() => client = await require("../database/connect.js")())()
let {validateUserSession, getApiName} = require("./utils.js")

let apiName = getApiName(__filename)
router.post("/" + apiName, async(req, res) => {
  try {
    let {session} = req.body

    if(!(await validateUserSession(session)))
      return res.status(401).end()

    res.end()
  } catch(e) {
    console.log(e)
    res.status(500).end()
  }
})

module.exports = router