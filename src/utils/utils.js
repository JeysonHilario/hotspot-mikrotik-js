export async function returnDate(){
   
    const date = new Date();
    
    const day = String(date.getDate()).padStart(2, '0');
    const mounth = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    
    const dateFormat = `${day}-${mounth}-${year}-${hour}:${minute}:${second}`;
    return dateFormat;

}
