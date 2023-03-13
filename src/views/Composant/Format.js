export function formatPhoneNumber(phoneNumber) {
    const countryCode = "+261 ";
    const phoneNumberString = phoneNumber.toString();
    const formattedPhoneNumber = phoneNumberString.slice(1).replace(/(\d{2})(\d{2})(\d{3})(\d{2})/, "$1 $2 $3 $4");
    return countryCode + formattedPhoneNumber;
};