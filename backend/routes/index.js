let express = require("express")
let router = express.Router()

let apiNames = ["register", "login", "createBoard", "deleteBoard", "editBoard", "viewMyBoards", "sendBoardInvitation", "answerBoardInvitation"]

router.use(express.json())
for(let apiName of apiNames)
  router.use(require(`./${apiName}`))

module.exports = router