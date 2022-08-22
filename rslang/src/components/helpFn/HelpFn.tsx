// поиск необходимого класса 
interface IStyles {
  [key: string]: string;
}

export const definingСlassBtn = (classBtn: string, styles:IStyles) => {
  for (const key in styles) {    
    if (key.indexOf(classBtn) !== -1) {
      return styles[key]
    }
  }
}