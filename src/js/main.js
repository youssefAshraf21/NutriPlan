const API_KEY  = "TGJnKT7kRQHzRHrpbNPfddPzPLpftLJjHkbCmmpD"
const BASE_URL = "https://nutriplan-api.vercel.app/api"



//**************************************************************** */


// okay now i beenig search in product to found weight  in api and i dont found i was searched for 1 hour!!! 
//then i searched and i arrived that there a api : https://world.openfoodfacts.org/ i dont know but i dont found any way else i will use it :)


const PRODUCTS_API = "https://world.openfoodfacts.org";

//************************************************************************ */


const categoriesContainer = document.getElementById("categories-grid");
const mealsContainer = document.getElementById("recipes-grid");


const mealImg = document.getElementById("mealImg");
const mealCategoryDetail = document.getElementById("mealCategoryDetail");
const mealAreaDetail = document.getElementById("mealAreaDetail");
const mealTitleDetail = document.getElementById("mealTitleDetail");
const mealVideo = document.getElementById("meal-video");
const heroCalories = document.getElementById("hero-calories");


const ingredientsList = document.getElementById("ingredients-list");
const instructionsList = document.getElementById("instructions-list");
const nutritionContainer = document.getElementById("nutrition-facts-container");
const heroServings = document.getElementById("hero-servings");
const ingredientsCount = document.getElementById("ingredients-count");  


const searchMeal = document.getElementById("search-input");
const areaContainer = document.getElementById("areaContainer");

const mealsLink = document.getElementById("mealsLink");
const productScannerLink = document.getElementById("productScannerLink");
const foodLogLink = document.getElementById("foodLogLink");

const logMealBtn = document.getElementById("log-meal-btn");
const logMealModal = document.getElementById("log-meal-modal");
const cancelLogMealBtn = document.getElementById("cancel-log-meal");
const logMealImg = document.getElementById("logMealImg");
const logMealName = document.getElementById("log-meal-name");
const servingsInput = document.getElementById("meal-servings");
const modalCalories = document.getElementById("modal-calories");
const modalProtein = document.getElementById("modal-protein");
const modalCarbs = document.getElementById("modal-carbs");
const modalFat = document.getElementById("modal-fat");

const confirmLogMeal = document.getElementById("confirm-log-meal")
const loggedItemsList = document.getElementById("logged-items-list");
const loggedItemsCount = document.getElementById("logged-items-count");
const foodlogDate = document.getElementById("foodlog-date");
const clearFoodlog = document.getElementById("clear-foodlog");

const dailyGoal = { calories: 2000, protein: 50, carbs: 250, fat: 65 };

const weeklyChart = document.getElementById("weekly-chart");
const todayProgress = document.getElementById("today-progress");
const weeklyAverageEl = document.getElementById("weekly-average");
const weeklyTotalItemsEl = document.getElementById("weekly-total-items");
const daysOnGoalEl = document.getElementById("days-on-goal");
const productCategory = document.getElementById("product-categories");
const productsContainer = document.getElementById("products-grid");
const productSearchInput = document.getElementById("product-search-input");
const barcodeSearchInput = document.getElementById("barcode-input");
const lookupBarcodeBtn = document.getElementById("lookup-barcode-btn");
const nutriScoreButtons = document.querySelectorAll(".nutri-score-filter");
const productDetailModal = document.getElementById("product-detail-modal");



const loadingOverlay = document.getElementById("app-loading-overlay");

const loadingSpinner = `
<div class="col-span-full flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;


let currentMeal = null;        
let currentNutrition = null;   
let currentProduct = null;
let categoryArr = [];
let areaArr = [];
let mealsArr = [];
let productArr = [];
let categoryScannerArr = [];
const categoryScannerColors =  [
  // Snacks
  {
    color: "bg-gradient-to-br from-orange-400 to-amber-500",
    icon: "fa-solid fa-cookie-bite"
  },
  // Beverages
  {
    color: "bg-gradient-to-br from-cyan-400 to-blue-500",
    icon: "fa-solid fa-glass-water"
  },
  // Dairy
  {
    color: "bg-gradient-to-br from-sky-400 to-indigo-500",
    icon: "fa-solid fa-bottle-water"
  },
  // Cheeses
  {
    color: "bg-gradient-to-br from-yellow-400 to-amber-500",
    icon: "fa-solid fa-cheese"
  },
  // Yogurts
  {
    color: "bg-gradient-to-br from-pink-400 to-rose-500",
    icon: "fa-solid fa-bowl-food"
  },
  // Chocolates
  {
    color: "chocolate-gradient",
    icon: "fa-solid fa-candy-cane"
},
  // Biscuits & Cookies
  {
    color: "bg-gradient-to-br from-orange-400 to-red-500",
    icon: "fa-solid fa-cookie"
  },
  // Ice Cream
  {
    color: "bg-gradient-to-br from-purple-400 to-pink-500",
    icon: "fa-solid fa-ice-cream"
  },
  // Breakfast Cereals
  {
    color: "bg-gradient-to-br from-yellow-400 to-orange-500",
    icon: "fa-solid fa-wheat-awn"
  },
  // Breads
  {
    color: "bg-gradient-to-br from-amber-500 to-yellow-600",
    icon: "fa-solid fa-bread-slice"
  },
  // Waters
  {
    color: "bg-gradient-to-br from-blue-400 to-cyan-500",
    icon: "fa-solid fa-droplet"
  },
  // Sodas
  {
    color: "bg-gradient-to-br from-red-400 to-rose-600",
    icon: "fa-solid fa-bottle-water"
  },
  // Coffees
  {
    color: "coffee-gradient",
    icon: "fa-solid fa-mug-hot"
},
  // Teas
  {
    color: "bg-gradient-to-br from-green-400 to-emerald-600",
    icon: "fa-solid fa-mug-saucer"
  },
  // Fruits
  {
    color: "bg-gradient-to-br from-rose-400 to-pink-500",
    icon: "fa-solid fa-apple-whole"
  },
  // Vegetables
  {
    color: "bg-gradient-to-br from-lime-400 to-green-600",
    icon: "fa-solid fa-carrot"
  },
  // Meats
  {
    color: "meat-gradient",
    icon: "fa-solid fa-drumstick-bite"
},
  // Fish & Seafood
  {
    color: "bg-gradient-to-br from-cyan-400 to-teal-600",
    icon: "fa-solid fa-fish"
  },
  // Plant-based Foods
  {
    color: "bg-gradient-to-br from-emerald-400 to-green-600",
    icon: "fa-solid fa-seedling"
  },
  // Chips & Fries
  {
    color: "bg-gradient-to-br from-yellow-400 to-orange-500",
    icon: "fa-solid fa-utensils"
  },
  // Sauces
  {
    color: "bg-gradient-to-br from-red-400 to-orange-500",
    icon: "fa-solid fa-bottle-droplet"
  },
  // Spreads
  {
    color: "spreads-gradient",
    icon: "fa-solid fa-jar"
},
  // Pasta
  {
    color: "bg-gradient-to-br from-orange-400 to-yellow-500",
    icon: "fa-solid fa-bowl-rice"
  },
  // Desserts
  {
    color: "bg-gradient-to-br from-fuchsia-400 to-pink-600",
    icon: "fa-solid fa-cake-candles"
  }
];
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


// handle the getting and saving the food log from local storage
function getFoodLog() {
    return JSON.parse(localStorage.getItem("foodLog")) || [];
}

function saveFoodLog(list) {
    localStorage.setItem("foodLog", JSON.stringify(list));
}


foodlogDate.textContent = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "short", day: "numeric"
});
displayMealInLog();
// handel pages display

// handel pages display
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

function setupNavigation() {
    const links = document.querySelectorAll(".nav-link");

    links[0].addEventListener("click", () => {
        showPage(mealsPage)
        activeLink(0);
    });
    links[1].addEventListener("click", () => {
        showPage(productsPage)
        activeLink(1);
    });
    links[2].addEventListener("click", () => {
        showPage(foodlogPage)
        activeLink(2);
    });

    showPage(mealsPage);
}

// handle the active link color
function activeLink(index) {
    const links = document.querySelectorAll(".nav-link");
    for(let i = 0; i < links.length; i++) {
        links[i].classList.remove("bg-emerald-50", "text-emerald-700");
        links[i].classList.add("text-gray-600");
    }
    links[index].classList.remove("text-gray-600");
    links[index].classList.add("bg-emerald-50", "text-emerald-700");
}

setupNavigation();


// get the categories from the API and display them
async function getCategories() {
    const response = await fetch(`${BASE_URL}/meals/categories`, {
    });
    if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    categoryArr = data.results;
    displayCategories(categoryArr,categoriesColors );
}

getCategories();


// display categories 

function displayCategories(categories, categoryColors) {
    let box = "";
    for (let i = 0; i < 12; i++) {
        const style = categoryColors[i] || categoryColors[0]; // just for safety i hate colors*
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

// get the areas and display them

async function getAreas() {
    const response = await fetch(`${BASE_URL}/meals/areas`)
    const data = await response.json();

    areaArr = data.results;
    displayArea(areaArr);
    
}

getAreas();

function displayArea(area) {
    let box = `<button
              class="area-card px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all"
                data-area=""            
              >
              All Recipes
            </button>`;
    for(let i = 0; i <10; i++) {
        box += `
        
        <button
              class="area-card px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
            data-area="${area[i].name}"
              >
              ${area[i].name}
            </button>`
    }

    areaContainer.innerHTML = box;
}




// get the cards from api 

async function getMeals() {
    mealsContainer.innerHTML = loadingSpinner;

    try {
        const response = await fetch(`${BASE_URL}/meals/random?count=25`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();
        mealsArr = data.results;
        displayMeals(mealsArr);
    } catch (error) {
        console.error("Meals Error:", error);
        displayMeals([]);
    } finally {
        hideLoading();
    }
}





// display the meals cards

function displayMeals(meals) {
    if (meals.length === 0){
        mealsContainer.innerHTML = `
        <div class="col-span-4 flex flex-col items-center justify-center py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
            </div>
            <p class="text-gray-500 text-lg">No recipes found</p>
            <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
        </div>`;
        return;
    } 
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


// click on a meal card
mealsContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".recipe-card");
    if (!card) return;

    getMealDetails(card.dataset.mealId);
});

async function getMealDetails(id) {
    showPage(detailsPage);
    window.scrollTo(0, 0);

    const response = await fetch(`${BASE_URL}/meals/${id}`);
    const data = await response.json();
    const meal = data.result;         

    displayMealDetails(meal);
    getNutrition(meal);                
}

// back button
document.getElementById("back-to-meals-btn").addEventListener("click", () => {
    showPage(mealsPage);
});



// handle the details page
function displayMealDetails(meal) {
    currentMeal = meal;       
    currentNutrition = null; 
    mealImg.src = meal.thumbnail;
    mealImg.alt = meal.name;
    mealCategoryDetail.textContent = meal.category;
    mealAreaDetail.textContent = meal.area;
    mealTitleDetail.textContent = meal.name;

    ingredientsCount.textContent = `${meal.ingredients.length} items`;
    let ingredientsBox = "";
    for (let i = 0; i < meal.ingredients.length; i++) {
        ingredientsBox += `
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
            <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
            <span class="text-gray-700">
                <span class="font-medium text-gray-900">${meal.ingredients[i].measure}</span>
                ${meal.ingredients[i].ingredient}
            </span>
        </div>`;
    }
    ingredientsList.innerHTML = ingredientsBox;

    let stepsBox = "";
    for (let i = 0; i < meal.instructions.length; i++) {
        stepsBox += `
        <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                ${i + 1}
            </div>
            <p class="text-gray-700 leading-relaxed pt-2">${meal.instructions[i]}</p>
        </div>`;
    }
    instructionsList.innerHTML = stepsBox;

    if (meal.youtube && meal.youtube.startsWith("https://www.youtube.com/watch?v=")) {
        mealVideo.src = meal.youtube.replace("watch?v=", "embed/");
    } else {
        mealVideo.src = "NOT FOUND";    
    }
}



async function getNutrition(meal) {
    nutritionContainer.innerHTML = `<p class="text-gray-500">Loading nutrition...</p>`;

    const ingredientsText = [];
    for (let i = 0; i < meal.ingredients.length; i++) {
        ingredientsText.push(`${meal.ingredients[i].measure} ${meal.ingredients[i].ingredient}`);
    }

    const response = await fetch(`${BASE_URL}/nutrition/analyze`, {   
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": `${API_KEY}`
        },
        
        body: JSON.stringify({
            recipeName: meal.name,
            ingredients: ingredientsText
        })
        
    });
        if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
        }
    const data = await response.json();
    currentNutrition = data.data.perServing;   
    displayNutrition(data.data);
}


function displayNutrition(data) {
    const dataPerServing = data.perServing;
    heroServings.textContent = `${data.servings} servings`;
    heroCalories.textContent = `${dataPerServing.calories} cal/serving`;

    const rows = [
        { name: "Protein", value: dataPerServing.protein, target: 50,  color: "bg-emerald-500" },
        { name: "Carbs",   value: dataPerServing.carbs,   target: 250, color: "bg-blue-500" },
        { name: "Fat",     value: dataPerServing.fat,     target: 65,  color: "bg-purple-500" },
        { name: "Fiber",   value: dataPerServing.fiber,   target: 28,  color: "bg-orange-500" },
        { name: "Sugar",   value: dataPerServing.sugar,   target: 50,  color: "bg-pink-500" }
    ];

    let box = `
    <p class="text-sm text-gray-500 mb-4">Per serving</p>
    <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
        <p class="text-sm text-gray-600">Calories per serving</p>
        <p class="text-4xl font-bold text-emerald-600">${dataPerServing.calories}</p>
        <p class="text-xs text-gray-500 mt-1">Total: ${data.totals.calories} cal</p>
    </div>
    <div class="space-y-4">`;

    for (let i = 0; i < rows.length; i++) {
        const percent = Math.min((rows[i].value / rows[i].target) * 100, 100);
        box += `
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full ${rows[i].color}"></div>
                <span class="text-gray-700">${rows[i].name}</span>
            </div>
            <span class="font-bold text-gray-900">${rows[i].value}g</span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2">
            <div class="${rows[i].color} h-2 rounded-full" style="width: ${percent}%"></div>
        </div>`;
    }

    box += `</div>`;
    nutritionContainer.innerHTML = box;
}


// handel the search 

searchMeal.addEventListener("input", (e) => {
    searchMeals(e.target.value);
});

async function searchMeals(input) {
    mealsContainer.innerHTML = loadingSpinner;
    const response = await fetch(`${BASE_URL}/meals/search?q=${input}`,)
    if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    mealsArr = data.results;
    displayMeals(mealsArr);
}


// handle the category filter



categoriesContainer.addEventListener("click", (e) => {
    const category = e.target.closest(".category-card");
    const selectedCategory = category.dataset.category;
    filterByCategory(selectedCategory)
})

async function filterByCategory(categoryName){
    mealsContainer.innerHTML = loadingSpinner;  
    const response = await fetch(`${BASE_URL}/meals/filter?category=${categoryName}&page=1&limit=25`)
    if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    mealsArr = data.results;
    displayMeals(mealsArr);
}


// handle the area filter 

async function filterByArea(areaName){
    mealsContainer.innerHTML = loadingSpinner;  
    const response = await fetch(`${BASE_URL}/meals/filter?area=${areaName}&page=1&limit=25`)
    if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    mealsArr = data.results;
    displayMeals(mealsArr);
}

// handle tha all recepies btn 

areaContainer.addEventListener("click", (e) => {
    const area = e.target.closest(".area-card");
    if (!area) return;
    setActiveArea(area)
    const selectedArea = area.dataset.area;

    if (selectedArea === "") {
        getMeals();                 
    } else {
        filterByArea(selectedArea);
    }
});

// handle the active button area color

function setActiveArea(clicked) {
    const buttons = areaContainer.querySelectorAll(".area-card");
    buttons.forEach(btn => {
        btn.classList.remove("bg-emerald-600", "text-white", "hover:bg-emerald-700");
        btn.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
    });
    clicked.classList.remove("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
    clicked.classList.add("bg-emerald-600", "text-white", "hover:bg-emerald-700");
}

// log btn  click
    logMealBtn.addEventListener("click", () => {

    if (!currentMeal || !currentNutrition) return;

    servingsInput.value = 1;
    fillModal();
    logMealModal.classList.remove("hidden");
});

cancelLogMealBtn.addEventListener("click", () => {
    logMealModal.classList.add("hidden");
});

    function fillModal() {
    const servings = Number(servingsInput.value);
    const n = currentNutrition;

    logMealImg.src = currentMeal.thumbnail;
    logMealName.textContent = currentMeal.name;

    modalCalories.textContent = Math.round(n.calories * servings);
    modalProtein.textContent = Math.round(n.protein * servings) + "g";
    modalCarbs.textContent = Math.round(n.carbs * servings) + "g";
    modalFat.textContent = Math.round(n.fat * servings) + "g";
}



document.getElementById("increase-servings").addEventListener("click", () => {
    servingsInput.value = Number(servingsInput.value) + 0.5;
    fillModal();
});

document.getElementById("decrease-servings").addEventListener("click", () => {
    if (Number(servingsInput.value) > 0.5) {
        servingsInput.value = Number(servingsInput.value) - 0.5;
        fillModal();
    }
});

servingsInput.addEventListener("input", fillModal);



// add meal in log 


confirmLogMeal.addEventListener("click",() => {
    const servings = Number(servingsInput.value);
    const item = {
        id: Date.now(),
        name: currentMeal.name,
        image: currentMeal.thumbnail,
        servings: servings,
        calories: Math.round(currentNutrition.calories * servings),
        protein: Math.round(currentNutrition.protein * servings),
        carbs: Math.round(currentNutrition.carbs * servings),
        fat: Math.round(currentNutrition.fat * servings),
        date: new Date().toDateString(),      
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
    const list = getFoodLog();
    list.push(item);
    saveFoodLog(list);
    displayMealInLog()

    logMealModal.classList.add("hidden");
        Swal.fire({
            title: `${item.name} ${item.servings} has been added to your log`,
            html: `<span style="color: green; font-size: 14px;">
                ${item.calories} calories
            </span>`,
            customClass: {
                title: "small-title"
            },
            icon: "success",
            draggable: true
        });
})



function displayMealInLog() {
    const today = new Date().toDateString();
    updateLogStats(); 
    const allItems = getFoodLog();

    const todayItems = allItems.filter(item => item.date === today);

    loggedItemsCount.textContent = `Logged Items (${todayItems.length})`;

    if (todayItems.length === 0) {
        loggedItemsList.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"></i>
                <p class="font-medium">No meals logged today</p>
                <p class="text-sm">Add meals from the Meals page or scan products</p>
            </div>`;
        return;
    }

    let box = "";

    for (let i = 0; i < todayItems.length; i++) {
        const item = todayItems[i];

        box += `
            <div class="flex flex-row items-center gap-4 p-3 bg-gray-50 rounded-xl w-full">
                <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-xl object-cover shrink-0">
                <div class="flex-1 min-w-0">
                    <h5 class="font-semibold text-gray-900">
                        ${item.name}
                    </h5>
                    <p class="text-xs text-gray-500 mt-0.5">
                        ${item.amount || item.servings + " serving(s)"}
                        <span class="mx-1">•</span>
                        <span class="text-emerald-600">${item.type || "Recipe"}</span>
                    </p>
                    <p class="text-xs text-gray-400 mt-1">
                        ${item.time}
                    </p>
                </div>
                <div class="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span class="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        ${item.protein}g P
                    </span>
                    <span class="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                        ${item.carbs}g C
                    </span>
                    <span class="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
                        ${item.fat}g F
                    </span>
                </div>
                <div class="text-center min-w-16">
                    <p class="text-lg font-bold text-emerald-600">
                        ${item.calories}
                    </p>
                    <p class="text-xs text-gray-500">kcal</p>
                </div>
                <button
                    type="button"
                    data-id="${item.id}"
                    class="delete-meal-btn text-gray-400 hover:text-red-500 transition-colors p-2"
                    title="Delete meal"
                    aria-label="Delete ${item.name}"
                >
                    <i class="fa-solid fa-trash-can text-lg"></i>
                </button>
            </div>
        `;
    }

    loggedItemsList.innerHTML = box;
}



loggedItemsList.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-meal-btn");

    if (!deleteBtn) return;
    const mealId = deleteBtn.dataset.id;

    Swal.fire({
        title: "Delete this meal?",
        text: "This meal will be removed from your food log.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed) {
            const updatedItems = getFoodLog().filter(
                item => String(item.id) !== String(mealId)
            );

            saveFoodLog(updatedItems);
            displayMealInLog();

            Swal.fire({
                title: "Deleted!",
                text: "Your meal has been removed.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
});

// clearAll function 


clearFoodlog.addEventListener("click", () => {

    const list = getFoodLog();

    if (list.length === 0) {
        Swal.fire({
            title: "Your food log is already empty!",
            icon: "info"
        });
        return;
    }

    Swal.fire({
        title: "Clear all meals?",
        text: "All your logged meals will be deleted permanently.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Yes, clear all",
        cancelButtonText: "Cancel"
    }).then((result) => {

        if (result.isConfirmed) {

            saveFoodLog([]);
            displayMealInLog();

            Swal.fire({
                title: "Cleared!",
                text: "Your food log is now empty.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

        }

    });

});




// calc the total for each day and sum ....
function sumItems(items) {
    const total = { calories: 0, protein: 0, carbs: 0, fat: 0, count: items.length };
    for (let i = 0; i < items.length; i++) {
        total.calories += items[i].calories;
        total.protein += items[i].protein;
        total.carbs += items[i].carbs;
        total.fat += items[i].fat;
    }
    return total;
}

// 1) Today's Nutrition
function renderTodayNutrition(todayTotal) {
    const rows = [
        { 
            label: "Calories",
            value: todayTotal.calories,
            goal: dailyGoal.calories,
            unit: "kcal",
            bg: "bg-emerald-50",
            bar: "bg-emerald-500"
        },
        { 
            label: "Protein",
            value: todayTotal.protein,
            goal: dailyGoal.protein,
            unit: "g",
            bg: "bg-blue-50",    
            bar: "bg-blue-500" 
        },
        { 
            label: "Carbs",
            value: todayTotal.carbs,    
            goal: dailyGoal.carbs,    
            unit: "g",    
            bg: "bg-amber-50",   
            bar: "bg-amber-500"
        },
        {
            label: "Fat",      
            value: todayTotal.fat,      
            goal: dailyGoal.fat,      
            unit: "g",    
            bg: "bg-purple-50",  
            bar: "bg-purple-500" 
        }
    ];

    let box = "";
    for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        const percent = Math.round((r.value / r.goal) * 100);
        const isOver = r.value > r.goal;
        const barColor = isOver ? "bg-red-500" : r.bar;
        const textColor = isOver ? "text-red-500" : "text-gray-500";

        box += `
        <div class="${r.bg} rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">${r.label}</span>
                <span class="text-xs ${textColor}">${percent}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="${barColor} h-2.5 rounded-full" style="width: ${Math.min(percent, 100)}%"></div>
            </div>
            <div class="flex items-center justify-between mt-2 text-xs">
                <span class="font-bold ${isOver ? "text-red-500" : "text-gray-700"}">${r.value} ${r.unit}</span>
                <span class="text-gray-400">/ ${r.goal} ${r.unit}</span>
            </div>
        </div>`;
    }
    todayProgress.innerHTML = box;
}

function getWeekDays() {
    const today = new Date();
    const daysSinceSaturday = (today.getDay() + 1) % 7;
    const start = new Date(today);
    start.setDate(today.getDate() - daysSinceSaturday);

    const days = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        days.push(d);
    }
    return days;
}

function renderWeekly(allItems) {
    const days = getWeekDays();
    const todayStr = new Date().toDateString();

    let box = `<div class="grid grid-cols-7 gap-2 w-full">`;
    let weekCalories = 0;
    let weekItems = 0;
    let daysOnGoal = 0;

    for (let i = 0; i < days.length; i++) {
        const dayStr = days[i].toDateString();
        const dayItems = allItems.filter(item => item.date === dayStr);
        const total = sumItems(dayItems);

        weekCalories += total.calories;
        weekItems += total.count;
        if (total.calories > 0 && total.calories <= dailyGoal.calories) daysOnGoal++;

        const isToday = dayStr === todayStr;
        const hasData = total.calories > 0;

        box += `
        <div class="text-center p-3 rounded-xl ${isToday ? "bg-indigo-100" : ""}">
            <p class="text-xs text-gray-500">${days[i].toLocaleDateString("en-US", { weekday: "short" })}</p>
            <p class="text-sm font-semibold text-gray-900 mb-2">${days[i].getDate()}</p>
            <p class="text-xl font-bold ${hasData ? "text-emerald-600" : "text-gray-300"}">${total.calories}</p>
            <p class="text-xs ${hasData ? "text-emerald-500" : "text-gray-300"}">kcal</p>
            ${hasData ? `<p class="text-xs text-gray-400 mt-1">${total.count} item${total.count > 1 ? "s" : ""}</p>` : ""}
        </div>`;
    }
    box += `</div>`;

    weeklyChart.className = "bg-white rounded-xl"; 
    weeklyChart.innerHTML = box;

    weeklyAverageEl.textContent = `${Math.round(weekCalories / 7)} kcal`;
    weeklyTotalItemsEl.textContent = `${weekItems} items`;
    daysOnGoalEl.textContent = `${daysOnGoal}/7`;
}

// one function that refreshes everything
function updateLogStats() {
    const allItems = getFoodLog();
    const todayItems = allItems.filter(item => item.date === new Date().toDateString());

    renderTodayNutrition(sumItems(todayItems));
    renderWeekly(allItems);
}


// product scanner


// get all categories in product scanner


async function getCategoriesScanner() {
    const response = await fetch(`${BASE_URL}/products/categories`, {
    });
    if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
    const data = await response.json();
    categoryScannerArr = data.results;
    displayCategoriesScanner(categoryScannerArr,categoryScannerColors );
}

getCategoriesScanner()

function displayCategoriesScanner(categoryArr, categoriesColors) {
    let box = "";

    for (let i = 0; i < categoryArr.length; i++) {
        box += `
            <button data-category="${categoryArr[i].name}" class="product-category-btn px-4 py-3 ${categoriesColors[i].color} text-white rounded-lg text-md font-semibold whitespace-nowrap hover:opacity-80 transition-all">
        <i class="${categoriesColors[i].icon} mr-1.5"></i>${categoryArr[i].name}
    </button>
        `;
    }

    productCategory.innerHTML = box;
}


// make the display product function to use it in search...

//display product function

function displayProducts(productarr) {
    let box = "";

    if (productarr.length === 0) {
        productsContainer.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
                </div>
                <p class="text-gray-500 text-lg">No products found</p>
                <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
            </div>
        `;
        return;
    }

    for (let i = 0; i < productarr.length; i++) {

        let product = productarr[i];

        let grade = product.nutritionGrade;
        let nova = product.novaGroup;
        console.log("container:", productsContainer, "length:", productarr.length);
        box += `
            <div
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="${product.barcode}"
            >

                <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">

                    <img
                        class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    />

                    <!-- Nutri-Score Badge -->
                    <div class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                        Nutri-Score ${grade}
                    </div>

                    <!-- NOVA Badge -->
                    <div
                        class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                        title="NOVA ${nova}"
                    >
                        ${nova}
                    </div>

                </div>

                <div class="p-4">

                    <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
                        ${product.brand}
                    </p>

                    <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        ${product.name}
                    </h3>

                    <!-- Weight and Calories -->
                    <div class="flex items-center flex-wrap gap-3 text-xs text-gray-500 mb-3">

                        <span>
                            <i class="fa-solid fa-weight-scale mr-1"></i>
                            ${product.quantity ? product.quantity + "g" : "0"}
                        </span>

                        <span>
                            <i class="fa-solid fa-fire mr-1"></i>
                            ${product.calories ? product.calories + "kcal/100g" : "0"} 
                        </span>

                    </div>

                    <!-- Mini Nutrition -->
                    <div class="grid grid-cols-4 gap-1 text-center">

                        <div class="bg-emerald-50 rounded p-1.5">
                            <p class="text-xs font-bold text-emerald-700">
                                ${product.protein ? product.protein + "g" : "0"}
                            </p>
                            <p class="text-[10px] text-gray-500">Protein</p>
                        </div>

                        <div class="bg-blue-50 rounded p-1.5">
                            <p class="text-xs font-bold text-blue-700">
                                ${product.carbs ? product.carbs + "g" : "0"}
                            </p>
                            <p class="text-[10px] text-gray-500">Carbs</p>
                        </div>

                        <div class="bg-purple-50 rounded p-1.5">
                            <p class="text-xs font-bold text-purple-700">
                                ${product.fat ? product.fat + "g" : "0"}
                            </p>
                            <p class="text-[10px] text-gray-500">Fat</p>
                        </div>

                        <div class="bg-orange-50 rounded p-1.5">
                            <p class="text-xs font-bold text-orange-700">
                                ${product.sugar ? product.sugar + "g" : ""}
                            </p>
                            <p class="text-[10px] text-gray-500">Sugar</p>
                        </div>

                    </div>

                </div>
            </div>
        `;
    }

    productsContainer.innerHTML = box;
}

//search product function

productSearchInput.addEventListener("input", function(e) {
    searchProduct(e.target.value);
});
async function searchProduct(input) {

    if (!input || !input.trim()) {
        productArr = [];
        displayProducts(productArr);
        return;
    }

    try {
        const params = new URLSearchParams({
            search_terms: input.trim(),
            page: 1,
            page_size: 24,
            json: 1
        });

        const response = await fetch(
            `${PRODUCTS_API}/cgi/search.pl?${params}`
        );

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        productArr = [];

        for (let i = 0; i < data.products.length; i++) {

            let product = data.products[i];
            let nutrition = product.nutriments || {};

            let productObject = {
                barcode: product.code,
                name: product.product_name || product.product_name_en,
                brand: product.brands,
                image: product.image_front_url || product.image_url,
                quantity: product.quantity,

                nutritionGrade: product.nutrition_grades || product.nutrition_grade_fr,
                novaGroup: product.nova_group,

                calories: nutrition["energy-kcal_100g"],
                protein: nutrition.proteins_100g,
                carbs: nutrition.carbohydrates_100g,
                fat: nutrition.fat_100g,
                sugar: nutrition.sugars_100g
            };

            productArr.push(productObject);
        }


        displayProducts(productArr);

    } catch (error) {
        console.error("Product Search Error:", error);
    }
}






barcodeSearchInput.addEventListener("input", function(e) {
    let barcode = e.target.value.trim();

    if (barcode.length >= 8) {
        searchProductByBarcode(barcode);
    } else {
        productArr = [];
        displayProducts(productArr);
    }
});

async function searchProductByBarcode(barcode) {
    try {
        const response = await fetch(
            `${PRODUCTS_API}/api/v2/product/${barcode}.json`
        );

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        productArr = [];

        if (data.status === 1 && data.product) {
            let product = data.product;
            let nutrition = product.nutriments || {};

            let productObject = {
                barcode: product.code || barcode,
                name: product.product_name || product.product_name_en || "Unknown Product",
                brand: product.brands || "Unknown Brand",
                image: product.image_front_url || product.image_url || "",
                quantity: product.quantity || "",

                nutritionGrade: product.nutrition_grades || product.nutrition_grade_fr || "N/A",
                novaGroup: product.nova_group || "N/A",

                calories: nutrition["energy-kcal_100g"],
                protein: nutrition.proteins_100g,
                carbs: nutrition.carbohydrates_100g,
                fat: nutrition.fat_100g,
                sugar: nutrition.sugars_100g
            };

            productArr.push(productObject);
        }

        displayProducts(productArr);

    } catch (error) {
        console.error("Barcode Search Error:", error);
    }
}



// filter the product with category and a,b,...


nutriScoreButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const grade = btn.dataset.grade;   

        nutriScoreButtons.forEach(b => b.classList.remove("ring-2", "ring-offset-2", "ring-emerald-500"));
        btn.classList.add("ring-2", "ring-offset-2", "ring-emerald-500");

        if (grade === "") {
            displayProducts(productArr);
            return;
        }

        const filtered = productArr.filter(btn =>
            btn.nutritionGrade && btn.nutritionGrade.toLowerCase() === grade
        );
        displayProducts(filtered);
    });
});

productSearchInput.addEventListener("input", () => {
    nutriScoreButtons.forEach(brn => btn.classList.remove("ring-2", "ring-offset-2", "ring-emerald-500"));
});

productCategory.addEventListener("click", (e) => {
    const btn = e.target.closest(".product-category-btn");
    if (!btn) return;

    productCategory.querySelectorAll(".product-category-btn").forEach(b => {
        b.classList.remove("ring-4", "ring-emerald-300");
    });
    btn.classList.add("ring-4", "ring-emerald-300");

    const categoryName = btn.textContent.trim();
    searchByCategory(categoryName);
});

async function searchByCategory(categoryName) {
    try {
        const params = new URLSearchParams({
            action: "process",
            tagtype_0: "categories",
            tag_contains_0: "contains",
            tag_0: categoryName,
            page_size: 24,
            json: 1
        });

        const response = await fetch(`${PRODUCTS_API}/cgi/search.pl?${params}`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        productArr = [];

        for (let i = 0; i < data.products.length; i++) {
            let product = data.products[i];
            let nutrition = product.nutriments || {};

            if (!product.product_name && !product.product_name_en) continue;

            productArr.push({
                barcode: product.code,
                name: product.product_name || product.product_name_en,
                brand: product.brands,
                image: product.image_front_url || product.image_url,
                quantity: product.quantity,
                nutritionGrade: product.nutrition_grades || product.nutrition_grade_fr,
                novaGroup: product.nova_group,
                calories: nutrition["energy-kcal_100g"],
                protein: nutrition.proteins_100g,
                carbs: nutrition.carbohydrates_100g,
                fat: nutrition.fat_100g,
                sugar: nutrition.sugars_100g
            });
        }

        displayProducts(productArr);

    } catch (error) {
        console.error("Category Search Error:", error);
        displayProducts([]);
    }
}







// ===== product details modal =====
const productModal = document.getElementById("product-detail-modal");

productsContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;

    getProductDetails(card.dataset.barcode);
});

async function getProductDetails(barcode) {
    const response = await fetch(`${PRODUCTS_API}/api/v2/product/${barcode}.json`);
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();

    displayProductDetails(data.product, barcode);
    productModal.classList.remove("hidden");
}

function getGradeColor(grade) {
    if (grade === "a") return "#038141";
    if (grade === "b") return "#85bb2f";
    if (grade === "c") return "#fecb02";
    if (grade === "d") return "#ee8100";
    return "#e63e11";
}

// color of nova
function getNovaColor(nova) {
    if (nova == 1) return "#038141";
    if (nova == 2) return "#85bb2f";
    if (nova == 3) return "#ee8100";
    return "#e63e11";
}

function displayProductDetails(product, barcode) {
    let x = product.nutriments || {};

    let name = product.product_name || "Unknown Product";
    let brand = product.brands || "Unknown Brand";
    let image = product.image_front_url || product.image_url || "";
    let quantity = product.quantity || "";
    let ingredients = product.ingredients_text || "No ingredients found";
    let calories = Math.round(x["energy-kcal_100g"] || 0);
    let protein = Math.round(x.proteins_100g || 0);
    let carbs = Math.round(x.carbohydrates_100g || 0);
    let fat = Math.round(x.fat_100g || 0);
    let sugar = Math.round(x.sugars_100g || 0);
    let satFat = Math.round(x["saturated-fat_100g"] || 0);
    let fiber = Math.round(x.fiber_100g || 0);
    let salt = Math.round(x.salt_100g || 0);


    currentProduct = {
    name: name,
    image: image,
    calories: x["energy-kcal_100g"] || 0,
    protein: x.proteins_100g || 0,
    carbs: x.carbohydrates_100g || 0,
    fat: x.fat_100g || 0
};


    let gradeBox = "";
    if (product.nutrition_grades) {
        let grade = product.nutrition_grades;
        let color = getGradeColor(grade);
        gradeBox = `
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${color}20">
            <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold uppercase" style="background-color: ${color}">${grade}</span>
            <p class="text-xs font-bold" style="color: ${color}">Nutri-Score</p>
        </div>`;
    }

    let novaBox = "";
    if (product.nova_group) {
        let color = getNovaColor(product.nova_group);
        novaBox = `
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${color}20">
            <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style="background-color: ${color}">${product.nova_group}</span>
            <p class="text-xs font-bold" style="color: ${color}">NOVA</p>
        </div>`;
    }

    let allergensBox = "";
    let allergens = product.allergens_tags || [];
    if (allergens.length > 0) {
        let names = "";
        for (let i = 0; i < allergens.length; i++) {
            names += allergens[i].replace("en:", "") + " ";
        }
        allergensBox = `
        <div class="bg-red-50 rounded-xl p-5 mb-6 border border-red-200">
            <h3 class="font-bold text-red-700 mb-2">
                <i class="fa-solid fa-triangle-exclamation"></i> Allergens
            </h3>
            <p class="text-sm text-red-600 capitalize">${names}</p>
        </div>`;
    }

    productModal.innerHTML = `
    <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6">

            <div class="flex items-start gap-6 mb-6">
                <div class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                    <img src="${image}" alt="${name}" class="w-full h-full object-contain">
                </div>
                <div class="flex-1">
                    <p class="text-sm text-emerald-600 font-semibold mb-1">${brand}</p>
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">${name}</h2>
                    <p class="text-sm text-gray-500 mb-3">${quantity}</p>
                    <div class="flex items-center gap-3">
                        ${gradeBox}
                        ${novaBox}
                    </div>
                </div>
                <button class="close-product-modal text-gray-400 hover:text-gray-600">
                    <i class="text-2xl fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="bg-emerald-50 rounded-xl p-5 mb-6 border border-emerald-200">
                <h3 class="font-bold text-gray-900 mb-4">
                    Nutrition Facts <span class="text-sm font-normal text-gray-500">(per 100g)</span>
                </h3>
                <div class="text-center mb-4 pb-4 border-b border-emerald-200">
                    <p class="text-4xl font-bold text-gray-900">${calories}</p>
                    <p class="text-sm text-gray-500">Calories</p>
                </div>
                <div class="grid grid-cols-4 gap-4 text-center">
                    <div>
                        <p class="text-lg font-bold text-emerald-600">${protein}g</p>
                        <p class="text-xs text-gray-500">Protein</p>
                    </div>
                    <div>
                        <p class="text-lg font-bold text-blue-600">${carbs}g</p>
                        <p class="text-xs text-gray-500">Carbs</p>
                    </div>
                    <div>
                        <p class="text-lg font-bold text-purple-600">${fat}g</p>
                        <p class="text-xs text-gray-500">Fat</p>
                    </div>
                    <div>
                        <p class="text-lg font-bold text-orange-600">${sugar}g</p>
                        <p class="text-xs text-gray-500">Sugar</p>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-emerald-200 text-center">
                    <div>
                        <p class="text-sm font-semibold text-gray-900">${satFat}g</p>
                        <p class="text-xs text-gray-500">Saturated Fat</p>
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-gray-900">${fiber}g</p>
                        <p class="text-xs text-gray-500">Fiber</p>
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-gray-900">${salt}g</p>
                        <p class="text-xs text-gray-500">Salt</p>
                    </div>
                </div>
            </div>

            <div class="bg-gray-50 rounded-xl p-5 mb-6">
                <h3 class="font-bold text-gray-900 mb-3">Ingredients</h3>
                <p class="text-sm text-gray-600">${ingredients}</p>
            </div>

            ${allergensBox}

            <div class="flex gap-3">
                <button class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all" data-barcode="${barcode}">
                    <i class="mr-2 fa-solid fa-plus"></i> Log This Food
                </button>
                <button class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">Close</button>
            </div>

        </div>
    </div>`;
}

// close the modal (X button, Close button, or the dark background)
productModal.addEventListener("click", (e) => {
    if (e.target === productModal || e.target.closest(".close-product-modal")) {
        productModal.classList.add("hidden");
    }
});




// ===== log the product =====
productModal.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".add-product-to-log");
    if (!addBtn) return;
    if (!currentProduct) return;

    const item = {
        id: Date.now(),
        name: currentProduct.name,
        image: currentProduct.image,
        type: "Product",
        amount: "100g",
        servings: 1,
        calories: Math.round(currentProduct.calories),
        protein: Math.round(currentProduct.protein),
        carbs: Math.round(currentProduct.carbs),
        fat: Math.round(currentProduct.fat),
        date: new Date().toDateString(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const list = getFoodLog();
    list.push(item);
    saveFoodLog(list);
    displayMealInLog();

    productModal.classList.add("hidden");

    Swal.fire({
        title: `${item.name} has been added to your log`,
        html: `<span style="color: green; font-size: 14px;">
            ${item.calories} calories
        </span>`,
        customClass: {
            title: "small-title"
        },
        icon: "success"
    });
});











function hideLoading() {
    loadingOverlay.style.opacity = "0";
    setTimeout(() => {
        loadingOverlay.style.display = "none";
    }, 500);
}