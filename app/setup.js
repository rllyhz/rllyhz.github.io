/*
 * author: rllyhz <rullyihza00@gmail.com>
 * github_page: https://github.com/rllyhz
 * instagram: rllyhz <https://instagram.com/rllyhz>
 * twitter: rullyihza_ <https://twitter.com/rullyihza_>
 */


// STILL BEING UNDER MAINTANANCE ALERT
// alert("Sorry for any bad experiences.. 🙇‍♂️ \nThis page is still being under construction mode! 👨‍💻")


/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show')
    })
  }
}
showMenu('nav-toggle', 'nav-menu')

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
  /*Active link*/
  navLink.forEach(n => n.classList.remove('active'));
  this.classList.add('active');

  /*Remove menu mobile*/
  const navMenu = document.getElementById('nav-menu')
  navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 2000,
  reset: true
});

/*SCROLL HOME*/
sr.reveal('.home__title', {});
sr.reveal('.button', { delay: 200 });
sr.reveal('.home__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });

/*SCROLL ABOUT*/
sr.reveal('.about__img', {});
sr.reveal('.about__subtitle', { delay: 400 });
sr.reveal('.about__text', { delay: 400 });

/*SCROLL SKILLS*/
sr.reveal('.skills__subtitle', {});
sr.reveal('.skills__text', {});
sr.reveal('.skills__data', { interval: 200 });
sr.reveal('.skills__img', { delay: 600 });

/*SCROLL WORK*/
//sr.reveal('.work__img', { interval: 200 });

/*SCROLL CONTACT*/
// sr.reveal('.contact__input', { interval: 200 });


const btnSeeMore = document.querySelector("#see-more-button"),
  fullnameInput = document.querySelector("#your-full-name"),
  emailInput = document.querySelector("#your-email"),
  messageInput = document.querySelector("#your-message"),
  btnSendEmail = document.querySelector("#send-email-button"),
  btnLogin = getElem('#login-button'),
  usernameInput = getElem('#your-username'),
  passwordInput = getElem('#your-password');

let btnBackgroundColor = null;
if (btnSendEmail) {
  btnBackgroundColor = getComputedStyle(btnSendEmail).backgroundColor
}
if (btnLogin) {
  btnBackgroundColor = getComputedStyle(btnLogin).backgroundColor
}

const scriptURL = "https://script.google.com/macros/s/AKfycbzOIDWk20JB87H-Nl0in0ezxDhpFktSSLZDsAJRZk0fqrRdbhQKAkPL_7gTLTql9Azz/exec";
let form = null;
if (document.forms["contact-me-form"]) {
  form = document.forms["contact-me-form"];
} else {
  form = document.createElement('form');
}

form.addEventListener('submit', async e => {
  e.preventDefault()

  const fullname = fullnameInput.value
  const email = emailInput.value
  const message = messageInput.value

  if (!fullname || !email || !message) {
    alert("Please fill the required fields!")
    return
  }

  MakeBtnDisabled(btnSendEmail, true)

  const userDetails = await getUserDetails()

  fetch(scriptURL, { method: 'POST', body: getDataForm(form, userDetails) })
    .then(response => {
      fullnameInput.value = ""
      emailInput.value = ""
      messageInput.value = ""

      MakeBtnDisabled(btnSendEmail, false)
      alert("💌 Email successfully sent!")
      // console.log('Success!', response)
      console.clear();
    })

    .catch(error => {
      MakeBtnDisabled(btnSendEmail, false)
      alert("Failed to send email! 😕")
      // console.error('Error!', error.message)
      console.clear();
    })
})

// btnSeeMore.addEventListener("click", e => {
//   e.preventDefault()
//   alert("Sorry...😣 \n\nThe project pages are still maintained. But, will be on fire very soon. 🔥")
// })

function MakeBtnDisabled(btn, disabled = true, label = 'Send') {
  if (disabled) {
    btn.value = "Loading..."
    btn.style.background = 'rgba(0,0,0,.2)'
    btn.style.cursor = 'wait'
    btn.disabled = true
  } else {
    btn.value = label;
    btn.style.background = btnBackgroundColor
    btn.style.cursor = 'pointer'
    btn.disabled = false
  }
}

async function run() {
  detailUsers = await getDetailUsers()
}
/*

Copyright 2021 Rully Ihza Mahendra

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

 */