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
