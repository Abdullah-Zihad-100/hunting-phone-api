const lordPhone =async(searchText='12',isShowAll)=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data =await res.json();
    const phones=data.data
    displayPhones(phones,isShowAll)
}
lordPhone()


const displayPhones=(phones,isShowAll)=>{
    // console.log(phones);

    const phoneContainer=document.getElementById('phone-container');
    // clear phone cotaniner before adding neww cards
    phoneContainer.innerHTML='';


    // display show all button if thare are more then 12 phones
 

    const showAll=document.getElementById('show-all-container');
    if(phones.length > 9 ){
showAll.classList.remove('hidden')
    }
    else{
    showAll.classList.add('hidden')
}

// console.log('is show all ',isShowAll )
    // display only 9 phone if not show all
    if(!isShowAll){
        phones=phones.slice(0,9)
    }


phones.forEach(phone =>{
// console.log(phone)
//2 creat a div
const phoneCard=document.createElement('div');
phoneCard.classList=`card bg-base-100 p-4 rounded mt-8 border`;
// 3: set inner Html
phoneCard.innerHTML=` <figure class="rounded bg-gray-100 py-4 "><img src="${phone.image}" alt="Shoes" /></figure>
<div class="card-body items-center">
    <h2 class="card-title font-bold">${phone.phone_name}</h2>
    <p>There are many variations of passages of available, but the majority have suffered</p>
    <h2 class="card-title font-bold">$999</h2>
    <div class="card-actions justify-center">
        <button onclick="handleShowDetail('${phone.slug}');show_details_modal.showModal()" class="btn text-white px-6 bg-[#0D6EFD]">Show Details</button>
    </div>
</div>`;
// 4 : appneChild
phoneContainer.appendChild(phoneCard);
})

// hide loading spinner
toggleLoadingSpinner(false);
}

// 
const handleShowDetail=async(id)=>{
    console.log(id)
    // lord single phone data
    const res= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data=await res.json();
   const phone=data.data
    showPhoneDetails(phone);
}
// display 

const showPhoneDetails=(phone)=>{
// console.log(phone);

const showDetailContainer=document.getElementById('show-detail-container');
showDetailContainer.innerHTML=`
<img src="${phone.image}" class="mx-auto">
  <h3 id="show-detail-phone-name" class="font-bold text-xl my-4">${phone.name}</h3>

 <h5 class="font-bold text-sm">Storage:<span class="font-semibold text-gray-600"> ${phone?.mainFeatures?.storage ||'Not Found'}</span></h5>
 <h5 class="font-bold text-md">Display Size:<span class="font-semibold text-gray-600"> ${phone?.mainFeatures?.displaySize ||'Not Found'}</span></h5>
 <h5 class="font-bold text-md">Release data:<span class="font-semibold text-gray-600"> ${phone?.releaseDate ||'Not Found'}</span></h5>
 <h5 class="font-bold text-md">Brand:<span class="font-semibold text-gray-600"> ${phone?.brand||'Not Found'}</span></h5>
 <h5 class="font-bold text-md">GPS:<span class="font-semibold text-gray-600"> ${phone?.others?.GPS ||'Not Found'}</span></h5>
 <h5 class="font-bold text-md">Chipset:<span class="font-semibold text-gray-600"> ${phone?.mainFeatures?.chipSet ||'Not Found'}</span></h5>
  `
// const phoneName=document.getElementById('show-detail-phone-name');
// phoneName.innerText=phone.name;
// show the modal
    show_details_modal.showModal()
}


// hendel click 
const handelSearch=(isShowAll)=>{
    toggleLoadingSpinner(true);
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    // console.log(searchText); 
    lordPhone(searchText,isShowAll);
   

}

const toggleLoadingSpinner=(isLoding)=>{
    const loadingSpinner=document.getElementById('loading-spinner');
if(isLoding===true){
        loadingSpinner.classList.remove('hidden')
}
else{
        loadingSpinner.classList.add('hidden')
}

}


// handel show all

const handleShowAll=()=>{
    handelSearch(true);
}


lordPhone();


