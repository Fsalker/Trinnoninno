let router = require("express").Router()
let client; (async() => client = await require("../database/connect.js")())()
let {validateUserSession, getApiName} = require("./utils.js")

let apiName = getApiName(__filename)
router.post("/" + apiName, async(req, res) => {
  try {
    let {session, boardId, taskId} = req.body

    if(!(await validateUserSession(session)))
      return res.status(401).end()

    let userId = (await client.query("SELECT user_id FROM sessions WHERE value = $1", [session])).rows[0].user_id
    if((await client.query("SELECT can_manage_tasks FROM user_to_board WHERE user_id = $1 AND board_id = $2", [userId, boardId])).rows[0].can_manage_tasks != true)
      return res.status(401).end()
    await client.query("DELETE FROM tasks WHERE id=$1", [taskId])

    res.end()
  } catch(e) {
    console.log(e)
    res.status(500).end()
  }
})

module.exports = router