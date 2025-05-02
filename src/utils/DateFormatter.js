export const formatMonth = (ym) => {
  const [year, month] = ym.split("-");
  const date = new Date(year, month - 1);
  return date.toLocaleString("default", { month: "long", year: "numeric" });
};
