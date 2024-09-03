export function attachAccordionListeners() {
    const accordionHeader = document.querySelectorAll(".accordion-header");

    accordionHeader.forEach((header) => {
        header.addEventListener("click", function () {
            const accordionContent = header.parentElement.querySelector(".accordion-content");
            console.log(accordionContent);
            let accordionMaxHeight = accordionContent.style.maxHeight;

            // Condition handling
            if (accordionMaxHeight == "0px" || accordionMaxHeight.length == 0) {
                accordionContent.style.maxHeight = `${accordionContent.scrollHeight + 32}px`;
                header.querySelector(".fas").classList.remove("fa-plus");
                header.querySelector(".fas").classList.add("fa-minus");
                header.parentElement.classList.add("bg-slate-50");
            } else {
                accordionContent.style.maxHeight = `0px`;
                header.querySelector(".fas").classList.add("fa-plus");
                header.querySelector(".fas").classList.remove("fa-minus");
                header.parentElement.classList.remove("bg-slate-50");
            }
        });
    });
}