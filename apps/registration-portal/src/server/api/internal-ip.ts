// server/api/internal-ip.ts
import { defineEventHandler } from 'h3'
import * as os from 'os'

export default defineEventHandler(() => {
  const interfaces = os.networkInterfaces()
  let internalIP = 'Not found'
  Object.values(interfaces).forEach((ifaceList) => {
    if (Array.isArray(ifaceList)) {
      ifaceList.forEach((iface) => {
        if (iface.family === 'IPv4' && !iface.internal) {
          internalIP = iface.address
        }
      })
    }
  })
console.log('IP: ', internalIP)
  return { internalIP }
})
