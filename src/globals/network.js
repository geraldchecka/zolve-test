function fetchShell(url) {
  return fetch(url);
}

export function searchMovies(cb, query = "") {
  const url =
    "https://api.themoviedb.org/3/search/movie? &api_key=04c35731a5ee918f014970082a0088b1&query=" +
    query;
  return fetchShell(url)
    .then(function (result) {
      return result.json();
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getMovies(_params, cb) {
  const {
    fromdate, // "YYYY-MM-DD"
    todate,  // "YYYY-MM-DD"
    pagesize = 30,
    page = 1
  } = _params;
  // const url = "https://api.stackexchange.com/2.2/tags?pagesize=30&order=desc&sort=popular&site=stackoverflow&page=2";
  const url = "https://api1.themoviedb.org/3/discover/movie? sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
  return fetchShell(url)
    .then(function (result) {
      return result.json();
    })
    .then((res) => {
      console.log(res);
      cb(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
