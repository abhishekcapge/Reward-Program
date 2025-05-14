export const formatMonth = (date) => {
  const month = date.split("-")[1];
  return month;
  // const date = new Date(year, month - 1);
  // return date.toLocaleString("default", { month: "long", year: "numeric" });
};

export const formatYear= (date) =>{
  const year = date.split("-")[0];
  return year;
}


