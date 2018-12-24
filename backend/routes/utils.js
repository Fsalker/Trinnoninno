let crypto = require("crypto")
let client; (async() => client = await require("../database/connect.js")())()

module.exports = {
  SALT: "afhdsoigfdohbjodigbpogdhpod",
  hash: (str) => crypto.createHash("sha256").update(str + this.SALT).digest("hex"),

  createUserSession: async(userId) => {
    let session = crypto.randomBytes(32).toString("hex")
    await client.query("INSERT INTO sessions(user_id, value) VALUES($1, $2)", [userId, session])
    return session
  },

  //frontendStringIsClean: str =>  // No XSS for you :D

  validateUserSession: async(session) => (await client.query("SELECT id FROM sessions WHERE value=$1", [session])).rows.length > 0
}