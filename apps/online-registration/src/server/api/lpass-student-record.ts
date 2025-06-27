import { z } from 'zod';
import { defineEventHandler, getCookie, readBody, createError } from 'h3';
// @ts-ignore
import { useRuntimeConfig } from '#imports';
import jwt from 'jsonwebtoken';

// Schema to validate the student record
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
    profile: z.string(),
    expirydate: z.string(),
    id: z.string(),
});

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const studentRecords = useStorage('redis');
    const config = useRuntimeConfig(event);
    const JWT_SECRET = config.private.JWT_SECRET;
    try {
        // JWT Authentication check
        const authHeader = event.node.req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized',
            });
        }
        const token = authHeader.split(' ')[1];
        try {
            jwt.verify(token, JWT_SECRET);
        } catch (err) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid or expired token',
            });
        }
        // Read and validate body data
        const body = await readBody(event);
        const result = StudentRecordSchema.safeParse(body);

        if (!result.success) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: { errors: result.error.flatten() },
            });
        }
        // Generate a unique ID for the record (for simplicity, using timestamp)
        const id = Date.now().toString();
        // Store the student data in the in-memory map with the unique ID
        await studentRecords.setItem(id, result.data);
        // Return the ID of the saved record
        return { id };
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
