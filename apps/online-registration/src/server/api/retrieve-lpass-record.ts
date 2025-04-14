import { defineEventHandler, getCookie, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
    const studentRecords = useStorage('redis');
    try {
        // Authentication check (optional, commented out in your example)
        const access_token = getCookie(event, 'access_token');
        const sanctum_token = getCookie(event, 'x-sanctum-token');
        const id = getCookie(event, 'id');
        if (!access_token || !sanctum_token) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized',
            });
        }

        // Retrieve the student record from the in-memory map
        const studentRecord = studentRecords.getItem(id);

        if (!studentRecord) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Record not found',
            });
        }
        return studentRecord;

    } catch (error) {
        if (error.statusCode) {
            throw error;
        }
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: { error: error.message },
        });
    }
});
