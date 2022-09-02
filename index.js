const newsData = async()=>{
const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
const data = await res.json();
 return data.data.news_category;
}
//newsData();

const displayCatagory= async()=>{
const categoryData = await newsData();
console.log(categoryData);
const itemContainer = document.getElementById('item-category');
categoryData.forEach(item => {
    //console.log(item);
    const div = document.createElement('div');
    div.innerHTML = `
    <a href="" class="fs-6 text-decoration-none">${item.category_name}</a>
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
    console.log(itemInfo);
}
displayItem();