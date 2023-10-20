/* 
Using async/await with fetch is a way to work with asynchronous code in a more synchronous style. It makes your code more readable and maintainable. Here's why you would use async/await when fetching data:

1. asynchronous = not existing or occurring at the same time.
2. synchronous = existing or occurring at the same time.

In your code example, using async/await with fetch simplifies the process of making an HTTP request and handling the response, making your code more maintainable and easier to work wit
*/

const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  // console.log(phones);

  const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = '';

    //display all show button if there are more than 6 phones
    const showAllContainer=document.getElementById("show-all-container");
    if(phones.length >12){
            showAllContainer.classList.remove('hidden');
    }
    else{
            showAllContainer.classList.add('hidden');
    }
    //display only first 12  phones
    phones= phones.slice(0,12);  
    
    phones.map((phone) => {
    console.log(phone);
    //step-1: create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;
    phoneContainer.appendChild(phoneCard);  
  });
  /*hide loading spinner  */
  toggleLoadingSpinner(false);
};

/*
handle search button click 
 */
const handleSearch = () => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText);
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
  
}
// loadPhone();
