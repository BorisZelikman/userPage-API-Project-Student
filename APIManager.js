//This is the class that will manage all your APIs

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

  getPeople = () => {
    const peopleCount = 7;
    const urlPeople = `https://randomuser.me/api/?results=${peopleCount}`;
    return new Promise((resolve, reject) => {
      $.get(urlPeople)
        .then((responce) => {
          const people = [
            this.fillMainUser(responce),
            this.fillFriends(responce),
          ];
          resolve(people);
        })
        .catch(() => reject("!!! getPeople failed !!! "));
    });
  };

  getQuote = () => {
    const urlQuote = "https://api.kanye.rest";
    return new Promise((resolve, reject) => {
      $.get(urlQuote)
        .then((responce) => {
          resolve(responce.quote);
        })
        .catch(() => {
          reject("!!! getQuote failed !!! ");
        });
    });
  };

  getPoke = () => {
    const maxId = 949;
    const getRndId = (max) => Math.floor(Math.random() * max) || 1;
    const urlPoke = `https://pokeapi.co/api/v2/pokemon/${getRndId(maxId)}`;
    return new Promise((resolve, reject) => {
      $.get(urlPoke)
        .then((responce) => {
          resolve({
            name: responce.name,
            imageUrl: responce.sprites.front_default,
          });
        })
        .catch(() => reject("!!! getPoke !!! "));
    });
  };

  getAbout = () => {
    const url = "https://baconipsum.com/api/?type=meat-and-filler&paras=1";
    return new Promise((resolve, reject) => {
      $.get(url)
        .then((responce) => {
          resolve(responce[0]);
        })
        .catch(() => {
          reject("!!! getAbout failed !!! ");
        });
    });
  };

  loadData = () => {
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
    gotAll
      .then((promiseResults) => {
        let [people, quote, poke, about] = promiseResults;

        this.data = {
          mainUser: people[0],
          friends: people[1],
          quote: quote,
          poke: poke,
          about: about,
        };
        console.log(this.data);
      })
      .catch((error) => console.log(error));
  };

  loadDataPromise = () => {
    return new Promise((resolve) => {
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
      gotAll
        .then((promiseResults) => {
          let [people, quote, poke, about] = promiseResults;

          this.data = {
            mainUser: people[0],
            friends: people[1],
            quote: quote,
            poke: poke,
            about: about,
          };
          console.log(this.data);
        })
        .then(() => {
          console.log("promise completed successfully");
          resolve(this.data);
        });
    });
  };

  constructor() {
    this.data = {};
    this.loadData();
  }
}
