const tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player("ytplayer", {
    height: "100%",
    width: "100%",
    videoId: "Yr9LK4rwHM4",
  });
}

window.addEventListener('DOMContentLoaded', () => {

  const navContainer = document.querySelector('.menu__items');

  navContainer.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.classList.contains('menu__link')) {
      const id = e.target.getAttribute('href');

      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  })

  //////////

  const sections = document.querySelectorAll('section');

  function sectionFun(entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  }

  const setionObserver = new IntersectionObserver(sectionFun, {
    root: null,
    threshold: 0.15,
  });

  sections.forEach(function(sec)  {
    setionObserver.observe(sec);
    sec.classList.add('section--hidden');
  })

  /////////////////////////////

  const header = document.querySelector(".open");
  const nav = document.querySelector('.nav');
  const navHight = nav.getBoundingClientRect().height;


  function StickyNav(entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) {
      nav.classList.add("stick");
    } else {
      nav.classList.remove("stick");
    }

    
  }

  const headerObserver = new IntersectionObserver(StickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHight}px`,
  });

  headerObserver.observe(header);

  ///////////////////

  const btnTop = document.querySelector(".menu__logo");

  btnTop.addEventListener('click', () => {
    header.scrollIntoView({behavior: 'smooth'});
  })

  /////////////////////

  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu__items');
  const menuItem = document.querySelectorAll('.menu__item');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger_active');
    menu.classList.toggle('menu__items_active');
  });

  menuItem.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu__items_active');
    });
  });

  /////////////////////////////////

//   const form = document.querySelectorAll("form"),
//     inputs = document.querySelectorAll("input");


//   const message = {
//     loading: "Загрузка...",
//     success: "Спасибо! Скоро мы с вами свяжемся",
//     failure: "Что-то пошло не так...",
//   };

//   const postData = async (url, data) => {
//     document.querySelector(".open__btn").textContent = message.loading;
//     let res = await fetch(url, {
//       method: "POST",
//       body: data,
//     });

//     return await res.text();
//   };

//   const clearInputs = () => {
//     inputs.forEach((item) => {
//       item.value = "";
//     });
//   };

//   form.forEach((item) => {
//     item.addEventListener("submit", (e) => {
//       e.preventDefault();


//       const formData = new FormData(item);
//       if (item.getAttribute("data-calc") === "end" && state.length === 5) {
//         for (let key in state) {
//           formData.append(key, state[key]);
//         }
//       } else if (item.getAttribute("data-calc") === "end") {
//         let notEndMessage = document.createElement("div");
//         notEndMessage.classList.add("status");
//         notEndMessage.textContent = "Вы ввели не все данные";
//         item.appendChild(notEndMessage);
//       }

//       postData("assets/server.php", formData)
//         .then((res) => {
//           console.log(res);
//           statusMessage.textContent = message.success;
//           document.querySelector(".popup_calc_end").style.display = "none";
//           document.body.style.overflow = "";
//         })
//         .catch(() => (statusMessage.textContent = message.failure))
//         .finally(() => {
//           clearInputs();
//           setTimeout(() => {
//             statusMessage.remove();
//           }, 5000);
//         });
//     });
//   });

  ////////////////////////


  const mask = (selector) => {
    let setCursorPosition = (pos, elem) => {
      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();

        range.collapse(true);
        range.moveEnd("characted", pos);
        range.moveStart("characted", pos);
        range.select();
      }
    };

    function createMusk(event) {
      let matrix = "+7 (___) ___ __ __",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");

      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
          ? ""
          : a;
      });

      if (event.type === "blur") {
        if (this.value.length == 2) {
          this.value = "";
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach((input) => {
      input.addEventListener("input", createMusk);
      input.addEventListener("focus", createMusk);
      input.addEventListener("blur", createMusk);
    });
  };

  mask(".open__input-telefon")
  
});
  
  

