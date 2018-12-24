let router = require("express").Router()
let client; (async() => client = await require("../database/connect.js")())()
let {hash, validateUserSession} = require("./utils.js")

let apiName = __filename.split("\\").pop().slice(0, -3)
router.post("/" + apiName, async(req, res) => {
  try {
    let {session} = req.body

    if(!(await validateUserSession(session)))
      return res.status(401).end()

    let userId = (await client.query("SELECT id FROM sessions WHERE value = $1", [session])).rows[0].id
    let invitations = (await client.query("SELECT a.username, c.name FROM users a JOIN board_invitation b ON a.id = b.user_id_sender JOIN boards c ON b.board_id = c.id WHERE b.user_id_invitee = $1", [userId])).rows

    res.end(JSON.stringify(invitations))
  } catch(e) {
    console.log(e)
    res.status(500).end()
  }
})

module.exports = router