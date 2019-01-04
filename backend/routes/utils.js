let crypto = require("crypto")
let client; (async() => client = await require("../database/connect.js")())()
let {SESSION_LIFETIME_SECONDS} = require("../config/index.js")

module.exports = {
  SALT: "afhdsoigfdohbjodigbpogdhpod",
  hash: (str) => crypto.createHash("sha256").update(str + this.SALT).digest("hex"),

  createUserSession: async(userId) => {
    let session = crypto.randomBytes(32).toString("hex")
    await client.query("INSERT INTO sessions(user_id, value) VALUES($1, $2)", [userId, session])
    return session
  },

  getApiName: fileName => fileName.split("\\").pop().slice(0, -3),

  //frontendStringIsClean: str =>  // No XSS for you :D

  validateUserSession: async(session) => {
    let r = (await client.query(`SELECT id FROM sessions WHERE value=$1 AND creation_date > (CURRENT_TIMESTAMP - INTERVAL '${SESSION_LIFETIME_SECONDS} seconds')`, [session])).rows
    // console.log(session)
    // console.log(r)
    return r.length > 0
  }
}