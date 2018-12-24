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
    if((await client.query("SELECT id FROM user_to_board WHERE user_id = $1", [userId])).rows.length == 0)
      return res.status(404).end()
    await client.query("DELETE FROM user_to_board WHERE user_id = $1", [userId])

    res.end()
  } catch(e) {
    console.log(e)
    res.status(500).end()
  }
})

module.exports = router
