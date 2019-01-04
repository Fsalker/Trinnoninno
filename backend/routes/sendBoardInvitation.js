let router = require("express").Router()
let client; (async() => client = await require("../database/connect.js")())()
let {validateUserSession, getApiName} = require("./utils.js")

let apiName = getApiName(__filename)
router.post("/" + apiName, async(req, res) => {
  try {
    let {session, usernameInvitee, boardId} = req.body

    if(!(await validateUserSession(session)))
      return res.status(401).end()

    let userId = (await client.query("SELECT user_id FROM sessions WHERE value = $1", [session])).rows[0].user_id
    let userIdInvitee = (await client.query("SELECT id FROM users WHERE LOWER(username) = LOWER($1)", [usernameInvitee])).rows[0].id

    if((await client.query("SELECT can_manage_users FROM user_to_board WHERE user_id = $1", [userId])).rows[0].can_manage_users != true)
      return res.status(401).end()
    if((await client.query("SELECT id FROM users WHERE LOWER(username) = ($1)", [usernameInvitee])).rows.length == 0)
      return res.status(404).end()
    if((await client.query("SELECT id FROM board_invitation WHERE user_id_sender = $1 AND user_id_invitee = $2 AND board_id = $3", [userId, userIdInvitee, boardId])).rows.length > 0)
      return res.status(409).end("user already invited")
    if((await client.query("SELECT id FROM user_to_board WHERE user_id = $1 AND board_id = $2", [userIdInvitee, boardId])).rows.length > 0)
      return res.status(409).end("user is already in board")

    await client.query("INSERT INTO board_invitation(user_id_sender, user_id_invitee, board_id) VALUES($1, $2, $3)", [userId, userIdInvitee, boardId])
    res.end()
  } catch(e) {
    console.log(e)
    res.status(500).end()
  }
})

module.exports = router