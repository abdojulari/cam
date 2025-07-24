import { defineEventHandler, EventHandlerRequest, H3Event, readBody } from 'h3';

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
  const body = await readBody(event);

  // @ts-ignore
  const config = useRuntimeConfig(event);
  const overrideUrl = config.private.OVERRIDE_URL;

  // send the body to the override url
  try{
    // @ts-ignore
    const response = await $fetch(overrideUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error: any) {

    return { error: true, message: error.message || 'Unknown error' };
  }
});
