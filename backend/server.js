require("dotenv").config()
let express = require("express")
let mainRouter = require("./routes")

const INITIALISING_DB = false

let runExpress = () => {
    let app = express()
    app.use(mainRouter)
    app.listen(process.env.WEB_PORT)
    console.log("Listening on PORT "+process.env.WEB_PORT)
}

;(async () => {
  try {
    let client = await require("./database/connect.js")()
    if(INITIALISING_DB)
      await require("./database/initialiseDatabase")(client)
    runExpress()
  } catch(e) {console.log(e)}
})()