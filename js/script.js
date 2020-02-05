'use strict';
import galleryItems from "./gallery-items.js"

const gallery = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxImg = document.querySelector('.lightbox__image');

function createImg(array) {
    const image = array.map(img => {
        const li = document.createElement("li.gallery__item");
        li.insertAdjacentHTML(
            "beforeend",
            `<a class="gallery__link" href=#>
        <img class="gallery__image" 
          src=${img.preview}
          alt=${img.description}
          data-src=${img.original}>
        </a>`
        );
        return li;
    });
    return gallery.append(...image);
}

createImg(galleryItems);

gallery.addEventListener('click', onClick);

function onClick(e) {
    if (e.target.classList.contains('gallery__image')) {
        const chosenImg = e.target;
        lightbox.classList.add("is-open");
        lightboxImg.src = chosenImg.dataset.src;
        lightboxImg.alt = chosenImg.alt;
    }
}

lightbox.addEventListener('click', onClose);

function onClose(e) {
    if (!e.target.classList.contains('lightbox__image')) {
        lightbox.classList.remove("is-open");
    }
}

gallery.addEventListener('keydown', onKeydown);

function onKeydown(e) {
    if (lightbox.classList.contains("is-open")) {
        let index = Number(galleryItems.indexOf(galleryItems.find(img => img.original === lightboxImg.src))) - 1;
        if (e.code === "Escape") {
            lightbox.classList.remove("is-open");
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
}