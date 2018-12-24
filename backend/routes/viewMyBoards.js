let router = require("express").Router()
let client; (async() => client = await require("../database/connect.js")())()
let {hash, validateUserSession} = require("./utils.js")

let apiName = __filename.split("\\").pop().slice(0, -3)
router.post("/" + apiName, async(req, res) => {
  try {
    let {session} = req.body // newBoardData: {name}

    if(!(await validateUserSession(session)))
      return res.status(401).end()

    let userId = (await client.query("SELECT id FROM sessions WHERE value = $1", [session])).rows[0].id
    let resBoards = (await client.query("SELECT a.id, a.name, b.can_manage_users, b.can_manage_tasks, b.can_manage_board FROM boards a JOIN user_to_board b ON a.id = b.board_id WHERE a.user_id = $1", [userId])).rows
    for(let board of resBoards){
      if((await client.query("SELECT can_manage_users FROM user_to_board WHERE user_id = $1", [userId])).rows[0].can_manage_users == true)
        board.users = (await client.query("SELECT a.id, a.username, b.can_manage_users, can_manage_tasks, can_manage_board FROM users a JOIN user_to_board b ON a.id = b.user_id WHERE b.board_id = $1", [board.id])).rows//.reduce((acc, elem) => acc.concat(elem.username), [])
      else
        board.users = (await client.query("SELECT a.id, a.username FROM users a JOIN user_to_board b ON a.id = b.user_id WHERE b.board_id = $1", [board.id])).rows//.reduce((acc, elem) => acc.concat(elem.username), [])
    }

    res.end(JSON.stringify(resBoards))
  } catch(e) {
    console.log(e)
    res.status(500).end()
  }
})

module.exports = router
