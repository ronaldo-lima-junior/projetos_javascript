const images = document.querySelectorAll(".img-container img");

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(!entry.IsIntersecting) return
    });
});

images.forEach((image) => {
    image.src = image.src.replace("&w=10", "&w=1000");
});