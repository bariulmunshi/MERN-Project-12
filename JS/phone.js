/* 
Using async/await with fetch is a way to work with asynchronous code in a more synchronous style. It makes your code more readable and maintainable. Here's why you would use async/await when fetching data:

1. asynchronous = not existing or occurring at the same time.
2. synchronous = existing or occurring at the same time.

In your code example, using async/await with fetch simplifies the process of making an HTTP request and handling the response, making your code more maintainable and easier to work wit
*/

const loadPhone = async (searchText='13',isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones,isShowAll);
};

const displayPhones = (phones,isShowAll) => {
  // console.log(phones);

  const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = '';

    //display all show button if there are more than 6 phones
    const showAllContainer=document.getElementById("show-all-container");
    if(phones.length >12 && !isShowAll){
            showAllContainer.classList.remove('hidden');
    }
    else{
            showAllContainer.classList.add('hidden');
    }

    // console.log('Is Show All',isShowAll);
    //display only first 12  phones if not show-all

    if(!isShowAll)  {
      phones= phones.slice(0,12);
    }
    
    phones.map((phone) => {
    // console.log(phone);
    //step-1: create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
    phoneContainer.appendChild(phoneCard);  
  });
  /*hide loading spinner  */
  toggleLoadingSpinner(false);
};

const handleShowDetails = async(id) => {
  // console.log('Show Details',id);
  /* Load single phone data */
  const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data=await res.json();
  const phone=data.data;
  showPhoneDetails(phone);
}

const showPhoneDetails=(phone)=>{
  console.log(phone);
  const phoneName=document.getElementById('show-details-phone-name');
  phoneName.innerText=phone.name;

  const showDetailContainer=document.getElementById('show-detail-container');
 
    showDetailContainer.innerHTML = `
       <img src="${phone.image}"/>
       <p> <span> Storage:</span>${phone?.mainFeatures?.storage} </p>  
       <p> <span> Display:</span>${phone?.mainFeatures?.displaySize} </p>  
       <p> <span> GPS:</span>${phone?.others?.GPS || 'No GPS'} </p>  
        `;
  //show the modal
  show_details_modal.showModal();
}
/*
handle search button click 
 */
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText,isShowAll);
};

const toggleLoadingSpinner=(isLoading) => {
  const loadingSpinner= document.getElementById("loading-spinner");
  if(isLoading){
    loadingSpinner.classList.remove("hidden");
  }
  else{
    loadingSpinner.classList.add("hidden");
  }
}

//handle show all
const handleShowAll=() => {
  handleSearch(true);
}
loadPhone();
