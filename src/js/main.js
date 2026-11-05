
const API_KEY  = "TGJnKT7kRQHzRHrpbNPfddPzPLpftLJjHkbCmmpD"
const BASE_URL = "https://nutriplan-api.vercel.app/api"


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



async function getNutrition() {
    const response = await fetch(`${BASE_URL}/meals/search`, {
    });
    const data = await response.json();
    const meals = data.results;
    console.log(meals);
}

getNutrition();


