export async function currentDateTime() {
  
const givenDate = new Date();


givenDate.setHours(givenDate.getHours() + 5);
givenDate.setMinutes(givenDate.getMinutes() + 30);

const day = givenDate.getDate().toString().padStart(2, '0');
const month = (givenDate.getMonth() + 1).toString().padStart(2, '0');
const year = givenDate.getFullYear();

const hours = givenDate.getHours();
const minutes = givenDate.getMinutes();
const ampm = hours >= 12 ? 'PM' : 'AM';

const formattedHours = hours % 12 || 12;
const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

const updatedDateTime = `${day}/${month}/${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
console.log(updatedDateTime,"updatedDateTime")

return updatedDateTime


     
  }