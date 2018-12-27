let router = require("express").Router()
let client; (async() => client = await require("../database/connect.js")())()
let {validateUserSession, getApiName} = require("./utils.js")

let apiName = getApiName(__filename)
router.post("/" + apiName, async(req, res) => {
  try {
    let {session, boardId, taskId, newTaskData} = req.body

    if(!(await validateUserSession(session)))
      return res.status(401).end()
    if(newTaskData.title == undefined || newTaskData.description == undefined)
      return res.status(400).end()

    let userId = (await client.query("SELECT user_id FROM sessions WHERE value = $1", [session])).rows[0].user_id
    if((await client.query("SELECT can_manage_tasks FROM user_to_board WHERE user_id = $1 AND board_id = $2", [userId, boardId])).rows[0].can_manage_tasks != true)
      return res.status(401).end()
    if((await client.query("SELECT id FROM tasks WHERE id = $1", [taskId])).rows.length == 0)
      return res.status(404).end()
    await client.query("UPDATE tasks SET title=$1, description=$2 WHERE id = $3", [newTaskData.title, newTaskData.description, taskId])

    res.end()
  } catch(e) {
    console.log(e)
    res.status(500).end()
  }
})

module.exports = router