export function Store(namespace, data) {
  if (data) {
    return localStorage.setItem(namespace, JSON.stringify(data));
  }

  let store = localStorage.getItem(namespace);
  return (store && JSON.parse(store));
}

export function addToStore(namespace, data) {
  let store = localStorage.getItem(namespace);
  store = JSON.parse(store) || [];
  store.push(data);
  localStorage.setItem(namespace, JSON.stringify(store));
}

export function removeFromFavorites(namespace, data) {
  let store = localStorage.getItem(namespace);
  store = JSON.parse(store);
  let index = store.findIndex(x => x.thumb_url === data.thumb_url)
  console.log('index');
  console.log(index);
  console.log(store);

  if (index > -1) {
    store.splice(index, 1);
  }

  console.log('index');
  console.log(store);
  localStorage.setItem(namespace, JSON.stringify(store));
}

export function addLastSearch(searchString) {
  let search = { title: '', timeStamp: Date.now(), data: [], page: 0, matches: 0, resultsShown: 0 };
  search.title = searchString;
  let store = localStorage.getItem('lastSearches');
  store = JSON.parse(store) || [];
  store.push(search);
  if (store.length > 6) { store.length = 6 }
  localStorage.setItem('lastSearches', JSON.stringify(store));
}

export function addLastSearchData(data, timeStamp) {
  let store = localStorage.getItem('lastSearches');
  store = JSON.parse(store);
  let index = store.findIndex(x => x.timeStamp === timeStamp)
  console.log('index');
  console.log(timeStamp);
  console.log(index);
  store[index].data = store[index].data.concat(data.response.listings);
  store[index].page = data.request.page;
  store[index].matches = data.response.total_results;
  store[index].resultsShown = parseInt(data.request.num_res, 10) + parseInt(data.request.offset, 10);
  localStorage.setItem('lastSearches', JSON.stringify(store));
}