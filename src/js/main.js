const API_KEY  = "TGJnKT7kRQHzRHrpbNPfddPzPLpftLJjHkbCmmpD"
const BASE_URL = "https://nutriplan-api.vercel.app/api"

const categoriesContainer = document.getElementById("categories-grid");
const mealsContainer = document.getElementById("recipes-grid");


let categoryArr = [];
let mealsArr = [];
const categoriesColors = [
    {
    color: "bg-gradient-to-br from-rose-400 to-red-500",
    icon: "fa-solid fa-drumstick-bite",
    background: "bg-red-50",
    border: "border-red-200"
},
{
    color: "bg-gradient-to-br from-amber-500 to-orange-500",
    icon: "fa-solid fa-bone",
    background: "bg-amber-50",
    border: "border-amber-200"
  },
  {
    color: "bg-gradient-to-br from-amber-400 to-yellow-500",
    icon: "fa-solid fa-cake-candles",
    background: "bg-yellow-50",
    border: "border-yellow-200"
  },
  {
    color: "bg-gradient-to-br from-orange-500 to-amber-500",
    icon: "fa-solid fa-utensils",
    background: "bg-orange-50",
    border: "border-orange-200"
  },
  {
    color: "bg-slate-gradient",
    icon: "fa-solid fa-bowl-food",
    background: "bg-slate-50",
    border: "border-slate-200"
  },
  {
    color: "bg-gradient-to-br from-amber-500 to-yellow-500",
    icon: "fa-solid fa-bowl-rice",
    background: "bg-yellow-50",
    border: "border-yellow-200"
  },
  {
    color: "bg-gradient-to-br from-rose-400 to-pink-500",
    icon: "fa-solid fa-bacon",
    background: "bg-rose-50",
    border: "border-rose-200"
  },
  {
    color: "bg-gradient-to-br from-cyan-400 to-blue-500",
    icon: "fa-solid fa-fish",
    background: "bg-cyan-50",
    border: "border-cyan-200"
  },
  {
    color: "bg-gradient-to-br from-emerald-400 to-green-500",
    icon: "fa-solid fa-burger",
    background: "bg-emerald-50",
    border: "border-emerald-200"
  },
  {
    color: "bg-gradient-to-br from-teal-400 to-cyan-500",
    icon: "fa-solid fa-plate-wheat",
    background: "bg-teal-50",
    border: "border-teal-200"
  },
  {
    color: "bg-gradient-to-br from-emerald-400 to-teal-600",
    icon: "fa-solid fa-seedling",
    background: "bg-emerald-50",
    border: "border-emerald-200"
  },
  {
    color: "bg-gradient-to-br from-green-400 to-emerald-500",
    icon: "fa-solid fa-carrot",
    background: "bg-green-50",
    border: "border-green-200"
  }
]


// handel pages display

function setupNavigation() {
    const mealsPage = ["search-filters-section", "meal-categories-section", "all-recipes-section"];
    const detailsPage = ["meal-details"];
    const productsPage = ["products-section"];
    const foodlogPage = ["foodlog-section"];

function showPage(page) {
    [...mealsPage, ...detailsPage, ...productsPage, ...foodlogPage].forEach((id) => {
        document.getElementById(id).style.display = "none";
    });

    page.forEach((id) => {
        document.getElementById(id).style.display = "";
    });
}

const links = document.querySelectorAll(".nav-link");

links[0].addEventListener("click", () => showPage(mealsPage));
links[1].addEventListener("click", () => showPage(productsPage));
links[2].addEventListener("click", () => showPage(foodlogPage));
showPage(mealsPage);

}

setupNavigation();


// get the categories from the API and display them
async function getCategories() {
    const response = await fetch(`${BASE_URL}/meals/categories`, {
    });
    const data = await response.json();
    categoryArr = data.results;
    displayCategories(categoryArr, categoriesColors);
}

getCategories();


// display categories 

function displayCategories(categories, categoryColors) {
    let box = "";
    for (let i = 0; i < 12; i++) {
        const style = categoryColors[i] || categoryColors[0] ; // safe if colors run out
        box += `
        <div class="category-card ${style.background} rounded-xl p-3 border ${style.border} hover:shadow-md cursor-pointer transition-all group"
            data-category="${categories[i].name}">
            <div class="flex items-center gap-2.5">
                <div class="text-white w-9 h-9 ${style.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <i class="${style.icon}"></i>
                </div>
                <div>
                    <h3 class="text-sm font-bold text-gray-900">${categories[i].name}</h3>
                </div>
            </div>
        </div>`;
    }
    categoriesContainer.innerHTML = box;
}

// get the cards from api 

async function getMeals() {
    const response = await fetch(`${BASE_URL}/meals/random?count=25`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    mealsArr = data.results;
    console.log(mealsArr);
    displayMeals(mealsArr);
}



// display the meals cards

function displayMeals(meals) {
    let box = "";
    for(let i = 0; i < meals.length; i++) {
        box += `<div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${meals[i].id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${meals[i].thumbnail}"
                  alt="${meals[i].name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${meals[i].category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${meals[i].area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                    ${meals[i].name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  Delicious recipe to try!
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${meals[i].category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${meals[i].area}
                  </span>
                </div>
              </div>
            </div>`
    }
    mealsContainer.innerHTML = box;
}
getMeals() 
