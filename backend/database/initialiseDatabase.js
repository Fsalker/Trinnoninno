module.exports = async(client) => {
  await client.query("DROP TABLE IF EXISTS users")
  await client.query("DROP TABLE IF EXISTS sessions")
  await client.query("DROP TABLE IF EXISTS boards")
  await client.query("DROP TABLE IF EXISTS tasks")
  await client.query("DROP TABLE IF EXISTS board_invitation")
  await client.query("DROP TABLE IF EXISTS user_to_board")

  await client.query(`CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`)

  await client.query(`CREATE TABLE sessions(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    value TEXT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`)

  await client.query(`CREATE TABLE boards(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    name TEXT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`)

  await client.query(`CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    board_id INTEGER,
    title TEXT,
    description TEXT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`)

  await client.query(`CREATE TABLE board_invitation(
    id SERIAL PRIMARY KEY,
    user_id_sender INTEGER,
    user_id_invitee INTEGER,
    board_id INTEGER,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`)

  await client.query(`CREATE TABLE user_to_board(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    board_id INTEGER,
    can_manage_users BOOLEAN DEFAULT false,
    can_manage_tasks BOOLEAN DEFAULT false,
    can_manage_board BOOLEAN DEFAULT false,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`)
}