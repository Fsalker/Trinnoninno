let router = require("express").Router()
let client; (async() => client = await require("../database/connect.js")())()
let {validateUserSession, getApiName} = require("./utils.js")

let apiName = getApiName(__filename)
router.post("/" + apiName, async(req, res) => {
  try {
    let {session, boardId, newBoardData} = req.body // newBoardData: {name}

      console.log(req.body)
    console.log("1")
    if(!(await validateUserSession(session)))
      return res.status(401).end()

    let userId = (await client.query("SELECT user_id FROM sessions WHERE value = $1", [session])).rows[0].user_id
    console.log(userId)
    console.log(boardId)
    let resBoard = await client.query("SELECT can_manage_board FROM user_to_board WHERE user_id = $1 AND board_id = $2", [userId, boardId])
    if(resBoard.rows.length == 0 || resBoard.rows[0].can_manage_board != true)
      return res.status(401).end()
    await client.query("UPDATE boards SET name = $1 WHERE id = $2", [newBoardData.name, boardId])

    res.end()
  } catch(e) {
    console.log(e)
    res.status(500).end()
  }
})

module.exports = router
