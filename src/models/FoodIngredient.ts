export default interface FoodIngredient {
  food_name: string;
  brand_name: string;
  nix_brand_name: string;
  nix_brand_id: string;
  nix_item_name: string;
  nix_item_id: string;
  photo: {
    thumb: string;
  };

  nf_ingredient_statement: string;
}
