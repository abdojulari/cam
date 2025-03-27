// create a post http request to get the student record from participating institutions

import { defineEventHandler, EventHandlerRequest, getCookie, H3Event, readBody } from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    try {
        // check if user is authenticated
        const access_token = getCookie(event, 'access_token');
        const sanctum_token = getCookie(event, 'x-sanctum-token');
        if (!access_token || !sanctum_token) {
            throw new Error('Unauthorized!');
        }
        // get the student record from participating institutions
        if (request.method === 'POST') {
            const { 
                firstname, 
                lastname, 
                middlename, 
                dateofbirth, 
                email, 
                phone, 
                address, 
                city, 
                province, 
                postalcode, 
                studentid, 
                institution, 
                status, 
                expirydate 
            } = await readBody(event);

            if (!firstname, !lastname, !middlename, !dateofbirth, !email, !phone, !address, !city, !province, !postalcode, !studentid, !institution, !status, !expirydate) {
                throw new Error('Missing required fields');
            }

          
            return {
                firstname, 
                lastname, 
                middlename, 
                dateofbirth, 
                email, 
                phone, 
                address, 
                city, 
                province, 
                postalcode, 
                studentid, 
                institution, 
                status, 
                expirydate 
            };
        }
    } catch (error) {
        return {
            status: 401,
            body: {
                error: error.message
    }
        }
    }
});