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

const savePage = (data) => {
  const jsonData = JSON.stringify(data);
  localStorage.setItem("pageData", jsonData);
};

const loadPage = () => {
  const jsonData = localStorage.getItem("pageData");
  if (jsonData) {
    const data = JSON.parse(jsonData);

    apiManager.data = data;
    renderData();
  } else {
    console.log("No page data found.");
  }
};
$("button").on("click", function (sender) {
  if (sender.target.id === "btnGenerate") generateUser();
  if (sender.target.id === "btnLoad") loadData();
  if (sender.target.id === "btnDisplay") renderData();
  if (sender.target.id === "btnLoadPage") loadPage();
  if (sender.target.id === "btnSavePage") savePage(apiManager.data);
});

generateUser();
