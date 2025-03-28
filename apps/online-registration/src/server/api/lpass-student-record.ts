import { z } from 'zod';
import { defineEventHandler, getCookie, H3Event, readBody } from "h3";

const StudentRecordSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    middlename: z.string(),
    dateofbirth: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    province: z.string(),
    postalcode: z.string(),
    studentid: z.string(),
    institution: z.string(),
    status: z.string(),
    expirydate: z.string(),
});

export default defineEventHandler(async (event) => {
    try {
        // Authentication check
        const access_token = getCookie(event, 'access_token');
        const sanctum_token = getCookie(event, 'x-sanctum-token');
        if (!access_token || !sanctum_token) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized'
            });
        }

        // Read and validate body
        const body = await readBody(event);
        const result = StudentRecordSchema.safeParse(body);

        if (!result.success) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: {
                    errors: result.error.flatten()
                }
            });
        }

        // Return the validated data
        return result.data;

    } catch (error) {
        if (error.statusCode) {
            throw error;
        }
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: {
                error: error.message
            }
        });
    }
});