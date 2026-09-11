fetch("./DataBase.json")
.then(response => response.json())
.then(data => {
    console.log(data);

    let logoArea = document.querySelector(".logo-area");
   logoArea.src = data.header.logo

   const searchBtn = document.querySelector(".search-input-btn");
   searchBtn.src = data.svgs.searchSvg
function shortDescription(text) {
            return text.length > 40
            ?text.slice(0, 40) + "..."
            : text;
}
    let heroImageArea  = document.querySelector(".hero-image");
    let somthing = document.querySelector(".somthing");
    heroImageArea.src = data.heroImage

    function updateHeroPosition() {
        if (document.documentElement.dir === "rtl") {
            somthing.classList.remove("left-0");
            somthing.classList.add("right-0");
        } else {
            somthing.classList.remove("right-0");
            somthing.classList.add("left-0");
        }
    }
    let somthing2 = document.querySelector(".somthing2");
    function updateAboutPosition() {
        if (document.documentElement.dir === "rtl") {
            somthing2.classList.remove("left-0");
            somthing2.classList.add("right-0");
        } else {
            somthing2.classList.remove("right-0");
            somthing2.classList.add("left-0");
        }
    }

let productTexts = [];
    let productsPopup =  document.querySelector(".products-popup");
   let topSellerCardsArea = document.querySelector(".top-seller-cards");
   data.topSellerProducts.forEach(topSP => {
        let tspCard = document.createElement("div")
        tspCard.className = "group product-card top-seller-product bg-[#221B17] border border-white/10 hover:border transition-all duration-300 ease-in-out hover:border-[#8B451f]/80 hover:-translate-y-[2%] overflow-hidden relative cursor-pointer"

        let tspTextContainer = document.createElement("div")
        tspTextContainer.className = "mx-5 my-3 cursor-pointer"
        let tspImage = document.createElement("img")
        tspImage.src = topSP.image
        tspImage.className = "mx-auto block transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:-translate-y-[9px]"

        let tspName = document.createElement("span")
        tspName.textContent = topSP.name.english
        tspName.className = "product-text product-title align-center  text-white/80 relative after:bottom-0 after:content-[''] after:absolute after:-left-[75%]  overflow-hidden   after:w-full after:h-[2px] after:bg-[#8B451F] group-hover:after:left-0 after:transition-all after:duration-[350ms] after:ease-in-out  inline-block cursor-default group-hover:text-white"

        let tspDescription = document.createElement("p")
        tspDescription.textContent = topSP.description.english
        tspDescription.className ="text-[#685F54]"

        tspDescription.textContent =
            shortDescription(topSP.description.english);
        

        let tspPrice = document.createElement("span")
        tspPrice.textContent = `$${topSP.price}`
        tspPrice.className = "text-[#C5A467]"
        
        let tspCategory = topSP.category

        let tspAddToFav = document.createElement("div")
        tspAddToFav.textContent = "+"
        tspAddToFav.className = "w-[35px] h-[35px] rounded-[50%] bg-black/35 backdrop-blur-xs text-[#C49A44] absolute top-0 right-0 flex items-center justify-center text-2xl mx-3 my-3 opacity-0  group-hover:opacity-100 transition-all duration-[700ms] ease-in-out cursor-pointer"

        topSellerCardsArea.appendChild(tspCard)
        tspCard.append(tspImage,tspTextContainer, tspAddToFav)
        tspTextContainer.append(tspName, tspDescription)

        productTexts.push({
        name: tspName,
        description: tspDescription,
        data: topSP
    });
    tspCard.addEventListener("click" , () => {
        productsPopup.innerHTML = ""

        let popupContent = document.createElement("div");
            popupContent.className =
                "bg-black rounded-2xl relative p-8 flex items-center gap-10 w-[900px]";

        document.documentElement.classList.add("overflow-hidden")
        let leftSide = document.createElement("div")
        leftSide.className = "flex flex-col items-start justify-center"

        let closebtn = document.createElement("div")
        closebtn.className = "absolute top-[35px] right-[15px] w-[44px] h-[44px] cursor-pointer transition-all duration-300 ease-in-out bg-white/40 border border-[#C49A44] flex justify-center items-center rounded-[50%] hover:bg-white/20 hover:rotate-[180deg] hover:border-[#8B451F]"
        closebtn.textContent = 'X'

        tspImage.className = "w-120 inline-block "
        
        let titlePrice = document.createElement("div");
            titlePrice.className =
                "flex items-center gap-6";
        titlePrice.append(tspName, tspPrice)
        tspDescription.textContent =
        document.documentElement.dir === "rtl"
        ? topSP.description.persian
        : topSP.description.english;
        tspName.textContent =
        document.documentElement.dir === "rtl"
        ? topSP.name.persian
        : topSP.name.english;

        closebtn.classList.remove("left-[15px]", "right-[15px]");

        if (document.documentElement.dir === "rtl") {
            closebtn.classList.add("left-[15px]");
        } else {
            closebtn.classList.add("right-[15px]");
        }

        tspDescription.className = "block text-[#685F54] "
        // tspName.classList.replace("after:-left-[75%] " , "after:left-0")
        productsPopup.className =
        "fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/20 ";
        popupContent.append(tspImage, leftSide, closebtn)
        productsPopup.append(popupContent)
        leftSide.append(titlePrice, tspDescription)

        closebtn.addEventListener("click" , () => {
            productsPopup.innerHTML = ""
            productsPopup.classList.toggle("hidden")

        tspCard.append(tspImage,tspTextContainer, tspAddToFav)
        tspTextContainer.append(tspName, tspDescription)
        tspDescription.textContent = document.documentElement.dir === "rtl" ? shortDescription(topSP.description.persian) : shortDescription(topSP.description.english)
        
        document.documentElement.classList.remove("overflow-hidden")

        })
    })
        //  !! I Know I Can Create A New Card To Fill popUp but Who Cares ?! 
   })

// ======================
// Categories Scroller
// ======================

   function updateCarousel() {

    categoriesCardsArea.style.transform =
        `translateX(-${currentIndex * (101.5 / visibleCards)}%)`;

}


    let categoriesCardsArea = document.querySelector(".categories-container");
    let categoryTexts = []
    data.categoriesScrollMat.forEach(categoriesMat => {
        let ciCard = document.createElement("div")
        ciCard.className = "group bg-[#221B17] border border-white/10 shrink-0 flex flex-col items-center w-[calc((100%-100px)/6)] cursor-pointer hover:-translate-y-[5px] hover:border-[#8B451F] transition-all duration-500 ease-in-out"

        let ciImage = document.createElement('img')
        ciImage.src = categoriesMat.image
        ciImage.className = "brightness-0 invert group-hover:brightness-100 group-hover:invert-0 group-hover:-rotate-[5deg] group-hover:scale-[1.1] transition-all duration-700 ease-in-out w-15 mx-auto m-3 mt-6"

        let ciTitle = document.createElement("p")
        ciTitle.textContent = categoriesMat.title.english
        ciTitle.className = "text-center relative inline-block product-text m-3 mb-5 after:content-[''] after:absolute after:h-[2px] after:w-[100%] after:bg-[#8B451F] after:-left-[100%] overflow-hidden after:bottom-0 group-hover:after:left-0 after:transition-all after:duration-700 after:ease-in-out "

        categoryTexts.push({
        name: ciTitle,
        data: categoriesMat
        });
    
        categoriesCardsArea.appendChild(ciCard,)
        ciCard.append(ciImage, ciTitle)

    })
    let arrowRight = document.querySelector(".arrow-right");
    let arrowLeft = document.querySelector(".arrow-left");
    arrowRight.classList.add("cursor-pointer")
    arrowLeft.classList.add("cursor-pointer")
    let currentIndex = 0;
    let totalCards = data.categoriesScrollMat.length;
    let visibleCards = 6;

    arrowLeft.addEventListener("click", () => {

        if (currentIndex < totalCards - visibleCards) {
            currentIndex++;

            updateCarousel()
        }

    });
    arrowRight.addEventListener("click", () => {

     if (currentIndex > 0) {

        currentIndex--;

        updateCarousel()
        }

    });


   let bannerArea = document.querySelector(".banner-image");
   bannerArea.src = data.banner.image
   signatureTexts = []
   let signatureArea = document.querySelector(".signature-container");
   data.signatureItems.forEach(si => {
        siCard = document.createElement("div")
        siCard.className = "bg-[#241B16] text-white group overflow-hidden border border-[#C49A44]/25 hover:-translate-y-[5px] hover:border-[#C49A44]/50 transition-all duration-500 ease-in-out"


        siImage = document.createElement("img")
        siImage.className = "mx-auto block transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:-translate-y-[9px]"
        siImage.src = si.image

        siTitle = document.createElement("p")
        siTitle.textContent = si.name.english
        siTitle.className = "product-text product-title relative inline-block m-3 after:content-[''] after:absolute after:h-[2px] after:w-[100%] after:bg-[#8B451F] after:-left-[85%] overflow-hidden after:bottom-0 group-hover:after:left-0 after:transition-all after:duration-700 after:ease-in-out"

        signatureTexts.push({
            data : si,
            title : siTitle
        })

        signatureArea.appendChild(siCard)
        siCard.append(siImage, siTitle)

   })
   reviewContent = []
   let secBannerArea = document.querySelector(".about-banner");
   secBannerArea.src = data.bannerSec

   let reviewArea = document.querySelector(".review-cards");
   data.reviews.forEach(rv => {
    let rvCard = document.createElement("div")
    rvCard.className = "group bg-[#221B17] border border-white/10 rounded-2xl p-6 " +
  "min-h-[220px] flex flex-col justify-between " +
  "hover:border-[#C49A44]/50 hover:-translate-y-2 " +
  "transition-all duration-500 ease-in-out " +
  "shadow-lg shadow-black/20"

    let rvName = document.createElement("p")
    rvName.textContent = `-${rv.name.english}'s Review:`

    let rvComment = document.createElement("p")
    rvComment.textContent = rv.comment.english
    // rvName.className = ""

    let rvRate = document.createElement("p")
    rvRate.textContent = `Rate: ${rv.rating}/6`

    reviewContent.push({
    data : rv,
    comment : rvComment,
    name : rvName,
    rate : rvRate
    })

    reviewArea.appendChild(rvCard)
    rvCard.append(rvName, rvComment,rvRate)

   })

    // ========================
    // Change Language Event !!
    // ========================



let finalBannerArea = document.querySelector(".final-banner");
finalBannerArea.src = data.finalBanner;

let specialText2 = document.querySelector(".spec");

let clp = document.querySelector(".lang-change-fa");
let cle = document.querySelector(".lang-change-en");

const changeLangMenuBtn = document.querySelector(".change-lang-btn");
const langMenu = document.querySelector(".lang-menu");

changeLangMenuBtn.addEventListener("click", () => {
    langMenu.classList.toggle("opacity-0");
    langMenu.classList.toggle("pointer-events-none");
    langMenu.classList.toggle("opacity-100");
    langMenu.classList.toggle("pointer-events-auto");
});

   let dynamicTexts = document.querySelectorAll(".dynamic-text");
   let changeLangBtns = document.querySelectorAll(".lang-change-btn");
   let specialText = document.querySelector(".special");
   
   changeLangBtns.forEach(changeBtn => {

        changeBtn.addEventListener("click" ,() => {
            
        langMenu.classList.remove("opacity-100");
        langMenu.classList.remove("pointer-events-auto");

        langMenu.classList.add("opacity-0");
        langMenu.classList.add("pointer-events-none");

           if (changeBtn.classList.contains("lang-change-fa")) {

    dynamicTexts.forEach(dynamicText => {
        dynamicText.textContent = dynamicText.dataset.persian;
    });
    finalBannerArea.classList.add("scale-x-[-1]")
    specialText.placeholder = specialText.dataset.persian;
    langMenu.classList.replace("right-0", "left-0")

    searchBtn.classList.replace("right-3", "left-3");
    document.documentElement.dir = "rtl";
    updateHeroPosition()
    updateAboutPosition()
    categoriesCardsArea.style.direction = "ltr";

    productTexts.forEach(product => {
        product.description.textContent =
        shortDescription(product.data.description.persian);
        product.name.textContent = product.data.name.persian
    });
    categoryTexts.forEach(category => {
        category.name.textContent = category.data.title.persian
    })
    signatureTexts.forEach(signature => {
        signature.title.textContent = signature.data.name.persian
    })
    reviewContent.forEach(review => {
        review.comment.textContent = review.data.comment.persian
        review.name.textContent = `${review.data.name.persian} گفت :`
        review.rate.textContent = `نمره : ${review.data.rating} از 6 `
    })

}
else {

    dynamicTexts.forEach(dynamicText => {
        dynamicText.textContent = dynamicText.dataset.english;
    });

            specialText.placeholder = specialText.dataset.english;

         searchBtn.classList.replace("left-3", "right-3");
         document.documentElement.dir = "ltr";
         updateHeroPosition()
         updateAboutPosition()
        langMenu.classList.replace("left-0", "right-0")


             finalBannerArea.classList.remove("scale-x-[-1]")


            productTexts.forEach(product => {
                product.description.textContent =
            shortDescription(product.data.description.english);
                product.name.textContent = product.data.name.english
                });
                categoryTexts.forEach(category => {
                category.name.textContent = category.data.title.english
                })
                signatureTexts.forEach(signature => {
                signature.title.textContent = signature.data.name.english
                })
                reviewContent.forEach(review => {
                review.comment.textContent = review.data.comment.english
                review.name.textContent = `${review.data.name.english}'s Review:`
                review.rate.textContent = `Rate: ${review.data.rating}/6`
                })
            }
        })
   })

    const aboutBtn = document.querySelector("#about-btn");
    const about = document.querySelector("#st-about");

    aboutBtn.addEventListener("click", () => {
        about.scrollIntoView({
            behavior: "smooth"
        });
    });

    const contactBtn = document.querySelector("#contact-btn");
    const contact = document.querySelector("#st-contact");

    contactBtn.addEventListener("click", () => {
        contact.scrollIntoView({
            behavior: "smooth"
        });
    });

// SEARCH SYSTEM

    let input = document.querySelector(".search-input");
    let productNames = document.querySelectorAll(".product-title");
    input.addEventListener("input", () => {
        let text = input.value.toLowerCase().trim()
        let found = 0
        let resultContainer =  document.querySelector(".result-container");
        resultContainer.innerHTML = "";
        productNames.forEach(product => {
        if (product.textContent.toLowerCase().trim().includes(text)) {
            found++;
            let productResut = document.createElement("p")
            productResut.textContent = product.textContent
            productResut.className = `
    px-5 py-3
    text-[#ECE3D6]
    border-b border-white/5
    cursor-pointer
    transition-all duration-200
    hover:bg-[#C49A44]/10
    hover:text-[#C49A44]
`
            resultContainer.append(productResut)
            if(text === ""){
                resultContainer.classList.add("hidden")
            }
            else{
                resultContainer.classList.remove("hidden")
            }

            productResut.addEventListener("click",()=>{
                product.scrollIntoView({
                    behavior:"smooth",
                    block:"center"
                })
                product.classList.add()
                resultContainer.classList.add("hidden");
                input.value = ""

    product.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    void product.offsetWidth;

    product.classList.add(
        "ring-2",
        "after:hidden",
        "ring-[#C49A44]",
        "shadow-[0_0_30px_rgba(196,154,68,0.8)]",
        "transition-all",
        "duration-500"
    );

    setTimeout(() => {
        product.classList.remove(
            "ring-2",
            "after:hidden",
            "ring-[#C49A44]",
            "shadow-[0_0_30px_rgba(196,154,68,0.8)]"
        );
    }, 1500);
            })
        }
    });

    
    })
   

})