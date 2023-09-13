export function getQueryParamsDeatils(url) {
  let params = (url || "").split("?")?.[1];
  if (params) {
    let paramsKeyValue = params.split("&");
    let userData = {};
    for (let keyValue of paramsKeyValue) {
      let data = keyValue.split("=");
      userData[data[0]] = data[1];
    }
    return userData;
  }
  return null;
}

export function getQueryStringFromObject(object) {
  let stringValue = "";
  for (let key in object) {
    if (object.hasOwnProperty(key) && object[key]) {
      stringValue = stringValue + `${key}=${object[key]}&`;
    }
  }
  return stringValue;
}

export function getCookie(cookieName) {
  var name = cookieName + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');

  for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
      }
  }
  return null; // Return null if the cookie is not found
}

export function setCookie(name, value, days) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  const cookieValue = encodeURIComponent(value) + (days ? '; expires=' + expirationDate.toUTCString() : '');
  document.cookie = name + '=' + cookieValue + '; path=/';
}