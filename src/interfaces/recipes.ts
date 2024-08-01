export interface IRecipe {
    name: string;
    country: string;
    image: string;
    ingredients: string[];
    procedure: string;
  }

  export interface IDBRecipe extends IRecipe{
    id:string
  }

  export type RootStackParamList = {
    ViewRecipe: { recipe: IDBRecipe };
  };