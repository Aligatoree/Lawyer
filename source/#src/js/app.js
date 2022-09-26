import * as jsFunctions from "./modules/functions.js";
import IMask from "imask";

jsFunctions.isWebp();

document.addEventListener("DOMContentLoaded", function () {
  const labels = document.getElementsByClassName("tab__label");
  const switchTab = document.getElementById("switchTab");
  const work = document.getElementById("work");
  const form = document.getElementById("form");

  form.addEventListener("submit", formSend);
  switchTab.addEventListener("click", (e) => {
    for (let label in labels) {
      labels[label].classList.toggle("active");
    }
  });
  work.addEventListener("click", (e) => {
    if (e.target.id != "switchTab") {
      for (let label in labels) {
        labels[label].classList.remove("active");
      }
    }
  });

  let nameMask = IMask(document.getElementById("name"), {
    mask: /^[A-Za-zА-Яа-я ]+$/,
  });
  let phoneMask = IMask(document.getElementById("phone"), {
    mask: "+{7}(000)000-00-00",
  });
  const swiperNews = new Swiper(".example__container", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      1000: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      765: {
        slidesPerView: 1,
        spaceBetween: 50,
      },
      0: {
        slidesPerView: 1,
        spaceBetween: 32,
      },
    },
  });

  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);
  }
  function formValidate(form) {
    let error = 0;
    let formRequired = document.querySelectorAll("._required");

    for (let i = 0; i < formRequired.length; i++) {
      const input = formRequired[i];
      formRemoveError(input);
      if (input.classList.contains("_name")) {
        if (input.value.trim() === "") {
          formAddError(input);
          error++;
        }
      }
      console.log(input.value.length);
      if (input.classList.contains("_phone")) {
        if (input.value.length !== 16) {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }
  function formAddError(input) {
    input.classList.add("_error");
  }
  function formRemoveError(input) {
    input.classList.remove("_error");
  }
});
