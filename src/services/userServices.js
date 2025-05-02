
export const fetchData = async () => {
  try {
    const data = await fetch("/data/myData.json");
    return data.json();
  } catch (err) {
    console.log(err);
  }
};
