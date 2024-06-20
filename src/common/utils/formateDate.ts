export const formateDate = (date: string) => {
return new Date(date).toLocaleDateString('en-GB')
}