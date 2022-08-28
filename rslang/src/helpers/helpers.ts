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
