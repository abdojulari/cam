import { defineEventHandler, getQuery, createError } from 'h3';

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const studentRecords = useStorage('redis');
    try {
       
        const { id } = getQuery(event);

        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: { error: 'Missing Student Record ID' },
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
