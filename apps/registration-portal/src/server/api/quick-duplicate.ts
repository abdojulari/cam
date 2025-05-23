import { defineEventHandler, EventHandlerRequest, H3Event, readBody } from 'h3';

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
  const body = await readBody(event);

  const config = useRuntimeConfig(event);
  const duplicateUrl = config.public.CRE_DUPLICATE_URL;

  // send the body to the duplicate url
  try{
    const response = await $fetch(duplicateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error: any) {
    if (error?.statusCode === 409) {
      return { data: error.data };
    }
    // Optionally handle other errors
    return { error: true, message: error.message || 'Unknown error' };
  }
});
