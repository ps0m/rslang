export const getCoefficient = (rightAnswer: number) => {
  switch (Math.floor((rightAnswer) / 4)) {
    case 0:
      return 1
    case 1:
      return 2
    case 2:
      return 4
    default:
      return 8
  }
}


export const shuffleArray = <T>(initialArray: T[]): T[] => {
  const resultArray = initialArray.slice();

  for (let i = 0; i < resultArray.length; i++) {
    const current = resultArray[i];
    const randomIndex = Math.floor(Math.random() * (resultArray.length - 1));

    resultArray[i] = resultArray[randomIndex];
    resultArray[randomIndex] = current;
  }

  return resultArray;
}