import { categoryComputers } from "./CategoryComputers"
import { categoryElectronics } from "./CategoryElectronics"
import { categoryHousehold } from "./CategoryHousehold"
import { categoryVehicles } from "./CategoryVehicles"
import { categorySportsOutdoors } from "./CategorySports&Outdoors"
import { categoryGaming } from "./CategoryGaming"

export const listingCategories = [
  {
    type: "Home & Garden",
    categories: categoryHousehold,
  },
  {
    type: "Sports & Outdoors",
    categories: categorySportsOutdoors,
  },
  {
    type: "Electronics",
    categories: categoryElectronics,
  },
  {
    type: "Computers",
    categories: categoryComputers,
  },
  {
    type: "Gaming",
    categories: categoryGaming,
  },
  {
    type: "Vehicles",
    categories: categoryVehicles,
  },
]
