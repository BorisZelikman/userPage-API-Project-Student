class APIManager {
  fillMainUser = (peopleResponce) => {
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

  fillFriends = (peopleResponce) => {
    const friends = peopleResponce.results.map(({ name }) => ({
      firstName: name.first,
      lastName: name.last,
    }));
    friends.splice(0, 1);
    return friends;
  };

  getPeople = async () => {
    const peopleCount = 7;
    const urlPeople = `https://randomuser.me/api/?results=${peopleCount}`;
    const response = await $.get(urlPeople);
    return [this.fillMainUser(response), this.fillFriends(response)];
  };

  getQuote = async () => {
    const urlQuote = "https://api.kanye.rest";
    const response = await $.get(urlQuote);
    return response.quote;
  };

  getPoke = async () => {
    const maxId = 949;
    const getRndId = (max) => Math.floor(Math.random() * max) || 1;
    const urlPoke = `https://pokeapi.co/api/v2/pokemon/${getRndId(maxId)}`;
    const response = await $.get(urlPoke);
    return {
      name: response.name,
      imageUrl: response.sprites.front_default,
    };
  };

  getAbout = async () => {
    const url = "https://baconipsum.com/api/?type=meat-and-filler&paras=1";
    const response = await $.get(url);
    return response;
  };

  loadData = async () => {
    const peoplePromise = this.getPeople();
    const quotePromise = this.getQuote();
    const pokePromise = this.getPoke();
    const aboutPromise = this.getAbout();

    const gotAll = Promise.all([
      peoplePromise,
      quotePromise,
      pokePromise,
      aboutPromise,
    ]);
    try {
      const promiseResults = await gotAll;
      let [people, quote, poke, about] = promiseResults;

      this.data = {
        mainUser: people[0],
        friends: people[1],
        quote: quote,
        poke: poke,
        about: about,
      };
      console.log(this.data);
    } catch (error) {
      return console.log(error);
    }
  };

  savePage = () => {
    let newKey = Object.keys(this.storedUsers).length;
    this.storedUsers[newKey] = this.data;
    console.log(this.storedUsers);

    const jsonData = JSON.stringify(this.storedUsers);
    localStorage.setItem("users-data", jsonData);

    this.settings.keys = Object.keys(this.storedUsers);
    this.settings.stored = this.settings.keys.length > 0;
  };

  loadStoredUsers = () => {
    const jsonData = localStorage.getItem("users-data");
    if (jsonData) {
      this.storedUsers = JSON.parse(jsonData);

      this.settings.keys = Object.keys(this.storedUsers);
      this.settings.stored = this.settings.keys.length > 0;
      this.settings.selectedValue ||= 0;
    } else {
      console.log("users-data local storage not found.");
    }
  };

  constructor() {
    this.data = {};
    this.storedUsers = {};
    this.settings = { stored: false, selectedValue: "", keys: [] };
    this.loadData();
    this.loadStoredUsers();
  }
}
