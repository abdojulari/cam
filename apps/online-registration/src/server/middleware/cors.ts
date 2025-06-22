import { defineEventHandler, setHeader } from 'h3'

export default defineEventHandler((event) => {
  setHeader(event, 'Access-Control-Allow-Origin', '*')
  setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  setHeader(event, 'Access-Control-Allow-Headers', '*')
  setHeader(event, 'Access-Control-Allow-Credentials', 'true')
  // Handle preflight
  if (event.method === 'OPTIONS') {
    event.res.statusCode = 204
    event.res.end()
  }
}) 