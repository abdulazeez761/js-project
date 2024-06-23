function navigateTo(page) {
  window.location.href = page;
}

// -----------------------FQAs start------------
const faqs=document.querySelectorAll(".faq");
faqs.forEach(faq=> {
 faq.addEventListener("click",()=>{
     faq.classList.toggle("active");
 });
});
