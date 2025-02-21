export function toLocalISOString(date, options) {
    date = new Date(date);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    let isoString = date.toISOString();
    isoString = isoString.replace('T', ' ').replace('Z', '');
    if (!options?.milliseconds) isoString = isoString.split('.')[0];
    return isoString;
};