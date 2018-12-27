let router = require("express").Router()
let client; (async() => client = await require("../database/connect.js")())()
let {hash, validateUserSession, getApiName} = require("./utils.js")

let apiName = getApiName(__filename)
router.post("/" + apiName, async(req, res) => {
  try {
    let {username, password} = req.body
    password = hash(password)

    if((await client.query("SELECT id FROM users WHERE username = $1", [username])).rows.length == 0)
      return res.end()

    if((await client.query("SELECT id FROM users WHERE username = $1 AND password = $2", [username, password])).rows.length == 0)
      return res.status(401).end()

    let userId = (await client.query("SELECT id FROM users WHERE username=$1", [username])).rows[0].id
    await client.query("DELETE FROM users WHERE id=$1", [userId])
    await client.query("DELETE FROM sessions WHERE user_id=$1", [userId])
    await client.query("DELETE FROM user_to_board WHERE user_id=$1", [userId])
    await client.query("DELETE FROM board_invitation WHERE user_id_sender=$1 OR user_id_sender=$1", [userId])

    res.end()
  } catch(e) {
    console.log(e)
    res.status(500).end()
  }
})

module.exports = router