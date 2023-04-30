const loadPhone = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data);
};

const displayPhone = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  //display 20 phone only
  const showall = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showall.classList.remove("d-none");
  } else {
    showall.classList.add("d-none");
  }
  phones = phones.slice(0, 10);

  //! display No phone found
  const noPhone = document.getElementById("no-foundPhone");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }

  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card ">
    <img src="${phone.image}" class="card-img-top p-5" alt=" " />
    <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text">
        This is a longer card with supporting text below as a natural
        lead-in to additional content. This content is a little bit
        longer.
      </p>
      <button onclick="loadPhoneDetail('${phone.slug}')" id="show-details" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal"  >Show Details</button>
      
      </div>
  </div> 


  
   
  `;
    phoneContainer.appendChild(phoneDiv);
  });
  toggleSpinner(false);
};

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-input");
  const searchText = searchField.value;
  loadPhone(searchText, dataLimit);
};

document.getElementById("btn-search").addEventListener("click", function () {
  processSearch(10);
});
//! search input field enter key handler
document.getElementById("search-input").addEventListener("keypress", function (e) {
    //console.log(e.key);

    if (e.key=== "Enter") {
      processSearch(10);
    }
  });

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// not the best way to load show all
document.getElementById("show-all").addEventListener("click", function () {
  processSearch();
});
const loadPhoneDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};
const displayPhoneDetails=phone=>{
  console.log(phone);
  const modalTitle=document.getElementById('phoneDetailModalLabel');
  modalTitle.innerText=phone.name;
  const phoneDetails=document.getElementById('phone-detail');
  phoneDetails.innerHTML=`
  <p > <strong>Release Date: </strong> ${phone.releaseDate ? phone.releaseDate: 'no found release date found'}</p>
  <p> <strong>Others:</strong> ${phone.others ? phone.others.Bluetooth : "No bluetooth info found"}</p>
  
  `
}
loadPhone('apple');
