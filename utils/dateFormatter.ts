// DECLARATIVE APPROACH
export const formatDate = (date: Date) => date.toISOString().slice(0, 10);

// ALTERNATIVE: IMPERATIVE APPROACH
// export const formatDate = (date: Date) => {
//   const year = date.getFullYear();
//   const month = (date.getMonth() + 1).toString().padStart(2, '0');
//   const day = date.getDate().toString().padStart(2, '0');

//   return `${year}-${month}-${day}`;
// };

export const getDateMinusDays = (date: Date, days: number) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
