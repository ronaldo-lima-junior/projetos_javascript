const images = document.querySelectorAll(".img-container img");

const observer = new IntersectionObserver((entries, observer) => {
    console.log('teste');
    entries.forEach(entry => {

        if(!entry.IsIntersecting) return

        const image = entry.target;

        image.src = image.src.replace("&w=10", "&w=1000");



    });
}, {});

images.forEach((image) => {
    observer.observe(image);
});