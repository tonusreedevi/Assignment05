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

function displayCards(cards, Btn) {
  allCardContainer.innerHTML = "";
  allCard = [];
  openCard = [];
  closedCard = [];
  cards.forEach((card) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div onclick="issueDetail(${card.id})" class = "shadow-sm h-full hover:bg-gray-100 hover:scale-102 transition-transform duration-300 pt-3 mb-4 bg-white rounded-lg border-t-4 ${card.status === "open" ? `border-t-[#00A96E]` : `border-t-[#A855F7]`} ">
            <div class="p-6 space-y-3">
            <div class="flex justify-between">  <img src="${card.status === "open" ? `./assets/Open-Status.png` : `./assets/Closed-Status.png`}" alt="" />
            <div
            class="badge ${card.priority == "high" ? `text-[#b92d2d] bg-[#FEECEC]` : card.priority == "medium" ? `bg-[#FFF8DB] text-[#f89d35]` : `bg-[#eeeff2d3] text-[#9CA3AF]`} px-[26px] py-[6px] font-medium rounded-full"
            >
          ${card.priority}
          </div>
          </div>
          <div>
          <h3 class="font-semibold text-[14px] mb-2">
          ${card.title}
          </h3>
          <p class="text-[12px] text-[#64748B] line-clamp-2">
          ${card.description}
          </p>
          </div>
          <div class="flex gap-1 flex-wrap justify-center">
          <div
          class="badge bg-[#FEECEC] text-[#db3434] border-[#fecacada] text-[12px] font-medium rounded-full"
          >
          <i class="fa-solid fa-bug"></i>${card.labels[0]}
          </div>
          <div
          class="badge bg-[#FFF8DB] text-[#c0741e] border-[#FDE68A] text-[12px] font-medium rounded-full"
          >
          <i class="fa-solid fa-life-ring"></i>${card.labels[1]}
          </div>
          </div>
          </div>
          <hr class="border-gray-500" />
          <div class="p-6 space-y-2">
          <p class="text-[12px] text-[#415168]">${card.author}</p>
          <p class="text-[12px] text-[#64748B]">${card.createdAt}</p>
          </div>
          </div>
          `;

    if (Btn === openBtn) {
      if (card.status === "open") {
        allCardContainer.appendChild(div);
        openCard.push(card);
        issueCount.innerText = `${openCard.length}`;
      }
    }
    else if (Btn == closedBtn) {
      if (card.status == "closed") {
        allCardContainer.appendChild(div);
        closedCard.push(card);
        issueCount.innerText = `${closedCard.length}`;
      }
    } else {
      allCardContainer.appendChild(div);
      allCard.push(card);
      issueCount.innerText = `${allCard.length}`;
    }
  });
  manageSpinner(false);
}
loadCards(allBtn);

async function searchResults(search) {
  const searchValues = inputSearch.value;
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValues}`,
  );
  const data = await res.json();
  displayCards(data.data);

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
}

const issueDetail = (id) => {
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then((res) => res.json())
    .then((detail) => displayModal(detail.data));
}