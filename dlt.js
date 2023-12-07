// Get time in proper way
function formattedDateTime(currentDateTime) {
    // Get day, month, and year
    const day = new Date(currentDateTime).getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = new Date(currentDateTime).getMonth();
    const year = new Date(currentDateTime).getFullYear();
    // Get hours and minutes
    const hours = new Date(currentDateTime).getHours();
    const minutes = new Date(currentDateTime).getMinutes();
    // Format the date and time
    const formattedDateTime = `${day} ${monthNames[monthIndex]} ${year}, ${hours}:${minutes}`;
    return formattedDateTime;
}
console.log(formattedDateTime(Date.now()))

