
export const useFormatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2); // Obtener últimos 2 dígitos del año
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Mes en formato MM
    const day = ('0' + date.getDate()).slice(-2); // Día en formato DD
    const hours = ('0' + date.getHours()).slice(-2); // Horas en formato HH
    const minutes = ('0' + date.getMinutes()).slice(-2); // Minutos en formato MM
    const seconds = ('0' + date.getSeconds()).slice(-2); // Segundos en formato SS

    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}

export default useFormatDate;