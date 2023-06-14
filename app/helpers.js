/*
 * author: rllyhz <rullyihza00@gmail.com>
 * github_page: https://github.com/rllyhz
 * instagram: rllyhz <https://instagram.com/rllyhz>
 * twitter: rullyihza_ <https://twitter.com/rullyihza_>
 */
const testingMode = true;

function getCloudinaryAPI(apiKey, apiSecret, cloudName) {
  return `https://${apiKey}:${apiSecret}@api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`;
}

function getBaseUrl() {
  return location.origin;
}

function getBaseUrlAPI() {
  return testingMode
    ? 'http://localhost:9000/.netlify/functions/api'
      : 'https://rllyzhz-github-pages.netlify.app/.netlify/functions/api';
}

function getEndpointPath(path = '/') {
  let validPath = path.trim();
  if (validPath.startsWith('/')) {
    validPath = validPath.slice(1, validPath.length);
  }
  if (validPath.endsWith('/')) {
    validPath = validPath.slice(0, validPath.length - 1);
  }
  return `${getBaseUrlAPI()}/${validPath}`;
}

function getElem(cssSelector) {
  return document.querySelector(cssSelector)
}

function showElem(elem, displayValue = "block") {
  elem.style.display = displayValue
}

function hideElem(elem) {
  elem.style.display = "none"
}

let dashboardBtnBackgroundColor = null;
function showLoadingOnButton(btn, disabled = true, label = 'Export') {
  if (disabled) {
    dashboardBtnBackgroundColor = getComputedStyle(btn).backgroundColor;
    btn.innerText = "Loading...";
    btn.style.background = 'rgba(0,0,0,.2)';
    btn.style.cursor = 'wait';
    btn.disabled = true;
  } else {
    btn.innerText = label;
    btn.style.background = dashboardBtnBackgroundColor ??= getComputedStyle(btn).backgroundColor;
    btn.style.cursor = 'pointer';
    btn.disabled = false;
  }
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


async function doesImageExist(url) {
  let _imageExists = false;

  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-cache'
    });

    console.clear();

    _imageExists = response.status === 200;

  } catch(error) {
    console.log(error);
    console.clear()
    _imageExists = false;
  }

  return _imageExists;
}

async function createProjectCard(project, suffixImagePath) {
  const anchorContainer = document.createElement("a")
  anchorContainer.setAttribute("href", "../projects/detail.html?id=" + project.id)
  anchorContainer.classList.add("work__img")
  
  const img = document.createElement("img");
  img.setAttribute('loading', 'lazy');
  const imageExist = await doesImageExist(`${getBaseUrl()}/${project.imagePath}`);

  if (project.imagePath && imageExist) {
    img.setAttribute("src", `${getBaseUrl()}/${project.imagePath}`);
  } else {
    img.setAttribute("src", getBaseUrl() +"/assets/img/work-photo-placeholder.png");
  }
  img.setAttribute("alt", project.name)

  anchorContainer.appendChild(img);

  return anchorContainer;
}

async function addProject(project, suffixImagePath) {
  const projectCard = await createProjectCard(project, suffixImagePath)
  document.querySelector("#work .work__container").appendChild(projectCard)
}

function enableLazyloadedImages() {
  if (!document.querySelector('.blur-load')) return;
  document.querySelectorAll('.blur-load').forEach(container => {
    const img = container.querySelector(img);

    function loaded() {
      // show img
      container.classList.add('loaded');
    }
    if (img.complete) {
      loaded()
    } else {
      img.addEventListener('load', loaded);
    }
  });
}

function getQueryData(key) {
  const params = new URLSearchParams(window.location.search)
  const data = params.get(key)

  return data
}

const hasVisitedKey = "rllyhz.github.io-has-visited"
function getHasVisitedValue() {
  return JSON.parse(window.localStorage.getItem(hasVisitedKey));
}
function setVisitedValue(hasVisited = false) {
  window.localStorage.setItem(hasVisitedKey, hasVisited);
}

const authDataKey = "rllyhz.github.io-auth-data"
function saveAuthData(userData = {}, isLoggedIn = true) {
  const authData = {
    id: userData.id,
    name: userData.name,
    username: userData.username,
    token: userData.token,
    cloudinary: userData.cloudinary,
    isLoggedIn,
  };
  localStorage.setItem(authDataKey, JSON.stringify(authData));
}

function getAuthData() {
  return JSON.parse(localStorage.getItem(authDataKey));
}

function parseBoolean(value = 'false') {
  return (value.toLowerCase() == 'true') ? true : false;
}

function getGreetingUserTemplate(name) {
  const today = new Date();
  const currHours = today.getHours();
  let gretting;
  if (currHours < 12) {
    gretting = "Good Morning";
  } else if (currHours < 18) {
    gretting = "Good Afternoon";
  } else {
    gretting = "Good Evening"
  }
  return `${gretting}, ${getFirstName(name)}! 👋`;
}

function getFirstName(fullname = '') {
  return fullname.split(' ')[0];
}

function loadURLToInputFiled(url){
  getImgURL(url, (imgBlob) => {
    // Load img blob to input
    // WIP: UTF8 character error
    let fileName = 'projects.json'
    let file = new File([imgBlob], fileName,{type:"image/jpeg", lastModified:new Date().getTime()}, 'utf-8');
    let container = new DataTransfer(); 
    container.items.add(file);
    document.querySelector('#file_input').files = container.files;
    
  })
}

function getFilePath(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (typeof callback === 'function') {
      callback(xhr.response);
    }
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
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