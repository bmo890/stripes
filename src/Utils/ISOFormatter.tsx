export default function formatDate(isoString: string): string {
    const date = new Date(isoString);
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[date.getDay()];
  
    let timeOfDay;
    const hours = date.getHours();
    if (hours < 12) {
      timeOfDay = 'Morning';
    } else if (hours < 17) {
      timeOfDay = 'Afternoon';
    } else {
      timeOfDay = 'Evening';
    }
  
    const formattedDate = `${day} ${timeOfDay} - ${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear().toString().substr(-2)}`;
  
    return formattedDate.toString();
  }
  