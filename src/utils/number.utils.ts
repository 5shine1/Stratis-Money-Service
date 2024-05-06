export const optimizedBalance = (number: number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(0) + "M+";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(0) + "k+";
  } else if (number >= 100) {
    return (number / 100).toFixed(0) + "00+";
  } else {
    return number.toString();
  }
};
