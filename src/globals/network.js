import { serialize } from "./utils";

function fetchShell(url) {
  return fetch(url)
    .then(function (result) {
      return result.json();
    });
}

export function getResults(_params, cb) {
  const url = "https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow&" + serialize(_params);
  return fetchShell(url)
    .then((res) => {
      console.log(res);
      cb(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
