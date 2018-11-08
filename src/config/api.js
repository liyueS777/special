import fetch from './fetch'
console.log('api:',process.env.API_PREFIX)
let p = process.env.API_PREFIX;
export const verify = (params) => fetch('POST', p + '/club/auth/verify', params)
// export const inviteUserInfo = (params) => fetch('GET', p + '/club/yxq/inviteUserInfo', params)