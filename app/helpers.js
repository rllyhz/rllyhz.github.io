/*
 * author: rllyhz <rullyihza00@gmail.com>
 * github_page: https://github.com/rllyhz
 * instagram: rllyhz <https://instagram.com/rllyhz>
 * twitter: rullyihza_ <https://twitter.com/rullyihza_>
 */


function getElem(cssSelector) {
  return document.querySelector(cssSelector)
}

const CustomAlert = {
  ERROR: "error",
  SUCCESS: "success",
}

window.customAlert = function (message) {
  createCustomAlert(message)
}

function createCustomAlert(message, type = "error") {
  const ALERT_BUTTON_TEXT = "Oke"
  let ALERT_TITLE = "Oops!"

  if (CustomAlert.SUCCESS === type) {
    ALERT_TITLE = "Success!"
  }

  d = document

  if (d.getElementById("modalContainer")) return

  mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"))
  mObj.id = "modalContainer"
  mObj.style.height = d.documentElement.scrollHeight + "px"

  alertObj = mObj.appendChild(d.createElement("div"))
  alertObj.id = "alertBox"
  if (d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px"
  alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px"
  alertObj.style.visiblity = "visible"

  h1 = alertObj.appendChild(d.createElement("h1"))
  h1.appendChild(d.createTextNode(ALERT_TITLE))

  msg = alertObj.appendChild(d.createElement("p"))
  //msg.appendChild(d.createTextNode(message))
  msg.innerHTML = message

  btn = alertObj.appendChild(d.createElement("a"))
  btn.id = "closeBtn"
  btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT))
  btn.href = "#"
  btn.focus()
  btn.onclick = function () { removeCustomAlert(); return false }

  alertObj.style.display = "block"

}

function removeCustomAlert() {
  document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"))
}