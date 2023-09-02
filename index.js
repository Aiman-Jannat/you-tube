let count = 1;

const fetch1 = async() =>  {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    const allTab = document.getElementById('tabs');

    data.data.forEach(category => {
        const dynamicTab = document.createElement('div');
        dynamicTab.innerHTML=`
    <a id=${count} class="inActive" onclick=displayCards('${category.category_id}',${count})>${category.category}</a> 
        `;
        allTab.append(dynamicTab); 
        count++;    
    });
}
let dynamicid=0;
const displayCards = (categoryId,id) => {
    if(dynamicid!=0)
    {
        const inelement = document.getElementById(dynamicid);
        inelement.classList?.remove('active');
        inelement.classList?.add('inActive');

    }
   
    const element = document.getElementById(id);
    element.classList.remove('inActive');
    element.classList.add('active');
    dynamicid=id;
    displayAllCards(categoryId);


}

const displayAllCards = async(categoryId) =>
{
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const datas = await response.json();
    const getParentId = document.getElementById('cards');
    const nothingParent = document.getElementById('nothing');
    getParentId.innerHTML=``;
    getParentId.innerHTML=``;
    if(datas.data.length==0)
    {
        const nothingParent = document.getElementById('nothing');
        const newNothing = document.createElement('div');
        newNothing.innerHTML=`
        <img src="images/Icon.png" class="w-20 mx-auto" alt="">
            <p class="text-2xl mt-7 font-bold">Oops!! Sorry, There is no <br>
            content here
            </p>
            `;
           
        nothingParent.appendChild(newNothing);
    }
    datas.data.forEach(category => {
       if(category.authors[0].verified)
       {
        const appendDiv = document.createElement('div');
        appendDiv.innerHTML=
        `
        <div class=" w-full rounded-none text-start  ">
        <figure class="h-[170px]"><img src="${category.thumbnail}" class="h-full w-full rounded-" class="rounded-none " alt="card" /></figure>
        <div class="card-body w-full px-0 mx-0 h-full pt-3    ">
            <div class="ftwoline text-start w-full pt-0 mt-0   flex gap-3">
            <img src="${category.authors[0].profile_picture} " class="h-9 w-9 rounded-full" alt="">
          <div>
            <h2 class="card-title font-bold text-base text-black">${category.title}</h2>
            <div class="flex items-center justify-start gap-2">
          <div><p>${category.authors[0].profile_name}</p></div>
          <div><img src="images/icons8-tiktok-verified-account-48.png" id="varified" class=" w-3 h-3  
          isVarified(${category.authors[0].verified})">
          </div>
        
          </div>
          <p>${category.others.views} views</p>

          </div>
        </div>
          
        </div>
      </div>
        `;
        
        getParentId.appendChild(appendDiv);
       }
       else{
        const appendDiv = document.createElement('div');
        appendDiv.innerHTML=
        `
        <div class=" w-full rounded-none text-start  ">
        <figure class="h-[170px]"><img src="${category.thumbnail}" class="h-full w-full rounded-" class="rounded-none " alt="card" /></figure>
        <div class="card-body w-full px-0 mx-0 h-full pt-3    ">
            <div class="ftwoline text-start w-full pt-0 mt-0   flex gap-3">
            <img src="${category.authors[0].profile_picture} " class="h-9 w-9 rounded-full" alt="">
          <div>
            <h2 class="card-title font-bold text-base text-black">${category.title}</h2>
            <div class="flex items-center justify-start gap-2">
          <div><p>${category.authors[0].profile_name}</p></div>
          
        
          </div>
          <p>${category.others.views} views</p>

          </div>
        </div>
          
        </div>
      </div>
        `;
        
        getParentId.appendChild(appendDiv);
       }


    });
}


const isVarified = (vary) =>{
    console.log(vary);
   if(!vary)
   return 'hidden';
}




fetch1();