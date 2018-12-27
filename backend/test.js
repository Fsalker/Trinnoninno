let server = require("./server")
let test = require("mocha")
let request = require("request-promise-native")

const ERROR_SHOULD_HAVE_BEEN_THROWN = new Error("An error should have been thrown here!")

describe("User lifecycle", async() => {
  const USERNAME = "THISBEDAMOST1337USERNAME"
  const PASSWORD = "1MM4F1R3M4HL4YZ0RSW000SH"
  const USERNAME_2 = "THISBEDAMOST1337USERNAME2"
  const USERNAME_3 = "THISBEDAMOST1337USERNAME3"
  const BOARD_NAME = "The coolest board!! :D"
  const BOARD_NAME_2 = "The even cooler board!!! :DD"
  const HOST = `http://${process.env.WEB_HOST}:${process.env.WEB_PORT_TEST}`
  const TASK_TITLE = "Very cool task!! =D"
  const TASK_TITLE_2 = "EXTREMELY SUPER DUPER COOL TASK!!!! =D =D"
  const TASK_DESCRIPTION = "This is an appropriate description for the very cool task aforementioned! :D"
  let session
  let session_2
  let session_3
  let boardId
  let invitationId
  let taskId

  before(async() => {
    await server.main()
  })

  it("Should delete user", async() => {
    let data = {username: USERNAME, password: PASSWORD}
    let r = await request.post({url: `${HOST}/removeUser`, json: data})
  })

  it("Should delete the second user", async() => {
    let data = {username: USERNAME_2, password: PASSWORD}
    let r = await request.post({url: `${HOST}/removeUser`, json: data})
  })

  it("Should delete the third user", async() => {
    let data = {username: USERNAME_3, password: PASSWORD}
    let r = await request.post({url: `${HOST}/removeUser`, json: data})
  })

  it("Should register", async() => {
    let data = {username: USERNAME, password: PASSWORD}
    let r = await request.post({url: `${HOST}/register`, json: data})
    session = r.session
    console.log(session)
  })

  it("Should register the second account", async() => {
    let data = {username: USERNAME_2, password: PASSWORD}
    let r = await request.post({url: `${HOST}/register`, json: data})
    session_2 = r.session
  })

  it("Should register the third account", async() => {
    let data = {username: USERNAME_3, password: PASSWORD}
    let r = await request.post({url: `${HOST}/register`, json: data})
    session_3 = r.session
  })

  it("Should not register the same Username twice", async() => {
    try {
      let data = {username: USERNAME, password: PASSWORD}
      let r = await request.post({url: `${HOST}/register`, json: data})
      throw ERROR_SHOULD_HAVE_BEEN_THROWN
    } catch(e) {
      if(e == ERROR_SHOULD_HAVE_BEEN_THROWN)
        throw ERROR_SHOULD_HAVE_BEEN_THROWN
    }
  })

  it("Should login", async() => {
    let data = {username: USERNAME, password: PASSWORD}
    let r = await request.post({url: `${HOST}/login`, json: data})
  })

  it("Should not login with the wrong password", async() => {
    try {
      let data = {username: USERNAME, password: PASSWORD + "1"}
      let r = await request.post({url: `${HOST}/login`, json: data})
      throw ERROR_SHOULD_HAVE_BEEN_THROWN
    } catch(e) {
      if(e == ERROR_SHOULD_HAVE_BEEN_THROWN)
        throw ERROR_SHOULD_HAVE_BEEN_THROWN
    }
  })

  it("Should create board", async() => {
    let data = {session, boardName: BOARD_NAME}
    let r = await request.post({url: `${HOST}/createBoard`, json: data})
    boardId = r.boardId
  })

  it("Should not delete board when the wrong person deletes it", async () => {
    try {
      let data = {session: session_2, boardId}
      let r = await request.post({url: `${HOST}/deleteBoard`, json: data})
      throw ERROR_SHOULD_HAVE_BEEN_THROWN
    } catch(e) {
      if(e == ERROR_SHOULD_HAVE_BEEN_THROWN)
        throw ERROR_SHOULD_HAVE_BEEN_THROWN
    }
  })

  it("Should delete board", async() => {
    let data = {session, boardId}
    let r = await request.post({url: `${HOST}/deleteBoard`, json: data})
  })

  it("Should create board again", async() => {
    let data = {session, boardName: BOARD_NAME}
    let r = await request.post({url: `${HOST}/createBoard`, json: data})
    boardId = r.boardId
  })

  it("Should edit board", async() => {
    let data = {session, boardId, newBoardData: {"name": BOARD_NAME_2}}
    let r = await request.post({url: `${HOST}/editBoard`, json: data})
  })

  it("Should view boards and get proper boardId & boardName", async() => {
    let data = {session, boardId, newBoardData: {"name": BOARD_NAME_2}}
    let r = (await request.post({url: `${HOST}/viewMyBoards`, json: data}))[0]
    if(r.name != BOARD_NAME_2)
      throw new Error("Board name isn't correct!")
  })

  it("Should send board invitation", async() => {
    let data = {session, boardId, usernameInvitee: USERNAME_2}
    let r = await request.post({url: `${HOST}/sendBoardInvitation`, json: data})
  })

  it("Should not send board invitation when not having the adequate rights", async() => {
    try {
      let data = {session_2, boardId, usernameInvitee: USERNAME_3}
      let r = await request.post({url: `${HOST}/sendBoardInvitation`, json: data})
      throw ERROR_SHOULD_HAVE_BEEN_THROWN
    } catch(e) {
      if(e == ERROR_SHOULD_HAVE_BEEN_THROWN)
        throw ERROR_SHOULD_HAVE_BEEN_THROWN
    }
  })

  it("Should view board invitations", async() => {
    let data = {session: session_2}
    let r = await request.post({url: `${HOST}/viewBoardInvitations`, json: data})
    if(r.length == 0)
      throw new Error("There should be exactly 1 invitation here!")
    invitationId = r[0].id
  })

  it("Should accept board invitations", async() => {
    let data = {session: session_2, invitationId, accepting: true}
    let r = await request.post({url: `${HOST}/answerBoardInvitation`, json: data})
  })

  it("Should edit user rights", async() => {
    let data = {session, boardId, targetUsername: USERNAME_2, newRights:{can_manage_users: false, can_manage_tasks: false, can_manage_board: true}}
    let r = await request.post({url: `${HOST}/editUserRights`, json: data})
  })

  it("Should not be able to edit user rights without adequate rights", async() => {
    try{
      let data = {session: session_2, boardId, targetUsername: USERNAME, newRights:{can_manage_users: false, can_manage_tasks: false, can_manage_board: true}}
      let r = await request.post({url: `${HOST}/editBoardRights`, json: data})
      throw ERROR_SHOULD_HAVE_BEEN_THROWN
    } catch(e) {
      if(e == ERROR_SHOULD_HAVE_BEEN_THROWN)
        throw ERROR_SHOULD_HAVE_BEEN_THROWN
    }
  })

  it("Should view board, user #2 rights modified and 2 users in total", async() => {
    let data = {session, boardId, newBoardData: {"name": BOARD_NAME_2}}
    let r = (await request.post({url: `${HOST}/viewMyBoards`, json: data}))[0]
    if(r.users.length != 2)
      throw new Error("There should be exactly 2 users!")
    let secondUser = r.users[0].username == USERNAME_2 ? r.users[0] : r.users[1]
    if(secondUser.can_manage_users != false || secondUser.can_manage_board != true)
      throw new Error("The updated user rights are messed up!")
  })

  it("Should create task", async() => {
    let data = {session, boardId, title: TASK_TITLE, description: TASK_DESCRIPTION}
    let r = await request.post({url: `${HOST}/createTask`, json: data})
  })

  it("Should not create task without adequate rights", async() => {
    try{
      let data = {session: session_2, boardId, title: "Very cool task!! =D", description: "This is an appropriate description for the very cool task aforementioned! :D"}
      let r = await request.post({url: `${HOST}/createTask`, json: data})
      throw ERROR_SHOULD_HAVE_BEEN_THROWN
    } catch(e) {
      if(e == ERROR_SHOULD_HAVE_BEEN_THROWN)
        throw ERROR_SHOULD_HAVE_BEEN_THROWN
    }
  })

  it("Should view board tasks", async() => {
    let data = {session, boardId}
    let r = await request.post({url: `${HOST}/viewBoardTasks`, json: data})
    //console.log(r)
    if(r.length != 1)
      throw new Error("There should be exactly 1 task!")
    if(r[0].title != TASK_TITLE)
      throw new Error("The task's title is messed up!")
    taskId = r[0].id
  })

  it("Should edit task", async() => {
    let data = {session, boardId, taskId, newTaskData: {title: TASK_TITLE_2, description: TASK_DESCRIPTION}}
    let r = await request.post({url: `${HOST}/editTask`, json: data})
  })

  it("Should view changed board task", async() => {
    let data = {session, boardId}
    let r = await request.post({url: `${HOST}/viewBoardTasks`, json: data})
    if(r[0].title != TASK_TITLE_2)
      throw new Error("The task's title isn't appropriate!")
  })

  it("Should delete task", async() => {
    let data = {session, boardId, taskId}
    let r = await request.post({url: `${HOST}/deleteTask`, json: data})
  })

  it("Should view deleted board task", async() => {
    let data = {session, boardId}
    let r = await request.post({url: `${HOST}/viewBoardTasks`, json: data})
    if(r.length != 0)
      throw new Error("There should be no tasks left anymore!")
  })

  it("Should leave board", async() => {
    let data = {session, boardId}
    let r = await request.post({url: `${HOST}/leaveBoard`, json: data})
  })

  it("Should not leave board", async() => {
    try {
      let data = {session, boardId}
      let r = await request.post({url: `${HOST}/leaveBoard`, json: data})
      throw ERROR_SHOULD_HAVE_BEEN_THROWN
    } catch(e) {
      if(e == ERROR_SHOULD_HAVE_BEEN_THROWN)
        throw ERROR_SHOULD_HAVE_BEEN_THROWN
    }
  })
})