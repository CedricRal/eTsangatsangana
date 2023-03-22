export function formatPhoneNumber(phoneNumber) {
    const countryCode = "+261 ";
    const phoneNumberString = phoneNumber.toString();
    const formattedPhoneNumber = phoneNumberString.slice(1).replace(/(\d{2})(\d{2})(\d{3})(\d{2})/, "$1 $2 $3 $4");
    return countryCode + formattedPhoneNumber;
};

export function formatTime(time) {
    // Extraire les parties de l'heure
    const parts = time.split(":");
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
  
    // Concaténer les parties avec les caractères de formatage
    const formattedTime = `${hours}h${minutes < 10 ? "0" : ""}${minutes}`;
  
    return formattedTime;
};