let router = require("express").Router()
let client; (async() => client = await require("../database/connect.js")())()
let {validateUserSession, getApiName} = require("./utils.js")

let apiName = getApiName(__filename)
router.post("/" + apiName, async(req, res) => {
  try {
    let {session, boardId} = req.body

    if(!(await validateUserSession(session)))
      return res.status(401).end()

    let userId = (await client.query("SELECT user_id FROM sessions WHERE value = $1", [session])).rows[0].user_id
    if((await client.query("SELECT id FROM user_to_board WHERE user_id = $1 AND board_id = $2", [userId, boardId])).rows.length == 0)
      return res.status(403).end()
    let tasks = (await client.query("SELECT id, description, title FROM tasks WHERE board_id = $1", [boardId])).rows

    res.end(JSON.stringify(tasks))
  } catch(e) {
    console.log(e)
    res.status(500).end()
  }
})

module.exports = router