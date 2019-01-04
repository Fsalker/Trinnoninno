export const UPDATE_REGISTER_USERNAME = "UPDATE_REGISTER_USERNAME"
export const UPDATE_REGISTER_PASSWORD = "UPDATE_REGISTER_PASSWORD"
export const UPDATE_REGISTER_ALERT = "UPDATE_REGISTER_ALERT"
export const UPDATE_LOGIN_USERNAME = "UPDATE_LOGIN_USERNAME"
export const UPDATE_LOGIN_PASSWORD = "UPDATE_LOGIN_PASSWORD"
export const UPDATE_LOGIN_ALERT = "UPDATE_LOGIN_ALERT"
export const UPDATE_SESSION_SESSIONHASH = "UPDATE_SESSION_SESSIONHASH"
export const UPDATE_CREATE_BOARD_NAME = "UPDATE_CREATE_BOARD_NAME"
export const UPDATE_CREATE_BOARD_ALERT = "UPDATE_CREATE_BOARD_ALERT"
export const UPDATE_MY_BOARDS_LIST = "UPDATE_MY_BOARDS_LIST"
export const UPDATE_MY_BOARDS_CURRENTLY_OPEN_BOARD_ID = "UPDATE_MY_BOARDS_CURRENTLY_OPEN_BOARD_ID"
export const UPDATE_DELETE_ACCOUNT_USERNAME = "UPDATE_DELETE_ACCOUNT_USERNAME"
export const UPDATE_DELETE_ACCOUNT_PASSWORD = "UPDATE_DELETE_ACCOUNT_PASSWORD"
export const UPDATE_INVITATION_LIST = "UPDATE_INVITATION_LIST"
export const UPDATE_INVITATION_USERNAME = "UPDATE_INVITATION_USERNAME"
export const UPDATE_INVITATION_SEND_ALERT = "UPDATE_INVITATION_SEND_ALERT"
export const UPDATE_EDIT_BOARD_NAME = "UPDATE_EDIT_BOARD_NAME"
export const UPDATE_CREATE_TASK_TITLE = "UPDATE_CREATE_TASK_TITLE"
export const UPDATE_CREATE_TASK_DESCRIPTION = "UPDATE_CREATE_TASK_DESCRIPTION"
export const UPDATE_BOARD_TASKS_LIST = "UPDATE_BOARD_TASKS_LIST"
export const UPDATE_BOARD_TASKS_EDITING_TASK = "UPDATE_BOARD_TASKS_EDITING_TASK"

export let updateRegisterUsername = (value) => ({type: UPDATE_REGISTER_USERNAME, username: value})
export let updateRegisterPassword = (value) => ({type: UPDATE_REGISTER_PASSWORD, password: value})
export let updateRegisterAlert = (value) => ({type: UPDATE_REGISTER_ALERT, alert: value})
export let updateLoginUsername = (value) => ({type: UPDATE_LOGIN_USERNAME, username: value})
export let updateLoginPassword = (value) => ({type: UPDATE_LOGIN_PASSWORD, password: value})
export let updateLoginAlert = (value) => ({type: UPDATE_LOGIN_ALERT, alert: value})
export let updateSessionSessionhash = (value) => ({type: UPDATE_SESSION_SESSIONHASH, session: value})
export let updateCreateBoardName = (value) => ({type: UPDATE_CREATE_BOARD_NAME, name: value})
export let updateCreateBoardAlert = (value) => ({type: UPDATE_CREATE_BOARD_ALERT, name: value})
export let updateMyBoardsList = (value) => ({type: UPDATE_MY_BOARDS_LIST, boardList: value})
export let updateMyBoardsCurrentlyOpenBoardId = (value) => ({type: UPDATE_MY_BOARDS_CURRENTLY_OPEN_BOARD_ID, boardId: value})
export let updateDeleteAccountUsername = (value) => ({type: UPDATE_DELETE_ACCOUNT_USERNAME, username: value})
export let updateDeleteAccountPassword = (value) => ({type: UPDATE_DELETE_ACCOUNT_PASSWORD, password: value})
export let updateInvitationList = (value) => ({type: UPDATE_INVITATION_LIST, invitationList: value})
export let updateInvitationUsername = (value) => ({type: UPDATE_INVITATION_USERNAME, username: value})
export let updateInvitationSendAlert = (value) => ({type: UPDATE_INVITATION_SEND_ALERT, sendInviteAlert: value})
export let updateEditBoardName = (value) => ({type: UPDATE_EDIT_BOARD_NAME, boardName: value})
export let updateCreateTaskTitle = (value) => ({type: UPDATE_CREATE_TASK_TITLE, title: value})
export let updateCreateTaskDescription = (value) => ({type: UPDATE_CREATE_TASK_DESCRIPTION, description: value})
export let updateBoardTasksList = (value) => ({type: UPDATE_BOARD_TASKS_LIST, taskList: value})
export let updateBoardTasksEditingTask = (taskId, isBeingEdited) => ({type: UPDATE_BOARD_TASKS_EDITING_TASK, taskId, isBeingEdited})