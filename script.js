// ************ initialization of images
const overview = document.querySelector(".overview");
const landscapeContainer = document.querySelector(".landscape-container");
const cityContainer = document.querySelector(".city-container");

const landscapeImages = [
  {
    image: "images/landscape-0.jpg",
    name: "landscape-1",
  },
  {
    image: "images/landscape-1.jpg",
    name: "landscape-2",
  },
  {
    image: "images/landscape-2.jpg",
    name: "landscape-3",
  }];

  const cityImages = [
  {
    image: "images/city-0.jpg",
    name: "city-1",
  },
  {
    image: "images/city-1.jpg",
    name: "city-2",
  },
  {
    image: "images/city-2.jpg",
    name: "city-3",
  },
  {
    image: "images/city-3.jpg",
    name: "city-4",
  },
  {
    image: "images/city-4.jpg",
    name: "city-5",
  }
];

// ************ display images-overview on screen
for (let i = 0; i < landscapeImages.length; i++) {

  const landscapeImageElement = document.createElement("img");
  landscapeImageElement.src = "images/landscape-" + i + ".jpg";
  landscapeImageElement.classList.add("overview-image", "landscape-image");
  landscapeImageElement.id="landscape-image-" + i;
  landscapeImageElement.setAttribute("title", landscapeImages[i].name);
  landscapeImageElement.addEventListener("click", openModal);
  landscapeContainer.appendChild(landscapeImageElement);
}

for (let i = 0; i < cityImages.length; i++) {
  const cityImageElement = document.createElement("img");
  cityImageElement.src = "images/city-" + i + ".jpg";
  cityImageElement.classList.add("overview-image", "city-image");
  cityImageElement.id="city-image-" + i;
  cityImageElement.setAttribute("title", cityImages[i].name);
  cityImageElement.addEventListener("click", openModal);
  cityContainer.appendChild(cityImageElement);
  }

// ************ display detailed view of image on click

const detailedView = document.querySelector(".detailed-view");
const imageScreen = detailedView.querySelector(".image-screen");
const imageLabel = document.querySelector(".image-name");
let detailImage = null;
let imageCategory = null;
let imageIndex = null;
let imageName = null;

function openModal() {
  overview.style.display = "none";
  detailedView.style.display = "flex";
  detailedView.style.backgroundColor = "black";

  detailImage = document.createElement("img");
  detailImage.classList.add("detail-image");
  detailImage.src = this.src;
  imageScreen.appendChild(detailImage);
  setTimeout(() => {
  detailedView.classList.add("modal-open");
  }, 10);
  imageCategory = this.id.split("-")[0];
  imageIndex = parseInt(this.id.substring(this.id.lastIndexOf("-") + 1));
  imageName = this.getAttribute("title");

  imageLabel.innerHTML = imageName;

  showMiniOverview();
}

// ************ close detailed view of image on button click
const closeBtn = detailedView.querySelector(".close-btn");
closeBtn.addEventListener("click", () => {
  detailedView.classList.remove("modal-open");
  setTimeout(() => {
    detailedView.style.display = "none";
    overview.style.display = "block";
  }, 300);	
  imageScreen.innerHTML = "";
  miniOverview.innerHTML = "";

});

// ************ image-slider for detailed view
const prevBtn = detailedView.querySelector(".prev-btn");
prevBtn.addEventListener("click", () => {
  imageIndex--;
  if(imageIndex < 0 && imageCategory === "landscape") {
    imageIndex = landscapeImages.length - 1;
  }
  if(imageIndex < 0 && imageCategory === "city") {
    imageIndex = cityImages.length - 1;
  }
  detailImage.src = "images/" + imageCategory + "-" + (imageIndex) + ".jpg";

  // ************ image-name
  imageCategory === "landscape" ? imageName = landscapeImages[imageIndex].name : imageName = cityImages[imageIndex].name;
  imageLabel.innerHTML = imageName;

  // ************ mini-overview
  miniOverview.innerHTML = "";
  console.log("imageIndex: " + imageIndex);
  showMiniOverview();
});

const nextBtn = detailedView.querySelector(".next-btn");
nextBtn.addEventListener("click", () => {
  imageIndex++;
  if(imageIndex > landscapeImages.length - 1 && imageCategory === "landscape") {
    imageIndex = 0;
  }
  if(imageIndex > cityImages.length - 1 && imageCategory === "city") {
    imageIndex = 0;
  }
  detailImage.src = "images/" + imageCategory + "-" + (imageIndex) + ".jpg";

  // ************ image-name
  imageCategory === "landscape" ? imageName = landscapeImages[imageIndex].name : imageName = cityImages[imageIndex].name;
  imageLabel.innerHTML = imageName;

  // ************ mini-overview
  miniOverview.innerHTML = "";
  console.log("imageIndex: " + imageIndex);
  showMiniOverview();
  
});

    // ************ display mini-overview images 
  const miniOverview = detailedView.querySelector(".mini-overview");
  function showMiniOverview() {
    if (imageCategory === "landscape") {
      for (i=0; i < landscapeImages.length; i++) {
        const miniOverviewImage = document.createElement("img");
        miniOverviewImage.src = landscapeImages[i].image;
        miniOverviewImage.classList.add("mini-overview-image");
        miniOverviewImage.id = "mini-overview-image-" + i;
        i === imageIndex ? miniOverviewImage.style.opacity = "1" : miniOverviewImage.style.opacity = "0.4";
        miniOverviewImage.title = landscapeImages[i].name;
        miniOverview.appendChild(miniOverviewImage);
        i !== imageIndex ? miniOverviewImage.addEventListener("mouseover", () => {
          miniOverviewImage.style.opacity = "1";
        }) : {};
        i !== imageIndex ? miniOverviewImage.addEventListener("mouseout", () => {
          miniOverviewImage.style.opacity = "0.4";
        }) : {};
      }
    }
    if (imageCategory === "city") {
      for (i=0; i < cityImages.length; i++) {
        const miniOverviewImage = document.createElement("img");
        miniOverviewImage.src = cityImages[i].image;
        miniOverviewImage.classList.add("mini-overview-image");
        miniOverviewImage.id = "mini-overview-image-" + i;
        i === imageIndex ? miniOverviewImage.style.opacity = "1" : miniOverviewImage.style.opacity = "0.4";
        miniOverviewImage.title = cityImages[i].name;
        miniOverview.appendChild(miniOverviewImage);
        i !== imageIndex ? miniOverviewImage.addEventListener("mouseover", () => {
          miniOverviewImage.style.opacity = "1";
        }) : {};
        i !== imageIndex ? miniOverviewImage.addEventListener("mouseout", () => {
          miniOverviewImage.style.opacity = "0.4";
        }) : {};
      }
    }
  }
