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

const savePage = (data, fileName) => {
  let a = document.createElement("a");
  let file = new Blob([JSON.stringify(data)], { type: "application/json" });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

const loadPage = () => {
  fetch("saved-data/page.json")
    .then((response) => response.json())
    .then((data) => {
      apiManager.data = data;
      renderData();
    })
    .catch((error) => {
      console.error("Error reading file:", error);
    });
};
$("button").on("click", function (sender) {
  if (sender.target.id === "btnGenerate") generateUser();
  if (sender.target.id === "btnLoad") loadData();
  if (sender.target.id === "btnDisplay") renderData();
  if (sender.target.id === "btnLoadPage") loadPage();
  if (sender.target.id === "btnSavePage")
    savePage(apiManager.data, "page.json");
});

generateUser();
