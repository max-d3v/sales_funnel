export const formatDate = (data: Date) => {
    var dia: string | number = data.getDate();
    var mes: string | number = data.getMonth() + 1; 
    var ano: number = data.getFullYear();

    dia = dia < 10 ? '0' + dia : dia;
    mes = mes < 10 ? '0' + mes : mes;

    return dia + '/' + mes + '/' + ano;
}