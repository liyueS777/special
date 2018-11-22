import fetch from './fetch'
console.log('api:',process.env.API_PREFIX)
let p = process.env.API_PREFIX;
//试用列表数据统计
export const getStatistics = (params) => fetch('POST', '/v1/trialAccountStatistics', params)

//运行设备列表

export const getRunList = (params) => fetch('POST', '/v1/getEquipmentList', params)

//运行设备统计
export const getRunData = (params) => fetch('POST', '/v1/equipmentAccountStatistics', params)


//login
export const login = (params) => fetch('POST', '/v1/login', params)

//授权码统计

export const getAuthCodeData = (params) => fetch('POST', '/v1/InvitationAccountStatistics', params)

//授权码列表

export const getAuthCodeList = (params) => fetch('POST', '/v1/getInvitationCodeList', params)

//注册

export const register = (params) => fetch('POST', '/v1/userRegiste', params)

//提交试用id

export const postTrialID = (params) => fetch('POST', '/v1/commitTrialAccounts', params)

//生成邀请码
export const createInvitationCode = (params) => fetch('POST', '/v1/createInvitationCode', params)

//验证试用账号
export const verifyTrialAccount = (params) => fetch('POST', '/v1/verifyTrialAccount', params)

//绑定邀请码
export const bindInvitation = (params) => fetch('POST', '/v1/bindInvitation', params)

//操作试用账号
export const operationTrialAccounts = (params) => fetch('POST', '/v1/operationTrialAccounts', params)


//生成试用id
export const createTrialAccounts = (params) => fetch('POST', '/v1/createTrialAccounts', params)

//试用账号列表 getTrialAccounts

export const getTrialAccounts = (params) => fetch('POST', '/v1/getTrialAccounts', params)
