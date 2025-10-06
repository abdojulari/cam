// ~/composables/useCache.ts
import { useStorage } from '@vueuse/core';
// import { defineCachedEventHandler } from '@nuxt/server';

export default async (key: string, data: any) => {
  const cached = useStorage(key, null, { serializer: StorageSerializers.object });
  if (cached.value) {
    return cached.value;
  }
  
  const newData = await data();
  cached.value = newData;
  return newData;
};