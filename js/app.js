const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
const container = document.getElementById("container");
const spinner = document.getElementById("spinner");
const allCardContainer = document.getElementById("allCardContainer");
const issueCount = document.getElementById("issueCount");
const inputSearch = document.getElementById("inputSearch");
const modContain = document.getElementById("modContain");
let allCard = [];
let openCard = [];
let closedCard = [];

function toggleStyle(btn) {
  const btns = document.querySelectorAll(".btn");
  btns.forEach((btn) => {
    btn.classList.remove("bg-[#4A00FF]", "text-white", "font-semibold");
    btn.classList.add(
      "bg-white",
      "text-[#64748B]",
      "border-[#E4E4E7]",
      "font-medium",
    );
  });
  const selectBtn = document.getElementById(btn);
  selectBtn.classList.remove("bg-white", "text-[#64748B]", "border-[#E4E4E7]");
  selectBtn.classList.add("bg-[#4A00FF]", "text-white", "font-semibold");

  inputSearch.value = "";
  loadCards(selectBtn);
}



const manageSpinner = (status) => {
  if (status == true) {
    spinner.classList.remove("hidden");
    container.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    container.classList.remove("hidden");
  }
};
async function loadCards(Btn) {
  manageSpinner(true);
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  displayCards(data.data, Btn);
}