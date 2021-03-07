/*
 * author: rllyhz <rullyihza00@gmail.com>
 * github_page: https://github.com/rllyhz
 * instagram: rllyhz <https://instagram.com/rllyhz>
 * twitter: rullyihza_ <https://twitter.com/rullyihza_>
 */



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
sr.reveal('.work__img', { interval: 200 });

/*SCROLL CONTACT*/
sr.reveal('.contact__input', { interval: 200 });


const btnSendEmail = document.querySelector("#send-email-button"),
  btnSeeMore = document.querySelector("#see-more-button")

btnSendEmail.addEventListener("click", e => {
  e.preventDefault()

  const fullname = document.querySelector("#your-full-name").value
  const email = document.querySelector("#your-email").value
  const message = document.querySelector("#your-message").value

  if (!fullname || !email || !message) {
    alert("Please fill the available fields")
    return
  }

  sendEmail(fullname, email, message)
})

btnSeeMore.addEventListener("click", e => {
  e.preventDefault()
  alert("Sorry...😣 \nThe project pages are still maintained. But, will be on fire very soon. 🔥")
})

const sendEmail = (name, senderEmail, message) => {
  const myEmail = "xyzreceivermfssawfmessagerrt@gmail.com"
  const password = "zzsefnklDDklnf#q90u$$7cbb"

  Email.send({
    Host: "smtp.gmail.com",
    Username: `${name}`,
    Password: password,
    To: myEmail,
    From: senderEmail,
    Subject: "Message from rllyhz.github.io",
    Body: message,
  })
    .then(function (msg) {
      alert("Email sent successfully!")
    });
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