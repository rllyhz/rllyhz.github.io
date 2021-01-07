const projectsButton = getElem("nav a:nth-child(2)")
projectsButton.addEventListener("click", e => {
  e.preventDefault()

  window.customAlert("Sorry...😣 \nProject pages are still maintained. Will be on fire very soon. 🔥")
})