let arr = [];
let page = 1;
let id;

async function loadData() {
  let res = await fetch(
    `https://api.unsplash.com/photos/?client_id=pS4eP1mCKl80pqm03xgglzhI_6DgVgukr6NuMuZTkOc&page=${page}`
  );
  let data = await res.json();
  appendData(data);
}

function appendData(data) {
  data.map((e) => {
    let grid_container = document.querySelector("#grid-container");
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = e.urls.regular;
    div.append(img);
    grid_container.append(div);
  });
}

loadData();

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    page++;

    loadData();
  }
});

document.querySelector(".search-input").addEventListener("input", () => {
  debounce(changeinput, 1500);
});

async function changeinput() {
  let data = document.querySelector(".search-input").value;

  let res = await fetch(
    `https://pixabay.com/api/?key=17985948-582177b10c03ca7228abb7bbc&q=${data}&image_type=photo&pretty=true&per_page=30&`
  );

  let response = await res.json();

  searchImages(response.hits);
}

function debounce(func, delay) {
  clearTimeout(id);
  id = setInterval(() => {
    func();
  }, delay);
}

function searchImages(res) {
  console.log(res);
  let grid_container = document.querySelector("#grid-container");
  grid_container.innerHTML = null;

  res.map(({ webformatURL }) => {
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = webformatURL;
    div.append(img);
    grid_container.append(div);
  });
}
