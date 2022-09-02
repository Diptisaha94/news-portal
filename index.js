const newsData = async()=>{
const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
const data = await res.json();
 return data.data.news_category;
}
//newsData();
const itemData = async(category)=>{
    const url = `https://openapi.programming-hero.com/api/news/category/${category}`;
    const res = await fetch(url);
    const data = await res.json();
     return data.data;
    }
//itemFound();
const displayItem = async(category)=>{
    const itemInfo = await itemData(category);
    const itemField = document.getElementById('display-item');
    itemField.textContent = "";
    itemInfo.forEach(item =>{
        //console.log(item);
        const {title,thumbnail_url,details,author} = item;
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${details.length > 300 ? details.slice(0,300) + "...": title}</p>
                  <div class= "d-flex justify-content-between align-content-center mt-3">
                  <div class="d-flex">
                  <img src="${author.img}" class=" author-img" alt="...">
                  <div>
                  <h3 class="fs-6">${author.name}<h3>
                  <p class="fs-6">${author.published_date}</p>
                  </div> 
                  </div>
                  <div>
                  <p class="fs-6"> <i class="fa-regular fa-eye"></i>  ${item.total_view}</p>
                  </div>
                  <div>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  See Datail
</button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        `;
        itemField.appendChild(div);

    })
} 
//displayItem('02');

const displayCatagory= async()=>{
const categoryData = await newsData();
//console.log(categoryData);
const itemContainer = document.getElementById('item-category');
itemContainer.textContent = "";
categoryData.forEach(item => {
    //console.log(item);
    const div = document.createElement('div');
    div.innerHTML = `
    <a href="" class="fs-6 text-decoration-none">${item.category_name}</a>
    `;
    displayItem(item.category_id);
    itemContainer.appendChild(div);
    //displayItem(item.category_id);
    //displayItem('03');
});
}
displayCatagory();
const detailData= async()=>{
    const url = `https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a`;
    const res = await fetch(url);
    const data = await res.json();
     return data.data;
    }
    const displayDataildata=async()=>{
        const dataDetail = await detailData();
        console.log(dataDetail); 
    }
    displayDataildata();
