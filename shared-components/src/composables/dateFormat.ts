export const dateFormat = (date: string) => {
    // Check if the date is already in the "YYYY-MM-DD" format
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    // If it matches the format, return it as is
    if (regex.test(date)) {
        return date;
    }
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0]; 
}
