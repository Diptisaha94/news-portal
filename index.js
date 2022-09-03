const newsData = async()=>{
  const message = document.getElementById('err');
  message.innerHTML = "";
try{
  const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
const data = await res.json();
 return data.data.news_category;
}catch(error){
  message.innerHTML = "Input is " + error;
}
}
//newsData();
const itemData = async(category)=>{
  const message = document.getElementById('err');
  message.innerHTML = "";
try{
    const url = `https://openapi.programming-hero.com/api/news/category/${category}`;
    const res = await fetch(url);
    const data = await res.json();
     return data.data;
}catch(error){
  message.innerHTML = "Input is " + error;
}
    }
//itemFound();
const displayItem = async(category)=>{
    const itemInfo = await itemData(category);
    //console.log(itemInfo); 
    toggleSpinner(true);
    const itemField = document.getElementById('display-item');
    itemField.textContent = "";
    const itemCountField = document.getElementById("item-count");
    itemCountField.innerText ='';
    if(itemInfo.length>0){
      itemCountField.innerText = itemInfo.length;
    }else{
      itemCountField.innerText = "No";
    }
    //console.log(itemInfo.length);
    itemInfo.forEach((item) =>{
       // console.log(item,count);
        const {title,thumbnail_url,details,author} = item;
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4 col-sm-12">
                <img src="${thumbnail_url?thumbnail_url:'No picture here'}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8 col-sm-12">
                <div class="card-body">
                  <h5 class="card-title">${title?title:'No title'}</h5>
                  <p class="card-text">${details.length > 400 ? details.slice(0,400) + "...": details}</p>
                  <div class= "d-flex flex-lg-row justify-content-between align-content-center mt-3 flex-md-row flex-column">
                  <div class="d-flex">
                  <img src="${author.img?author.img:'image missing'}" class=" author-img" alt="...">
                  <div>
                  <h3 class="fs-6">${author.name?author.name:'No author name'}<h3>
                  <p class="fs-6">${author.published_date?author.published_date:'no date'}</p>
                  </div> 
                  </div>
                  <div>
                  <p class="fs-6"> <i class="fa-regular fa-eye"></i>  ${item.total_view?item.total_view:'No view'}</p>
                  </div>
                  <div>
                  <button onclick="detailData('${item._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
    toggleSpinner(false);
} 

const displayCatagory= async()=>{
const categoryData = await newsData();
//console.log(categoryData);
const itemContainer = document.getElementById('item-category');
itemContainer.textContent = "";
categoryData.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `
    <h3 onclick="displayItem('${item.category_id}')"  class="fs-6">${item.category_name}</h3>
    `;
    itemContainer.appendChild(div);
});
}
displayCatagory();
const detailData= async(id)=>{
  const message = document.getElementById('err');
  message.innerHTML = "";
try{
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDataildata(data.data[0]);
}catch(error){
    message.innerHTML = "Input is " + error;
  }
    }
    const displayDataildata=(items)=>{
        const modal = document.getElementById('modal');
        modal.textContent="";
        const div = document.createElement('div');
        div.innerHTML=`
        <h6>${items.title?items.title:'No title'}</h6>
        <img src="${items.image_url?items.image_url:'No image'}" class="img-fluid rounded-start" alt="...">
        <p>${items.details?items.details:'No datails'}</p>
        <div class="d-flex flex-sm-column">
                  <img src="${items.author.img?items.author.img:'not found'}" class=" author-img" alt="...">
                  <div>
                  <h3 class="fs-6">${items.author.name?items.author.name:'No author name'}<h3>
                  <p class="fs-6">${items.author.published_date?items.author.published_date:"No date publish"}</p>
                  </div> 
                  </div>

        `
        modal.appendChild(div);
    }
    const toggleSpinner = isLoading => {
      const spinerSection = document.getElementById('spinner');
      if(isLoading){
        spinerSection.classList.remove('d-none')
      }
      else{
        spinerSection.classList.add('d-none');
      }
  }
    
