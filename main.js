const apiManager = new APIManager();
const renderer = new Renderer();

const generateUser = async function () {
  apiManager
    .loadData()
    .then(() => renderer.renderAll(apiManager.data, apiManager.settings));
};

const loadPage = () => {
  const num = apiManager.settings.selectedValue;
  apiManager.data = apiManager.storedUsers[num];
  renderer.renderAll(apiManager.data, apiManager.settings);
};

const savePage = () => {
  apiManager.savePage();
  renderer.renderAll(apiManager.data, apiManager.settings);
};

$("button").on("click", function (sender) {
  if (sender.target.id === "btnGenerate") generateUser();
  if (sender.target.id === "btnSavePage") savePage();
});

$(document).on("click", "#btnLoadPage", function (sender) {
  loadPage();
});

$(document).on("change", "#savedPagesSelector", function (event) {
  apiManager.settings.selectedValue = event.target.value;
});

generateUser();
