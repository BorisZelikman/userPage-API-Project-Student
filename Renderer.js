class Renderer {
  templateHtml = (templateId, data) => {
    const source = $(templateId).html();
    const template = Handlebars.compile(source);
    const newHTML = template(data);
    return newHTML;
  };

  renderMainUser = (userData) => {
    $(".user-container")
      .empty()
      .append(this.templateHtml("#user-template", userData));
  };
  renderFriends = (friendsData) => {
    $(".friends-container")
      .empty()
      .append(this.templateHtml("#friends-template", friendsData));
  };

  renderQuote = (quoteData) => {
    $(".quote-container")
      .empty()
      .append(this.templateHtml("#quote-template", quoteData));
  };

  renderPoke = (pokeData) => {
    $(".pokemon-container")
      .empty()
      .append(this.templateHtml("#poke-template", pokeData));
  };

  renderAbout = (aboutData) => {
    $(".meat-container")
      .empty()
      .append(this.templateHtml("#about-template", aboutData));
  };

  renderLoadFromStorage = (loadInfo) => {
    $(".load-container")
      .empty()
      .append(this.templateHtml("#load-template", loadInfo));
  };

  renderAll = (data, settings) => {
    this.renderMainUser(data.mainUser);
    this.renderFriends({ friends: data.friends });
    this.renderQuote({ quote: data.quote });
    this.renderPoke(data.poke);
    this.renderAbout({ about: data.about });
    this.renderLoadFromStorage(settings);
  };

  constructor() {
    Handlebars.registerHelper("capitalizeWords", function (str) {
      const words = str.split(" ");
      const capitalizedWords = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );
      return capitalizedWords.join(" ");
    });
  }
}
