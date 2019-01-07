let router = require("express").Router()
let client; (async() => client = await require("../database/connect.js")())()
let {validateUserSession, getApiName} = require("./utils.js")

let apiName = getApiName(__filename)
router.post("/" + apiName, async(req, res) => {
  try {
    let {session, invitationId, accepting} = req.body

    if(!(await validateUserSession(session)))
      return res.status(401).end()

    let userId = (await client.query("SELECT user_id FROM sessions WHERE value = $1", [session])).rows[0].user_id
    let resBoards = await client.query("SELECT board_id FROM board_invitation WHERE id = $1 AND user_id_invitee = $2", [invitationId, userId])
    if(resBoards.rows.length == 0)
      return res.status(404).end()
    let boardId = resBoards.rows[0].board_id

    if(accepting == true)
      await client.query("INSERT INTO user_to_board(user_id, board_id) VALUES($1, $2)", [userId, boardId])
    await client.query("DELETE FROM board_invitation WHERE id = $1", [invitationId])

    res.end()
  } catch(e) {
    console.log(e)
    res.status(500).end()
  }
})

module.exports = router