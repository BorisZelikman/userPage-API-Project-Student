class Renderer {
  renderMainUser = (userData) => {
    const source = $("#user-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template(userData);
    console.log(userData);

    $(".user-container").empty().append(newHTML);
  };
  renderFriends = (friendsData) => {
    const source = $("#friends-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template(friendsData);

    $(".friends-container").append(newHTML);
  };
  // renderMainUser = (user) => {
  //   const source = $("#user-template").html();
  //   template = Handlebars.compile(source);
  //   userHTML = template(user);
  //   $(".user-container").append(userHTML);
  // };
  main = (data) => {
    this.renderMainUser(data.mainUser);
    this.renderFriends({ friends: data.friends });
  };
  constructor() {}
}
