let laptops = {
  "1": {
    img: 'https://www.trustedreviews.com/wp-content/uploads/sites/54/2009/12/12425-img3016s-1.jpg',
    avilability: 5,
  },
  "2": {
    img: 'https://bestel.az/storage/17485/conversions/media-libraryhUSetP-lg.jpg',
    avilability: 5,
  },
  "3": {
    img: 'https://dlcdnwebimgs.asus.com/gain/1c0823f4-b678-4c63-878b-5d17d7f01386/',
    avilability: 5,
  },
  "4": {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTxPAZHL5SY8vpKvJK1ODAaVm4M7v6gHDG3w&usqp=CAU',
    avilability: 5,
  }
}

let btnType = (basket, id) => {
  return !basket.includes(id) ? `<div id="${id}" class="btn btn-primary add">Add to basket${id}</div>` : `<div id="${id}" class="btn btn-danger remove">Remove from basket</div>`
}

let basket = JSON.parse(localStorage.getItem("basket")) || []

function shopInit () {
  let laptopsData = localStorage.getItem("laptops")
  if (!laptopsData) {
    laptopsData = localStorage.setItem("laptops", JSON.stringify(laptops))
  }
  laptopsData = JSON.parse(laptopsData)
  let basket = JSON.parse(localStorage.getItem("basket")) || []
  for (id in laptopsData) {
      $(".row").append(`<div id="${id}" class="col">
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${laptops[id].img}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          ${!basket.includes(id) ? `<div id="${id}" class="${id} btn btn-primary add">Add to basket${id}</div>` : `<div id="${id}" class="${id} btn btn-danger remove">Remove from basket</div>`}
        </div>
      </div>
    </div>`)
  }
}

function addToBasket (a) {
  console.log('add')
  console.log(a)
  $(".add").on("click", function () {
    let id = $(this).attr("id")
    if (!basket.includes(id)) basket.push(id)
    localStorage.setItem("basket", JSON.stringify(basket))
    // console.log($(`.${id}`))
    $(`.${id}`).replaceWith(btnType(basket, id))
    removeFromBasket('a')
  })
}

function removeFromBasket (a) {
  console.log(a)
  console.log('remove')
  $(".remove").on("click", function () {
    let id = $(this).attr("id")
    basket.splice(basket.indexOf(id), 1)
    localStorage.setItem("basket", JSON.stringify(basket))
    // console.log($(`.${id}`))
    $(`.${id}`).replaceWith(btnType(basket, id))
    addToBasket('b')
  })
}

$(document).ready(() => {
  shopInit()
  addToBasket()
  removeFromBasket()
})