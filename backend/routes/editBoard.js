let router = require("express").Router()
let client; (async() => client = await require("../database/connect.js")())()
let {hash, validateUserSession} = require("./utils.js")

let apiName = __filename.split("\\").pop().slice(0, -3)
router.post("/" + apiName, async(req, res) => {
  try {
    let {session, boardId, newBoardData} = req.body // newBoardData: {name}

    if(!(await validateUserSession(session)))
      return res.status(401).end()

    let userId = (await client.query("SELECT id FROM sessions WHERE value = $1", [session])).rows[0].id
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
