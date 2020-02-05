'use strict';
import galleryItems from "./gallery-items.js"

const gallery = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxImg = document.querySelector('.lightbox__image');

function createImg(array) {
    let li;
    const image = array.reduce((acc, img) => acc + `<li class="gallery__item"><a class="gallery__link" href=#>
        <img class="gallery__image" 
          src=${img.preview}
          alt=${img.description}
          data-src=${img.original}>
        </a></li>`, "")
    });
    return gallery.insertAdjacentHTML('beforeend', li);
}

createImg(galleryItems);

gallery.addEventListener('click', onClick);

function onClick(e) {
    if (e.target.classList.contains('gallery__image')) {
        const chosenImg = e.target;
        lightbox.classList.add("is-open");
        lightboxImg.src = chosenImg.dataset.src;
        lightboxImg.alt = chosenImg.alt;
        lightbox.addEventListener('click', onClose);
        gallery.addEventListener('keydown', onKeydown);
    }
}



function onClose(e) {
    if (!e.target.classList.contains('lightbox__image')) {
        lightbox.classList.remove("is-open");
        lightbox.removeEventListener('click', onClose);
        gallery.removeEventListener('keydown', onKeydown);
    }
}


function onKeydown(e) {
    let index = Number(galleryItems.indexOf(galleryItems.find(img => img.original === lightboxImg.src))) - 1;
    if (e.code === "Escape") {
        lightbox.classList.remove("is-open");
        lightbox.removeEventListener('click', onClose);
        gallery.removeEventListener('keydown', onKeydown);
    } else if (e.code === "ArrowLeft") { // left
        if (index >= 0) {
            const findPrevImg = Number(galleryItems.indexOf(galleryItems.find(img => img.original === lightboxImg.src))) - 1;
            lightboxImg.src = galleryItems[findPrevImg].original;
        } else {
            lightboxImg.src = galleryItems[galleryItems.length - 1].original;

        }
    } else if (e.code === "ArrowRight") { // right
        if (index < galleryItems.length - 2) {
            const findNextImg = Number(galleryItems.indexOf(galleryItems.find(img => img.original === lightboxImg.src))) + 1;
            lightboxImg.src = galleryItems[findNextImg].original;
        } else {
            lightboxImg.src = galleryItems[0].original
        }
    }

}