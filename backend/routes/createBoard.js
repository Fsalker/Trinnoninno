let router = require("express").Router()
let client; (async() => client = await require("../database/connect.js")())()
let {validateUserSession, getApiName} = require("./utils.js")

let apiName = getApiName(__filename)
router.post("/" + apiName, async(req, res) => {
  try {
    let {session, boardName} = req.body

    if(!(await validateUserSession(session)))
      return res.status(401).end()

    let userId = (await client.query("SELECT user_id FROM sessions WHERE value = $1", [session])).rows[0].user_id
    let boardId = (await client.query("INSERT INTO boards(user_id, name) VALUES($1, $2) RETURNING id", [userId, boardName])).rows[0].id
    await client.query("INSERT INTO user_to_board(user_id, board_id, can_manage_users, can_manage_tasks, can_manage_board) VALUES($1, $2, true, true, true)", [userId, boardId])

    res.end(JSON.stringify({boardId}))
  } catch(e) {
    console.log(e)
    res.status(500).end()
  }
})

module.exports = router