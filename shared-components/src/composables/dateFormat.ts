// export const dateFormat = (date: string) => {
//     // Check if the date is already in the "YYYY-MM-DD" format
//     const regex = /^\d{4}-\d{2}-\d{2}$/;

//     // If it matches the format, return it as is
//     if (regex.test(date)) {
//         return date;
//     }
//     const formattedDate = new Date(date);
//     return formattedDate.toISOString().split('T')[0]; 
// }

export const dateFormat = (date: string) => {
    console.log("date: ", date);
    // Check if the date is already in the "YYYY-MM-DD" format
    const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    // If it's already in the correct format, return as is
    if (isoRegex.test(date)) {
        return date;
    }
    
    // Check if the date is in "YYYYMMDD" format (8 digits)
    const yyyymmddRegex = /^\d{8}$/;
    if (yyyymmddRegex.test(date)) {
        return date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    }
    
    // Handle "Month DD, YYYY" format (e.g., "February 10, 2025")
    const monthDayYearRegex = /^(?:\w+\s\d{1,2},\s\d{4})$/;
    if (monthDayYearRegex.test(date)) {
        const formattedDate = new Date(date);
        if (isNaN(formattedDate.getTime())) {
            throw new Error('Invalid date format');
        }
        return formattedDate.toISOString().split('T')[0];
    }
    
    // Handle "MM/DD/YYYY" or "DD/MM/YYYY" format
    const datePartsRegex = /^(\d{2})[-/](\d{2})[-/](\d{4})$/;
    const match = date.match(datePartsRegex);
    if (match) {
        const [, month, day, year] = match;
        // Return the date in "YYYY-MM-DD" format
        return `${year}-${month}-${day}`;
    }
    
    // handle date in this format Wed Jun 26 1968 00:00:00 GMT-0700 (Mountain Daylight Time)
    const datePartsRegex2 = /^(\w+)\s(\w+)\s(\d{2})\s(\d{4})\s(\d{2}:\d{2}:\d{2})\s(GMT-\d{4})\s\((.*)\)$/;
    const match2 = date.match(datePartsRegex2);
    if (match2) {
        const [, month, day, year, hour, minute, second, timezone, dayOfWeek] = match2;
        return `${year}-${month}-${day}`;
    }   

    // If it's an unrecognized format, try creating a new Date object
    const formattedDate = new Date(date);
    if (isNaN(formattedDate.getTime())) {
        throw new Error('Invalid date format');
    }

    // Return the formatted date in "YYYY-MM-DD" format
    return formattedDate.toISOString().split('T')[0];
};
