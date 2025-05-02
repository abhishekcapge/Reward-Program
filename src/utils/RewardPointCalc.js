export const RewardPoint = (amt) => {
  if (amt < 50) {
    return 0;
  }
  if (amt > 50 && amt <= 100) {
    return (amt - 50) * 1;
  }
  if (amt > 100) {
    let temp = amt - 100;
    let res = 50;
    let output = res+temp*2;
    return output;
  }
};
