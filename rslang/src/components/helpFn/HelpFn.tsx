// поиск необходимого класса 
interface IStyles {
  [key: string]: string;
}

export const definingСlassBtn = (classBtn: string, styles:IStyles) => {
  console.log( styles);
  for (let key in styles) {    
    console.log( classBtn );
    if (key.indexOf(classBtn) !== -1) {
      console.log( styles[key] );
      console.log(1)
      return styles[key]
    }
  }
}