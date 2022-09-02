const newsData = async()=>{
const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
const data = await res.json();
 return data.data.news_category;
}
//newsData();

const displayCatagory= async()=>{
const categoryData = await newsData();
//console.log(categoryData);
const itemContainer = document.getElementById('item-category');
categoryData.forEach(item => {
    //console.log(item);
    const div = document.createElement('div');
    div.innerHTML = `
    <button onclick="displayItem('${item.category_id}')" class="fs-6 text-decoration-none">${item.category_name}</button>
    `;
    itemContainer.appendChild(div);
});
}
displayCatagory();
const itemData = async(category)=>{
    const url = `https://openapi.programming-hero.com/api/news/category/${category}`;
    const res = await fetch(url);
    const data = await res.json();
     return data.data;
    }
//itemFound();
const displayItem = async()=>{
    const itemInfo = await itemData();
    const itemField = document.getElementById('display-item');
    itemInfo.forEach(item =>{
        console.log(item);
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
                  <button type="button" class="btn btn-primary">See Datails</button>
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
displayItem();