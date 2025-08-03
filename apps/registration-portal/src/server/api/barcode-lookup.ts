import { defineEventHandler, EventHandlerRequest, H3Event, readBody } from 'h3';

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
  // @ts-ignore
  const config = useRuntimeConfig(event);
  const barcodeLookupUrl = config.public.CRE_BARCODE_LOOKUP;
  const body = await readBody(event);

  // send the body to the duplicate url
  try{
    // @ts-ignore
    const response = await $fetch(barcodeLookupUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response;
  } catch (error: any) {
    return { data: error.data };
  }
});
