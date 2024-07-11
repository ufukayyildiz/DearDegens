import { categoryComputers } from "./CategoryComputers"
import { categoryElectronics } from "./CategoryElectronics"
import { categoryHousehold } from "./CategoryHousehold"
import { categoryVehicles } from "./CategoryVehicles"
import { categorySportsOutdoors } from "./CategorySports&Outdoors"
import { categoryGaming } from "./CategoryGaming"
import { categoryFashion } from "./CategoryFashion"

export const listingCategories = [
  {
    type: "Vehicles",
    categories: categoryVehicles,
  },
  {
    type: "Home & Garden",
    categories: categoryHousehold,
  },
  {
    type: "Fashion",
    categories: categoryFashion,
  },
  {
    type: "Electronics",
    categories: categoryElectronics,
  },
  {
    type: "Gaming",
    categories: categoryGaming,
  },
  {
    type: "Computers",
    categories: categoryComputers,
  },
  {
    type: "Sports & Outdoors",
    categories: categorySportsOutdoors,
  },
]
