let router = require("express").Router()
let client; (async() => client = await require("../database/connect.js")())()
let {hash, validateUserSession, createUserSession, getApiName} = require("./utils.js")

let apiName = getApiName(__filename)
router.post("/" + apiName, async(req, res) => {
  try {
    let {username, password} = req.body
    password = hash(password)

    if((await client.query("SELECT id FROM users WHERE LOWER(username) = LOWER($1)", [username])).rows.length == 0)
      return res.status(404).end()

    if((await client.query("SELECT id FROM users WHERE LOWER(username) = LOWER($1) AND password = $2", [username, password])).rows.length == 0)
      return res.status(401).end()
    let userId = (await client.query("SELECT id FROM users WHERE LOWER(username) = LOWER($1)", [username])).rows[0].id
    let session = await createUserSession(userId)
    res.end(JSON.stringify({session}))
  } catch(e) {
    console.log(e)
    res.status(500).end()
  }
})

module.exports = router