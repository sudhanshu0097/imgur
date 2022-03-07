let arr = [];
let page = 1;
async function loadData () {
   let res = await fetch(`https://api.unsplash.com/photos/?client_id=pS4eP1mCKl80pqm03xgglzhI_6DgVgukr6NuMuZTkOc&page=${page}`);
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
    })
    
}

loadData();

window.addEventListener('scroll', () => {
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        page++;
        loadData();
    }
})

