export async function fetchFilm({category,page}) {
  const data = await fetch(`https://api.themoviedb.org/3/movie/${category || 'popular'}?api_key=5503f91f557746ba3ac3cbbfc5cba872&language=en-US&page=${page || 1}`);
  const result = await data.json();
  return result;
}

export async function searchFilm({movie,page}) {
  const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=5503f91f557746ba3ac3cbbfc5cba872&page=${page || 1}`);
  const result = await data.json();
  return result;
}

// search valun ev page push to local storage and read during useeffect