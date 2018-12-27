let express = require("express")
let router = express.Router()
let fs = require("fs")

//let apiNames = ["register", "login", "createBoard", "deleteBoard", "editBoard", "viewMyBoards", "sendBoardInvitation", "viewBoardInvitations", "answerBoardInvitation", "leaveBoard", "editUserRights"]
let files = fs.readdirSync(__dirname)
files = files.map(file => file.slice(0, -3))
files = files.filter(file => file != "index" && file != "utils")

router.use(express.json())
for(let apiName of files)
  router.use(require(`./${apiName}`))

module.exports = router