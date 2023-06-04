
// 資料串接
const apiPath = "https://2023-engineer-camp.zeabur.app";


//DOM
const list = document.querySelector("#list");
const searchInput = document.querySelector(".searchInput");
const dropDownSelect = document.querySelector(".dropDownSelect"); //ul
const dropDownSelectBtn = document.getElementById("dropDownSelectBtn");//btn
const dropDownTime = document.querySelector(".dropDownTime");
const dropDownTimeBtn = document.getElementById("dropDownTimeBtn");
const middleGroup = document.querySelectorAll(".middleGroup label");





const data = {
  type: "",
  sort: 0,
  page: 1,
  search: "",
};

let worksData = [];//渲染用資料
let originData = []; //原始資料
let pagesData = {};


// get資料 + init渲染
function getData({ type, sort, page, search }) {
  const apiUrl = `${apiPath}/api/v1/works?sort=${sort}&page=${page}&${
    type ? `type=${type}&` : ""
  }${search ? `search=${search}` : ""}`;
  axios.get(apiUrl).then(function (res) {
    originData = res.data.ai_works.data;
    console.log(originData);
    pagesData = res.data.ai_works.page;
    renderWorks(originData);
  });
}

getData(data);


// 純資料渲染功能
function renderWorks(dataOk) {
  let works = '';
  dataOk.forEach((item) => {
    works += /*html*/ `<li class="col py-3">
              <div class="card product-rounded" >
                <img src=${item.imageUrl} class="product-img-rounded" alt="">
                <div class="card-body p-0">
                  <div class="py-5 px-4 content-card-height d-flex flex-column justify-content-between">
                    <h5 class="fw-bold fs-3">${item.title}</h5>
                    <p>${item.description}</p>
                  </div>
                  <div class="d-flex justify-content-between border-dot-top py-3 px-4">
                    <div>
                      <p>${item.model}模型</p>
                    </div>
                    <div>
                      <p>${item.discordId}</p>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between border-dot-top py-3 px-4">
                    <div>
                      <p>#${item.type}</p>
                    </div>
                    <div>
                      <a href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-share-fill " viewBox="0 0 16 16">
                          <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>`;
  });
  list.innerHTML = works;
}


//關鍵字搜尋功能
searchInput.addEventListener("keydown", function (e) {
  if (e.key === 'Enter') {
    const keyword = e.target.value.toLowerCase();
    const filterData = originData.filter((item) =>
      item.title.toLowerCase().includes(keyword)
    );
    //清空
    list.innerHTML = '';
    //渲染
    renderWorks(filterData);
  }
});


//監聽選單
dropDownSelect.addEventListener("click", function (e) {
  const selectKeyword = e.target.textContent;
  
  //篩選按鈕文字修改
  dropDownSelectBtn.textContent = selectKeyword;

  //全部渲染
  if (selectKeyword === "全部") {
    getData(data);
  }

  //過濾資料
  const filterData = originData.filter((item) =>
    item.description.includes(selectKeyword)
  );

  //清空html
  list.innerHTML = "";
  //渲染
  renderWorks(filterData);
});



//由新到舊功能
//假設create_time是數字越小的越舊
dropDownTime.addEventListener('click', function (e) {

  const timeKeyword = e.target.textContent;

  dropDownTimeBtn.textContent = timeKeyword;

  //由新到舊
  if( timeKeyword === '由新到舊') {
    //由於排出來跟原始資料一樣，這裡就做getData(data)就好
    getData(data);
  }

  //由舊到新，跟原本資料順序相反
  if(timeKeyword === '由舊到新') {
    const oldToNewData = originData.sort(function (a, b) {
      return a.create_time - b.create_time;
    });
    renderWorks(oldToNewData);
  }

})

//加監聽到 中間選單 的每個label 
middleGroup.forEach((label) => {
  label.addEventListener("click", function (e) {
    const labelText = e.target.innerText;

    //全部渲染
    if(labelText ==='全部') {
      getData(data);
    }

    //過濾資料
    const filterData = originData.filter((item) =>
      item.description.includes(labelText)
    );
    //清空html
    list.innerHTML = "";
    //渲染
    renderWorks(filterData);
  });
});


const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 24,
  breakpoints: {
    576: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      enabled: false,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", function(e) {
  console.log(e);
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach( item => 
  item.addEventListener('click', ()=> {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
)








//第一筆陣列資料 res.data.ai_works.data : title/ description/ discordId/ imageUrl/ type/ create_time /model
/*{
    "create_time": 1685631555918,
    "description": "輸入臺灣的縣市鄉鎮資料，可回覆郵遞區號",
    "discordId": "andychiou#4830",
    "id": "-NWrT4Yzp_8LlfQwaprM",
    "imageUrl": "https://storage.googleapis.com/engineer-camp-5b706.appspot.com/images/053473b5-885e-4a1f-8f63-2da41d1269cc.png?GoogleAccessId=firebase-adminsdk-emcev%40engineer-camp-5b706.iam.gserviceaccount.com&Expires=16756675200&Signature=ioJ2eic%2FEzVbSqMy09bZjQsxH%2FPxF9Ts0%2B%2FWTjBIHeB2HvKNoEavHBdZ6Hy7gOwqN%2FV6P%2FQ2XWlPfr8IFqHs%2BBQ36SrljpOMtE3hcmHnIFaQLc0hZsPwyaYKLPZT21uDRGSsU%2FNT2c3q5LFRVaEAbj0XP7%2BlDdMHPyrBi%2BvLI%2FSIXo45e%2B20Px713GgFYj9alKZwwLG7NMPnB%2B0SUy7qXdymQwcI%2FoW8ldPJBLau58WlPNJ9TEhmyxJMiVxnoQuMvdITCbgaKKQOB1%2FUNGb9s4wULX0sraP3%2BhLWKxwtcpdjmrA6OUPzQYYokN03QnaPp3M1yHYbAtGDX8V6q7OMCQ%3D%3D",
    "link": "https://zipcode3-5mwv77qf5-andychiou1113.vercel.app/",
    "model": "gpt3.5",
    "status": true,
    "title": "郵遞區號查詢",
    "type": "生活應用",
    "userId": "ULjcbLc350dwMjmKQnlzEPl9cRm2"
} */