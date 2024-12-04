import { 
  defineEventHandler, 
  readBody 
} from "h3"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await verifyTurnstileToken(body.token || body['cf-turnstile-response'])
})
