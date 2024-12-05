import { 
  defineEventHandler, 
  readBody
} from "h3"


export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const token = body.token || body['cf-turnstile-response']
  const ip = event.headers.get('cf-connecting-ip')
  const config = useRuntimeConfig(event)
  const siteKey = `${config.public.secret_key}`
  const url = `${config.public.turnstile_url}`

  const result = await fetch(url, { 
    body: JSON.stringify({ 
      secret: siteKey,
      response: token, 
      remoteip: ip
    }),
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    }
  })
  const data = await result.json()
  console.log(data)
  return data

})
