export function capitalizeFirstLetter(text : string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getCurrentDate() {

    const newDate = new Date()
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const hour = newDate.getHours();
    const min = newDate.getMinutes();
    const sec = newDate.getSeconds();
    
    return `${year}/${month<10?`0${month}`:`${month}`}/${date} ${hour}:${min}:${sec}`;
}