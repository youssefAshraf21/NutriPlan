var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productPadge = document.getElementById("productPadge");
var productCount = document.getElementById("productCount");
var productImage = document.getElementById("productImage");
var productSearch = document.getElementById("productSearch");
var updateBtn = document.getElementById("updateBtn");
var addBtn = document.getElementById("addBtn");
var productNameError = document.getElementById("productNameError");
var productPriceError = document.getElementById("productPriceError");
var contactCardContainer = document.getElementById("contactCardContainer");
var updateIndex; 
var productList = [];



if(localStorage.getItem("productArr") != null) {
    productList = JSON.parse(localStorage.getItem("productArr"));
    displayProduct(productList);   
}



function addProduct() {
    if(validateProductName() == true) {
        var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDescription.value,
        img: productImage.files[0]
    ? `./img/${productImage.files[0].name}`
    : "./img/img1.jpg"
    }
    productList.push(product);
    localStorage.setItem("productArr", JSON.stringify(productList));

    clearInputs()
    displayProduct(productList)
    }else {
        alert("Please enter a valid product name. It must be at least 4 characters long and start with a capital letter.");
    }

}




function displayProduct(arr) {
    var cartona = "";
    productCount ? productCount.innerHTML = `${arr.length} product` : productCount.innerHTML = `0 product`;
    for(var i = 0; i < arr.length; i++) {
        cartona += `<div class="col-lg-4">
                        <div class="card">
                        <img id="productImage" src="${arr[i].img}" class="card-img-top position-relative" alt="...">
                            <span class="badge ${getBadgeClass(arr[i].category)} position-absolute top-0 end-0 m-2 px-3 py-1 rounded-5">${arr[i].category}</span>
                            <div class="card-body">
                                <h5 class="card-title">${arr[i].name}</h5>
                                <p class="card-text">${arr[i].description}</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-between p-3">
                                <h3 class="text-primary fw-bold m-0">${arr[i].price}</h3>
                                <div class="d-flex align-items-center ">
                                    <button onclick="deletProduct(${i})" id="deletProduct" class="btn btn-outline-danger rounded-end-0"><i class="fa-regular fa-trash-can"></i></button>
                                    <button onclick="getProductToUpdate(${i})" class="btn btn-outline-warning rounded-start-0"><i class="fa-solid fa-pencil"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>`
    }
    document.getElementById("productCards").innerHTML = cartona
}


function clearInputs() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";
}

function deletProduct(index){
    productList.splice(index, 1);
    localStorage.setItem("productArr", JSON.stringify(productList));
    displayProduct(productList);
}


function getBadgeClass(category) {
    category = category.toLowerCase();

    if (category == "tv") {
        return "text-bg-success";
    } else if (category == "mobile") {
        return "text-bg-primary";
    } else if (category == "laptop") {
        return "text-bg-warning";
    } else {
        return "text-bg-secondary";
    }

}


function searchProduct() {
    var searchValue = productSearch.value.toLowerCase();
    var searchArr = [];
    for(var i = 0; i< productList.length; i++) {
        if(productList[i].name.trim().toLowerCase().includes(searchValue)){
            searchArr.push(productList[i]);
        }
    }
    displayProduct(searchArr);
}


function getProductToUpdate(index) {
    updateIndex = index;

    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");

    window.scrollTo({ top: 0, behavior: "smooth" });

    productName.value = productList[index].name;
    productPrice.value = productList[index].price;
    productCategory.value = productList[index].category;
    productDescription.value = productList[index].description;
}



    function updateProduct() {
        productList[updateIndex].name = productName.value;
        productList[updateIndex].price = productPrice.value;
        productList[updateIndex].category = productCategory.value;
        productList[updateIndex].description = productDescription.value;
        localStorage.setItem("productArr", JSON.stringify(productList));
        displayProduct(productList);
        clearInputs();
        addBtn.classList.remove("d-none");
        updateBtn.classList.add("d-none");
}


function validateProductName() {
    var productNameRegex = /^[A-Z]\w{3,}$/;
    if(productNameRegex.test(productName.value)) {
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        productNameError.classList.add("d-none");
        return true;
    } else {
        productNameError.classList.remove("d-none");
        productName.classList.remove("is-valid");
        productName.classList.add("is-invalid");
        return false;
    }
}


function validatePrice() {
    var productPriceRegex = /^(?!0+(?:\.0{1,2})?$)\d+(?:\.\d{1,2})?$/;
    if(productPriceRegex.test(productPrice.value)) {
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");
        productPriceError.classList.add("d-none");
        return true;
    } else {
        productPrice.classList.remove("is-valid");
        productPrice.classList.add("is-invalid");
        productPriceError.classList.remove("d-none");
        return false;
    }
}


function validateCategory() {
    var productCategoryRegex = /^(TV|Mobile|Laptop)$/i;
    if(productCategoryRegex.test(productCategory.value)) {
        productCategory.classList.add("is-valid");
        productCategory.classList.remove("is-invalid");
        productCategoryError.classList.add("d-none");
        return true;
    } else {
        productCategory.classList.remove("is-valid");
        productCategory.classList.add("is-invalid");
        productCategoryError.classList.remove("d-none");
        return false;
    }
}


function productImg() {
    var productImageRegex = /^.+\.(jpg|jpeg|png|gif)$/i;
    if(productImageRegex.test(productImage.value)) {
        productImage.classList.add("is-valid");
        productImage.classList.remove("is-invalid");
        productImageError.classList.add("d-none");
        return true;
    } else {
        productImage.classList.remove("is-valid");
        productImage.classList.add("is-invalid");
        productImageError.classList.remove("d-none");
        return false;
    }
}
