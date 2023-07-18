// const user = { picUrl: "", name: "Name", place: "Place" };

// const source = $("#user-template").html();
// const template = Handlebars.compile(source);
// const userHTML = template(user);

const apiManager = new APIManager();
const renderer = new Renderer();

const loadData = () => {
  apiManager.loadData();
};
const renderData = () => {
  renderer.main(apiManager.data);
};
const generateUser = async function () {
  console.log("loadData");
  await apiManager.loadDataPromise();
  renderer.main(apiManager.data);
  console.log("rendered");
};

$("button").on("click", function (sender) {
  if (sender.target.id === "btnGenerate") generateUser();
  if (sender.target.id === "btnLoad") loadData();
  if (sender.target.id === "btnDisplay") renderData();
});
