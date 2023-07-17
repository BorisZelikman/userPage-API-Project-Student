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
        .catch((error) => reject("!!! getMainUser !!! " + error));
    });
  };

  loadData = () => {
    let peoplePromise = this.getPeople();
    const gotAll = Promise.all([peoplePromise]);
    gotAll.then((promiseResults) => {
      let [people] = promiseResults;

      this.data = {
        mainUser: people[0],
        friends: people[1],
      };
      console.log(this.data);
    });
  };
  constructor() {
    this.data = {};
    this.loadData();
  }
}
