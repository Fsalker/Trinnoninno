require("dotenv").config()
let express = require("express")
let mainRouter = require("./routes")

const INITIALISING_DB = false
const PORT = require.main === module ? process.env.WEB_PORT : process.env.WEB_PORT_TEST

let runExpress = async() => {
  return new Promise(resolve => {
    let app = express()
    app.use(mainRouter)
    app.listen(PORT)
    console.log("Listening on PORT " + PORT)
    resolve()
  })
}

let main = async () => {
  try {
    console.log("Running main...")
    let client = await require("./database/connect.js")()
    if(INITIALISING_DB)
      await require("./database/initialiseDatabase")(client)
    console.log("Starting server...")
    await runExpress()
  } catch(e) {console.log(e)}
}

if(require.main === module)
  main()

module.exports = {main}