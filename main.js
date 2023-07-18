const apiManager = new APIManager();
const renderer = new Renderer();

const generateUser = async function () {
  apiManager.loadData().then(() => renderer.main(apiManager.data));
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
    renderer.main(apiManager.data);
  } else {
    console.log("No page data found.");
  }
};

$("button").on("click", function (sender) {
  if (sender.target.id === "btnGenerate") generateUser();
  if (sender.target.id === "btnLoadPage") loadPage();
  if (sender.target.id === "btnSavePage") savePage(apiManager.data);
});

generateUser();
