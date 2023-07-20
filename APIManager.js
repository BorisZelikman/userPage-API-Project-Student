class APIManager {
  #fillMainUser = (peopleResponce) => {
    const person = peopleResponce.results[0];
    const mainUserData = {
      picture: person.picture.large,
      firstName: person.name.first,
      lastName: person.name.last,
      city: person.location.city,
      state: person.location.state,
    };
    return mainUserData;
  };

  #fillFriends = (peopleResponce) => {
    const friends = peopleResponce.results.map(({ name }) => ({
      firstName: name.first,
      lastName: name.last,
    }));
    friends.splice(0, 1);
    return friends;
  };

  #getPeople = async () => {
    const peopleCount = 7;
    const urlPeople = `https://randomuser.me/api/?results=${peopleCount}`;
    const response = await $.get(urlPeople);
    return [this.#fillMainUser(response), this.#fillFriends(response)];
  };

  #getQuote = async () => {
    const urlQuote = "https://api.kanye.rest";
    const response = await $.get(urlQuote);
    return response.quote;
  };

  #getGyphy = async (searchStr) => {
    console.log(searchStr);
    const api_key = "lCfAKpgxCTeeIfHELqrnDkDzsjGwjmns";
    const urlGyphy = `http://api.giphy.com/v1/gifs/search?q=${searchStr}&api_key=${api_key}&limit=1`;
    const response = await $.get(urlGyphy);
    return {
      imageUrl: response.data[0].images.downsized.url,
    };
  };

  #getPoke = async () => {
    const maxId = 949;
    const getRndId = (max) => Math.floor(Math.random() * max) || 1;
    const urlPoke = `https://pokeapi.co/api/v2/pokemon/${getRndId(maxId)}`;
    const response = await $.get(urlPoke);
    return {
      name: response.name,
      imageUrl: response.sprites.front_default,
    };
  };

  #getAbout = async () => {
    const url = "https://baconipsum.com/api/?type=meat-and-filler&paras=1";
    const response = await $.get(url);
    return response;
  };

  loadData = async () => {
    const peoplePromise = this.#getPeople();
    const quotePromise = this.#getQuote();
    const pokePromise = this.#getPoke();
    const gyphyPromise = pokePromise.then((result) => {
      return this.#getGyphy(result.name);
    });

    const aboutPromise = this.#getAbout();

    const gotAll = Promise.all([
      peoplePromise,
      quotePromise,
      pokePromise,
      gyphyPromise,
      aboutPromise,
    ]);
    try {
      const promiseResults = await gotAll;
      let [people, quote, poke, gyphy, about] = promiseResults;

      this.#data = {
        mainUser: people[0],
        friends: people[1],
        quote: quote,
        poke: poke,
        gyphy: gyphy,
        about: about,
      };
    } catch (error) {
      return console.log(error);
    }
  };

  savePage = () => {
    if (Object.values(this.storedPages).includes(this.data)) return;

    let newKey = Object.keys(this.storedPages).length;
    this.#storedPages[newKey] = this.data;

    const jsonData = JSON.stringify(this.storedPages);
    localStorage.setItem("users-data", jsonData);
  };

  #loadPagesFromStorage = () => {
    const jsonData = localStorage.getItem("users-data");
    if (jsonData) {
      this.#storedPages = JSON.parse(jsonData);
    } else console.log("users-data local storage not found.");
  };

  loadSelectedPage = (num) => {
    this.#data = this.storedPages[num];
  };

  get storageInfo() {
    return {
      stored: Object.keys(this.storedPages).length > 0,
      keys: Object.keys(this.storedPages),
    };
  }

  get storedPages() {
    return this.#storedPages;
  }

  get data() {
    return this.#data;
  }

  #storedPages = {};
  #data = {};

  constructor() {
    this.loadData();
    this.#loadPagesFromStorage();
  }
}
