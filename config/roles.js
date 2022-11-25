const roles = ['user', 'admin']

const roleRights = new Map()
roleRights.set(roles[0], [])
roleRights.set([1], ['getUser', 'manageUser'])

module.exports = { roles, roleRights }