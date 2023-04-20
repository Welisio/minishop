let laptops = [
  {
    id: "1",
    name: 'Toshiba',
    img: 'https://www.trustedreviews.com/wp-content/uploads/sites/54/2009/12/12425-img3016s-1.jpg',
    avilability: 5,
  },
  {
    id: "2",
    name: 'HP',
    img: 'https://bestel.az/storage/17485/conversions/media-libraryhUSetP-lg.jpg',
    avilability: 5,
  },
  {
    id: "3",
    name: 'ASUS',
    img: 'https://dlcdnwebimgs.asus.com/gain/1c0823f4-b678-4c63-878b-5d17d7f01386/',
    avilability: 5,
  },
  {
    id: "4",
    name: 'Lenovo',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTxPAZHL5SY8vpKvJK1ODAaVm4M7v6gHDG3w&usqp=CAU',
    avilability: 5,
  }
]

let basket = JSON.parse(localStorage.getItem("basket")) || []

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []

let itemsIncludes = (arr, id) => {
  return arr ? arr.some((el) =>  el.id === id ) : false
}

let btnType = (basket, id) => {
  return  !itemsIncludes(basket, id) ? `<div id="${id}" class="${id} btn btn-primary add">Add to basket</div>` : `<div id="${id}" class="${id} btn btn-danger remove">Remove from basket</div>`
}

let btnTypeWish = (wishlist, id) => {
  return itemsIncludes(wishlist, id) ? `<i style="cursor: pointer" id="i${id}" class="liked fa-solid fa-heart"></i>` : `<i style="cursor: pointer" id="i${id}" class="neutral fa-solid fa-heart"></i>`
}

let laptopsData = localStorage.getItem("laptops")
if (!laptopsData) {
  laptopsData = localStorage.setItem("laptops", JSON.stringify(laptops))
  laptopsData = localStorage.getItem("laptops")
}
laptopsData = JSON.parse(laptopsData)

function emptyAlert () {
  let nothingTxt = () => {
   if ($('.card').length === 0 && $(".h1").length === 0) $(".row").append($(`<div class="h1"></div>`).text("There is nothing here yet"))
   return false
  }
  nothingTxt()
  $(document).on('click','', function () {
    nothingTxt()
  })
}

function shopInit () {
  for (laptop of laptopsData) { 
      $(".row").append(`<div id="${laptop.id}" class="col">
      <div class="card mb-4" style="width: 18rem;">
        <img class="card-img-top" src="${laptop.img}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${laptop.name}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          ${!itemsIncludes(basket, laptop.id) || basket[basket.findIndex(el => el.id == laptop.id)]?.qty === 0 ? `<div id="${laptop.id}" class="${laptop.id} btn btn-primary add">Add to basket</div>` : `<div id="${laptop.id}" class="${laptop.id} btn btn-danger remove">Remove from basket</div>`}
          ${itemsIncludes(wishlist, laptop.id) ? `<i style="cursor: pointer" id="i${laptop.id}" class="liked fa-solid fa-heart"></i>` : `<i style="cursor: pointer" id="i${laptop.id}" class="neutral fa-solid fa-heart"></i>`}
        </div>
      </div>
    </div>`)
  }
}

function basketInit () {
  for (laptop of laptopsData) {
    if (itemsIncludes(basket, laptop.id) && basket[basket.findIndex(el => el.id === laptop.id)].qty !== 0) {
        $(".row").append(`<div id="${laptop.id}" class="${laptop.id}column  col">
        <div class="card mb-4" style="width: 18rem;">
          <img class="card-img-top" src="${laptop.img}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${laptop.name}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <div class="d-flex flex-row">
              <div id="${laptop.id}" class="btn btn-primary inc">Increase</div>
              <div class="${laptop.id}qty mx-1">${basket[basket.findIndex(el => el.id === laptop.id)].qty}</div>
              <div id="${laptop.id}" class="btn btn-danger dec">Decrease</div>
            </div>
          </div>
        </div>
      </div>`)
    }
  }
}

function wishListInit () {
  for (laptop of laptopsData) {
    if (itemsIncludes(wishlist, laptop.id)) {
        $(".row").append(`<div id="${laptop.id}" class="${laptop.id}column  col">
        <div class="card mb-4" style="width: 18rem;">
          <img class="card-img-top" src="${laptop.img}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${laptop.name}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <i style="cursor: pointer;color: #d72f2f;" id="i${laptop.id}" class="wishlist liked fa-solid fa-heart"></i>
          </div>
        </div>
      </div>`)
    }
  }
}


function addToBasket () {
  $(document).on('click', '.add', function(){ 
    let id = $(this).attr("id")
    if (!itemsIncludes(basket, id)) {
      basket.push({id: id,qty: 1})
    } else {
      basket[basket.findIndex(el => el.id == id)].qty = 1 
    }
    if (itemsIncludes(wishlist, id)) {
      wishlist.splice(wishlist.findIndex(el => el.id === id), 1)
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
      $(`#i${id}`).replaceWith(btnTypeWish(wishlist, id))
    }
    localStorage.setItem("basket", JSON.stringify(basket))
    $(`.${id}`).replaceWith(btnType(basket, id))
  })
}


function removeFromBasket () {
  $(document).on('click', '.remove', function(){
    let id = $(this).attr("id")
    basket.splice(basket.findIndex(el => el.id === id), 1)
    localStorage.setItem("basket", JSON.stringify(basket))
    $(`.${id}`).replaceWith(btnType(basket, id))
  })
}

function addToWishList () {
  $(document).on('click', '.neutral', function(){
    let id = $(this).attr("id")
    let splitedId = id.split("")
    wishlist.push({ id:splitedId[1]})
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
    $(`#${id}`).replaceWith(btnTypeWish(wishlist, splitedId[1]))
  })
}

function removeFromWishList () {
  $(document).on('click', '.liked', function(){ 
    let id = $(this).attr("id")
    wishlist.splice(wishlist.findIndex(el => el.id === id.split("")[1]),1)
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
    if ($(this).hasClass("wishlist")) {
      $(`.${id.split("")[1]}column`).remove()
      return
    } 
    $(`#${id}`).replaceWith(btnTypeWish(wishlist, id.split("")[1]))
  })
}

function inc () {
  $(".inc").click(function () {
    let id = $(this).attr("id")
    if (basket[basket.findIndex(el => el.id == id)].qty >= laptops[laptops.findIndex(el => el.id == id)].avilability) {
      alert('No items left in stock !')
      return
    }
    basket[basket.findIndex(el => el.id == id)].qty += 1
    localStorage.setItem("basket", JSON.stringify(basket))
    $(`.${id}qty`).text(basket[basket.findIndex(el => el.id == id)].qty)
  })
}
function dec () {
  $(".dec").click(function () {
    let id = $(this).attr("id")
    basket[basket.findIndex(el => el.id == id)].qty -= 1
    if (basket[basket.findIndex(el => el.id == id)].qty <= 0) {
      $(`.${id}column`).remove()
    }
    localStorage.setItem("basket", JSON.stringify(basket))
    $(`.${id}qty`).text(basket[basket.findIndex(el => el.id == id)].qty)
  })
}