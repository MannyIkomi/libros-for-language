export const groupByFirstLetter = (previousVal, currentVal) => {
  // get first letter of name of current element
  let group = currentVal.lastName[0].toUpperCase();
  if (!previousVal[group]) {
    // if there is no property in accumulator with this letter create it
    // previousVal[group] = { group, children: [currentVal] };
    previousVal[group] = [currentVal];
  } else {
    // if there is push current element to children array for that letter
    previousVal[group].push(currentVal);
  }
  // return accumulator
  return previousVal;
};
