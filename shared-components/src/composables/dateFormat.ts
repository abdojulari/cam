export const dateFormat = (date: string | Date) => {
    // Handle Date objects directly
    if (date instanceof Date) {
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date');
        }
        return date.toISOString().split('T')[0];
    }
    
    // Convert to string if not already
    const dateString = date.toString();
    
    // Check if the date is already in the "YYYY-MM-DD" format
    const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    // If it's already in the correct format, return as is
    if (isoRegex.test(dateString)) {
        return dateString;
    }
    
    // Check if the date is in "YYYYMMDD" format (8 digits)
    const yyyymmddRegex = /^\d{8}$/;
    if (yyyymmddRegex.test(dateString)) {
        return dateString.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    }
    
    // Handle "Month DD, YYYY" format (e.g., "February 10, 2025")
    const monthDayYearRegex = /^(?:\w+\s\d{1,2},\s\d{4})$/;
    if (monthDayYearRegex.test(dateString)) {
        const formattedDate = new Date(dateString);
        if (isNaN(formattedDate.getTime())) {
            throw new Error('Invalid date format');
        }
        return formattedDate.toISOString().split('T')[0];
    }

    // Handle "DD-Day-Month" format (e.g., "07-Tue-Oct")
    const dayMonthYearRegex = /^(\d{2})[-/](\w+)[-/](\w+)$/;
    const match3 = dateString.match(dayMonthYearRegex);
    if (match3) {
        const [, day, dayName, monthAbbr] = match3;
        // Create a date object using the day and month abbreviation
        // We'll use the current year as a fallback
        const currentYear = new Date().getFullYear();
        const monthMap: { [key: string]: number } = {
            'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
            'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
        };
        
        if (monthMap[monthAbbr] !== undefined) {
            const dateObj = new Date(currentYear, monthMap[monthAbbr], parseInt(day));
            return dateObj.toISOString().split('T')[0];
        }
    }
    
    // Handle "MM/DD/YYYY" or "DD/MM/YYYY" format
    const datePartsRegex = /^(\d{2})[-/](\d{2})[-/](\d{4})$/;
    const match = dateString.match(datePartsRegex);
    if (match) {
        const [, month, day, year] = match;
        // Return the date in "YYYY-MM-DD" format
        return `${year}-${month}-${day}`;
    }
    
    // handle date in this format Wed Jun 26 1968 00:00:00 GMT-0700 (Mountain Daylight Time)
    const datePartsRegex2 = /^(\w+)\s(\w+)\s(\d{2})\s(\d{4})\s(\d{2}:\d{2}:\d{2})\s(GMT-\d{4})\s\((.*)\)$/;
    const match2 = dateString.match(datePartsRegex2);
    if (match2) {
        const [, month, day, year, hour, minute, second, timezone, dayOfWeek] = match2;
        return `${year}-${month}-${day}`;
    }   

    // If it's an unrecognized format, try creating a new Date object
    const formattedDate = new Date(dateString);
    if (isNaN(formattedDate.getTime())) {
        throw new Error('Invalid date format');
    }

    // Return the formatted date in "YYYY-MM-DD" format
    return formattedDate.toISOString().split('T')[0];
};
