const API_Key = "wfpazKJZED4K-gQI1jpBsk4Bq2s4M9YZc6LiNEjrFDU";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector('.search-results');
const showMoreBtn = document.getElementById("show-more-btn");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = searchInputEl.value;
    console.log(inputData);
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${encodeURI(inputData)}&client_id=${API_Key}`;
    console.log(url);
    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            searchResultsEl.innerHTML = '';
        }

        results.forEach((result) => {
            const imgContainer = document.createElement("div");
            imgContainer.classList.add("search-result");
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            imgContainer.appendChild(image);
            imgContainer.appendChild(imageLink);
            searchResultsEl.appendChild(imgContainer);
        });

        page++;
        if (page > 1) {
            showMoreBtn.style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    searchImages();
});

// Initially hide the "Show More" button
showMoreBtn.style.display = "none";