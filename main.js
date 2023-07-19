const apiManager = new APIManager();
const renderer = new Renderer();

const generateUser = async function () {
  apiManager
    .loadData()
    .then(() => renderer.renderAll(apiManager.data, apiManager.storageInfo));
};

const savePage = () => {
  apiManager.savePage();
  renderer.renderAll(apiManager.data, apiManager.storageInfo);
};

$("button").on("click", function (sender) {
  if (sender.target.id === "btnGenerate") generateUser();
  if (sender.target.id === "btnSavePage") savePage();
});

$(document).on("click", "#btnLoadPage", function (sender) {
  const num = $("#savedPagesSelector").val();
  apiManager.loadSelectedPage(num);
  renderer.renderAll(apiManager.data, apiManager.storageInfo);
});

generateUser();
