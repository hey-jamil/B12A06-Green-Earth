const urlAll = "https://openapi.programming-hero.com/api/";
const urlCat = "https://openapi.programming-hero.com/api/categories";
const catContainer = document.getElementById('cat-container');
const prodContainer = document.getElementById('prod-container')
const modalsection= document.getElementById('modal');
let cart = [];
function updateCartUI(){
 const cartDiv = document.getElementById('cart-div')
 const totalCost = document.getElementById('totalCost')
 let total=0;
 cartDiv.innerHTML=""
 if (cart.length === 0){
    totalCost.textContent=""
 }else{
     cart.forEach((item, index) => {
    total += (item.price*item.quantity);
    const itemDiv = document.createElement('div')
    itemDiv.classList.add(
        "cart-container",
        "px-2",
        "mb-2"
    )
    itemDiv.innerHTML=`
        <div
        class="cart-item bg-[#F0FDF4] p-1 flex justify-between items-center rounded-lg"
        >
                <div>
                  <h2 class="text-sm font-bold">${item.name}</h2>
                  <h2 class="text-gray-500">
                    $<span>${item.price}</span> x <span>${item.quantity}</span>
                  </h2>
                </div>
                <div>
                  <button class="deletecart" data-index=${index}>
                    <i class="fa-solid fa-xmark text-gray-500"></i>
                  </button>
                </div>
        </div>
    `
    cartDiv.appendChild(itemDiv)
    
    const deleteBtn= itemDiv.querySelector('.deletecart')
     deleteBtn.addEventListener('click', (e)=>{
            const index= e.currentTarget.dataset.index;
            cart.splice(index, 1);
            updateCartUI();
        })
    totalCost.textContent=total;
 })
 }
}
async function fetchProd(q='plants'){
    prodContainer.classList.add('hidden')
    const prodLoading = document.getElementById('prod-loading');
    if(prodLoading) prodLoading.classList.remove('hidden');
    try{
        const url=urlAll+q;
        const res = await fetch(url)
        const prods = await res.json()
        if(prodLoading) prodLoading.classList.add('hidden');
        prodContainer.classList.remove('hidden')
        console.log(prods.plants)
        return prods.plants;
        
    } catch(err) {
        console.log("Error => ", err)
    }
}

function updateProd(prods){
    prodContainer.innerHTML='';
    prods.forEach(prod => {
        const div =document.createElement('div');
        div.classList.add(
         'Product-Cart',
         'flex',
         'flex-col',
         'justify-start',
         'items-start',
         'gap-5',
         'bg-white',
         'p-4',
         'rounded-xl',
         'max-h-[500px]',
        )
        div.innerHTML=`
            <div
              class="w-full h-[200px] bg-[url('${prod.image}')] bg-cover bg-center bg-no-repeat"
            >
             
            </div>
            <div>
              <h2 id="${prod.id}" class="prod-title font-bold mb-2">${prod.name}</h2>
              <p class="text-gray-500">
                ${prod.description}
              </p>
              <div class="w-full flex justify-between items-center mt-2">
                <div class="bg-[#DCFCE7] text-[#15803D] px-2 py-1 rounded-xl">
                  <h2>${prod.category}</h2>
                </div>
                <div>
                  <h2 class="font-bold"><span>${prod.price}</span>$</h2>
                </div>
              </div>
            </div>
            <div class="w-full">
              <button  class="atcBtn bg-[#15803D] text-white w-full py-4 rounded-xl">
                Add to Cart
              </button>
            </div>
        `
        
        prodContainer.appendChild(div);
        // modal
        const prodTitle= div.querySelector(".prod-title");
        const atcBTN= div.querySelector(".atcBtn");
        prodTitle.addEventListener('click', () => {
            console.log("clicked for modal");
            const id = prod.id;

            // no re-fetch, just use prod directly
            modalsection.classList.remove('hidden');
            modalsection.classList.add('flex');
            modalsection.innerHTML = `
                <div class="bg-white w-[40%] max-sm:text-sm max-sm:w-[80%] mx-auto p-10 flex flex-col justify-start items-start gap-5 rounded-xl shadow-lg">
                    <h1 class="text-2xl font-bold">${prod.name}</h1>
                    <div class="bg-[url('${prod.image}')] w-full h-[400px] bg-cover bg-center bg-no-repeat"></div>
                    <p class="text-xl"><span class="font-bold">Category:</span> ${prod.category}</p>
                    <p class="text-xl"><span class="font-bold">Price:</span> ${prod.price}$</p>
                    <p class="text-xl"><span class="font-bold">Description:</span> ${prod.description}</p>
                    <button id="closeModal" class="self-end bg-gray-200 text-black border-2 rounded-lg px-2 py-2 border-gray-400 mt-10">Close</button>
                </div>
            `;

            const modalbtn = document.getElementById('closeModal');
            modalbtn.addEventListener('click', () => {
                modalsection.classList.add('hidden');
                modalsection.classList.remove('flex');
            });
            
            
        });
        atcBTN.addEventListener('click', (e)=>{
            let existingItem = cart.find(item => item.id === prod.id)
            if(existingItem){
                existingItem.quantity+=1;
                
                alert(`${existingItem.name} added to cart`)
                
            }else{
                cart.push({
                    id: prod.id,
                    name: prod.name,
                    price: prod.price,
                    quantity: 1
                })
                alert(`${prod.name} added to cart`)
                
            }
            updateCartUI();
            
        })
        

    })
}
async function fetchCat(){
    try{
        const res = await fetch(urlCat)
        const categories = await res.json()
        return categories
    } catch(err){
        console.log("Error => ", err)
    }
}
function updateCat(cats){
    cats.categories.forEach(cat => {
        const button = document.createElement('button');
        button.classList.add('cat-btn', 'min-lg:w-full', 'hover:text-white', 'hover:bg-[#15803D]', 'px-2', 'py-2', 'text-left', 'rounded-lg');
        button.id= cat.id;
        button.textContent= cat.category_name;
       
        button.addEventListener("click", (e) => {
      document.querySelectorAll(".cat-btn").forEach((btn) => {
        btn.classList.remove("text-white", "bg-[#15803D]");
      });
      e.target.classList.add("text-white", "bg-[#15803D]");
      
      fetchProd(`category/${e.target.id}`).then(prods =>{
            console.log(prods);
            updateProd(prods)
        })
    });

        catContainer.appendChild(button)

    });
}
fetchCat().then(categories => {
  console.log(categories);
  updateCat(categories);
});
fetchProd().then(prods =>{
    console.log(prods);
    updateProd(prods)
})