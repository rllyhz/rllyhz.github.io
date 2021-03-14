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

const GET_API_CLIENT_URL = "https://ipapi.co/json/"
let detailUsers

async function getUserDetails() {
  let result = await fetch(GET_API_CLIENT_URL)
  result = await result.json()

  return result
}

function getDataForm(form, userDetails) {
  const formData = new FormData(form)

  formData.append("ip_address", userDetails.ip ?? "")
  formData.append("city", userDetails.city ?? "")
  formData.append("region", `${userDetails.region ?? ""} (${userDetails.region_code ?? ""})`)
  formData.append("country", `${userDetails.country_name ?? ""} (${userDetails.country ?? ""})`)
  formData.append("timezone", userDetails.timezone ?? "")
  formData.append("organization", userDetails.org ?? "")
  formData.append("latitude", userDetails.latitude ?? "")
  formData.append("longitude", userDetails.longitude ?? "")
  formData.append("languages", userDetails.languages ?? "")
  formData.append("currency", userDetails.currency ?? "")
  formData.append("currency_name", userDetails.currency_name ?? "")
  formData.append("country_capital", userDetails.country_capital ?? "")
  formData.append("country_calling_code", userDetails.country_calling_code ?? "")
  formData.append("country_population", userDetails.country_population ?? "")
  formData.append("country_tld", userDetails.country_tld ?? "")
  formData.append("country_area", userDetails.country_area ?? "")
  formData.append("asn", userDetails.asn ?? "")

  return formData
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