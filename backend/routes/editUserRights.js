let router = require("express").Router()
let client; (async() => client = await require("../database/connect.js")())()
let {validateUserSession, getApiName} = require("./utils.js")

let apiName = getApiName(__filename)
router.post("/" + apiName, async(req, res) => {
  try {
    let {session, boardId, targetUsername, newRights} = req.body // newBoardData: {name}

    if(!(await validateUserSession(session)))
      return res.status(401).end()
    if(newRights.can_manage_users == undefined || newRights.can_manage_tasks == undefined || newRights.can_manage_board == undefined)
      return res.status(400).end()

    let userId = (await client.query("SELECT user_id FROM sessions WHERE value = $1", [session])).rows[0].user_id
    let targetUserId = (await client.query("SELECT id FROM users WHERE username = $1", [targetUsername])).rows[0].id
    if((await client.query("SELECT can_manage_users FROM user_to_board WHERE user_id = $1 AND board_id = $2", [userId, boardId])).rows[0].can_manage_users != true)
      return res.status(401).end()

    await client.query("UPDATE user_to_board SET can_manage_users = $1, can_manage_tasks = $2, can_manage_board = $3 WHERE user_id = $4", [newRights.can_manage_users, newRights.can_manage_tasks, newRights.can_manage_board, targetUserId])

    res.end()
  } catch(e) {
    console.log(e)
    res.status(500).end()
  }
})

module.exports = router