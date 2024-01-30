let display = document.querySelector("#display");

let displayMealData = document.querySelector("#displayMealData");

document.getElementById("displayMain").classList.add("d-flex");

function toggleDiv(divId) {
  const divs = document.querySelectorAll(".divs > div");

  divs.forEach((div) => div.classList.remove("d-flex"));

  const selectedDiv = document.getElementById(divId);
  if (selectedDiv) {
    selectedDiv.classList.remove("d-none");
    selectedDiv.classList.add("d-flex");
  }
}

$(".insp").on("click", function () {
  let width = $(".inner").outerWidth();
  let left = $(".sideNav").css("left");
  console.log(width);
  if (left == "0px") {
    $(".sideNav").animate({ left: `-${width}px` }, 800);
  } else {
    $(".sideNav").animate({ left: 0 }, 800);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      displayData(data.meals);
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function displayData(arr) {
  let temp = "";
  for (let i = 0; i < arr.length; i++) {
    temp += ` <div id="${arr[i].idMeal}" class="meal my-2  col-md-3 col-sm-12 ">
        <div class="img">
            <img src="${arr[i].strMealThumb}" class='rounded-3' alt="">
        </div>
        <div class="name p-3 ">
            <h2>${arr[i].strMeal}</h2>
        </div>
    </div>`;
  }
  display.innerHTML = temp;
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      displayData(data.meals);
    })
    .catch((error) => console.error("Error fetching data:", error));
});

document.querySelector("#display").addEventListener("click", function (event) {
  const clickedMeal = event.target.closest(".meal");
  if (clickedMeal) {
    const mealId = clickedMeal.id;
    document.querySelector(".main").classList.add("d-none");
    document.querySelector(".main").classList.remove("d-flex");
    document.querySelector(".meal-details").classList.add("d-flex");
    document.querySelector(".meal-details").classList.remove("d-none");

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        displayMData(data.meals[0]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
});

document
  .querySelector("#searchData")
  .addEventListener("click", function (event) {
    const clickedMeal = event.target.closest(".meal");
    if (clickedMeal) {
      const mealId = clickedMeal.id;
      document.querySelector(".bySearch").classList.add("d-none");
      document.querySelector(".bySearch").classList.remove("d-flex");
      document.querySelector(".searchedData").classList.add("d-flex");
      document.querySelector(".searchedData").classList.remove("d-none");

      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          displayMDataS(data.meals[0]);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  });

function displayMDataS(meal) {
  let temp = "";
  let ingredients = ``;

  document
    .querySelector("#searchData")
    .addEventListener("click", function (event) {
      const clicked = event.target.closest(".close");
      if (clicked) {
        document.querySelector(".main").classList.remove("d-none");
        document.querySelector(".main").classList.add("d-flex");
        document.querySelector(".bySearch").classList.remove("d-flex");
        document.querySelector(".bySearch").classList.add("d-none");
      }
    });

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }
  temp += `
    <div id="close" class="col-lg-1 col-md-1">
                <button class="btn close text-light">
                    <i class="fa-solid fa-x"></i>
                </button>
            </div>
    <div class="col-lg-5 col-md-11">
                <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            <div class="col-lg-6 col-md-12">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <ul class="w-100 list-unstyled">
                    <li class="p-1"><span class="fw-bolder">Area:</span>${meal.strArea}</li>
                    <li class="p-1"><span class="fw-bolder">Category:</span>${meal.strCategory}</li>
                    <li class="p-1"><span class="fw-bolder">Recipes:</span>
                        <ul class="list-unstyled d-flex g-2 flex-wrap">
                        ${ingredients}
                        </ul>
                    </li>
                    <li class="p-1"><span class="fw-bolder">Tags:</span> 
                        <ul class="list-unstyled d-flex g-2 flex-wrap">
                        ${tagsStr}
                        </ul>
                    </li>
                </ul>
                <a href="${meal.strSource}"><button class="btn btn-success ">Source</button></a>
                <a href="${meal.strYoutube}"><button class="btn btn-danger ">YouTube</button></a>
            </div>
            `;
  displayMealData.innerHTML = temp;
}

function displayMData(meal) {
  let temp = "";
  let ingredients = ``;

  document
    .querySelector("#displayMealData")
    .addEventListener("click", function () {
      const clicked = event.target.closest(".close");
      if (clicked) {
        document.querySelector(".main").classList.remove("d-none");
        document.querySelector(".main").classList.add("d-flex");
        document.querySelector(".meal-details").classList.remove("d-flex");
        document.querySelector(".meal-details").classList.add("d-none");
      }
    });

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }
  temp += `
    <div id="close" class="col-lg-1 col-md-1">
                <button class="btn close text-light">
                    <i class="fa-solid fa-x"></i>
                </button>
            </div>
    <div class="col-lg-5 col-md-11">
                <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            <div class="col-lg-6 col-md-12">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <ul class="w-100 list-unstyled">
                    <li class="p-1"><span class="fw-bolder">Area:</span>${meal.strArea}</li>
                    <li class="p-1"><span class="fw-bolder">Category:</span>${meal.strCategory}</li>
                    <li class="p-1"><span class="fw-bolder">Recipes:</span>
                        <ul class="list-unstyled d-flex g-2 flex-wrap">
                        ${ingredients}
                        </ul>
                    </li>
                    <li class="p-1"><span class="fw-bolder">Tags:</span> 
                        <ul class="list-unstyled d-flex g-2 flex-wrap">
                        ${tagsStr}
                        </ul>
                    </li>
                </ul>
                <a href="${meal.strSource}"><button class="btn btn-success ">Source</button></a>
                <a href="${meal.strYoutube}"><button class="btn btn-danger ">YouTube</button></a>
            </div>
            `;
  displayMealData.innerHTML = temp;
}

async function searchByName(term) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();

  response.meals
    ? displaySearchResults(response.meals)
    : displaySearchResults([]);
}

async function searchByLetter(term) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();

  response.meals
    ? displaySearchResults(response.meals)
    : displaySearchResults([]);
}

function displaySearchResults(arr) {
  let temp = "";
  const searchData = document.getElementById("searchData");

  const searchedDataContainer = document.querySelector(".searchedData");
  if (searchedDataContainer.classList.contains("d-none")) {
    searchedDataContainer.classList.remove("d-none");
  }

  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      temp += `<div class="meal my-2  col-md-3 col-sm-12 ">
                        <div class="img">
                            <img src="${arr[i].strMealThumb}" class='rounded-3' alt="">
                        </div>
                        <div class="name p-3 ">
                            <h2>${arr[i].strMeal}</h2>
                        </div>
                    </div>`;
    }
  } else {
    temp = '<p class="text-light">No results found.</p>';
  }
  searchData.innerHTML = temp;
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      displayData(data.meals);
    })
    .catch((error) => console.error("Error fetching data:", error));
});

document
  .querySelector("#categoryView")
  .addEventListener("click", async function () {
    console.log("categories");
    document.querySelector("#categoriesData").innerHTML = "";

    try {
      let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      response = await response.json();
      console.log(response.categories);
      displayCategories(response.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  });

function displayCategories(arr) {
  let temp = "";
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    temp += `<div onclick="getCategoryMeals('${
      arr[i].strCategory
    }')" id='' class="cateCard my-2  col-md-3 col-sm-12 text-center text-light">
    <div class="img">
        <img src="${arr[i].strCategoryThumb}" class='rounded-3' alt="">
    </div>
    <div class="cateInfo p-3 ">
        <h2>${arr[i].strCategory}</h2>
        <p>${arr[i].strCategoryDescription
          .split(" ")
          .slice(0, 20)
          .join(" ")}</p>
    </div>
</div>`;
  }
  document.querySelector("#categoriesData").innerHTML = temp;
}

document
  .querySelector("#areaView")
  .addEventListener("click", async function () {
    console.log("Area");
    document.querySelector("#areaData").innerHTML = "";

    try {
      let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      response = await response.json();
      console.log(response.meals);
      displayArea(response.meals);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  });

function displayArea(arr) {
  let temp = "";
  for (let i = 0; i < arr.length; i++) {
    temp += `<div onclick="getAreaMeals('${arr[i].strArea}')" class="areaCard my-2  col-md-3 col-sm-12 text-center text-light">
    <i class="fa-solid fa-warehouse"></i>
    <h1>${arr[i].strArea}</h1>
</div>`;
  }
  document.querySelector("#areaData").innerHTML = temp;
}

document
  .querySelector("#ingredientsView")
  .addEventListener("click", async function () {
    console.log("ingredients");
    document.querySelector("#ingredientsData").innerHTML = "";

    try {
      let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      response = await response.json();
      console.log(response.meals);
      ingredientsDisplay(response.meals);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  });

function ingredientsDisplay(arr) {
  let temp = "";
  for (let i = 0; i < arr.length; i++) {
    const description = arr[i].strDescription || "";
    temp += `<div onclick="getIngredientsMeals('${
      arr[i].strIngredient
    }')" class="ingredientCard my-2  col-md-3 col-sm-12 text-center text-light">
      <i class="fa-solid fa-drumstick-bite"></i>
      <h1>${arr[i].strIngredient}</h1>
      <p>${description.split(" ").slice(0, 20).join(" ")}</p>
    </div>`;
  }
  document.querySelector("#ingredientsData").innerHTML = temp;
}

async function getCategoryMeals(category) {
  document.querySelector("#categoriesData").innerHTML = "";
  // $(".inner-loading-screen").fadeIn(300)

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();

  displayData(response.meals);
}

async function getAreaMeals(area) {
  document.querySelector("#areaData").innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();

  displayData(response.meals);
  $(".inner-loading-screen").fadeOut(300);
}

async function getIngredientsMeals(ingredients) {
  document.querySelector("#ingredientsData").innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();

  displayData(response.meals);
  $(".inner-loading-screen").fadeOut(300);
}

function validateForm() {
  let fullName = document.getElementById("fullName").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let age = document.getElementById("age").value;
  let password = document.getElementById("password").value;
  let repassword = document.getElementById("repassword").value;

  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  const ageRegex = /^\d+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!nameRegex.test(fullName)) {
    alert("Please enter a valid Full Name");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Please enter a valid Email address");
    return;
  }

  if (!phoneRegex.test(phone)) {
    alert("Please enter a valid Phone number");
    return;
  }

  if (!ageRegex.test(age)) {
    alert("Please enter a valid Age");
    return;
  }

  if (!passwordRegex.test(password)) {
    alert(
      "Password must contain at least 8 characters, including at least one letter and one number"
    );
    return;
  }

  if (password !== repassword) {
    alert("Passwords do not match");
    return;
  }

  fullName = "";
  email = "";
  phone = "";
  age = "";
  password = "";
  repassword = "";
  
  alert("Form submitted successfully!");
  return false;
}
