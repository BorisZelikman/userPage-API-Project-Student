// const user = { picUrl: "", name: "Name", place: "Place" };

// const source = $("#user-template").html();
// const template = Handlebars.compile(source);
// const userHTML = template(user);

const apiManager = new APIManager();
const renderer = new Renderer();

const loadData = () => {
  apiManager.loadData();
  renderer.main(apiManager.data);
};
const renderData = () => {
  renderer.main(apiManager.data);
};

$("button").on("click", function (sender) {
  if (sender.target.id === "btnLoad") loadData();
  if (sender.target.id === "btnDisplay") renderData();
});
