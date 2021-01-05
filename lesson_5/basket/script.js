

const HEADER = document.createElement(`header`);
HEADER.setAttribute(`class`, `heading`);

const WRAPP = document.querySelector(`.wrapper`);
const CATALOG = document.querySelector(`#catalog`);


WRAPP.insertBefore(HEADER, WRAPP.children[0]);

const FOOTER = document.createElement(`footer`);
WRAPP.appendChild(FOOTER);



//блок с классом = container (ограничивает ширину контентной части)
CATALOG.appendChild(document.createElement(`div`));
CATALOG.children[0].setAttribute(`class`, `container`);

//Создаем главный Flex - контэйнер
CATALOG.querySelector(`.container`).appendChild(document.createElement(`div`));
CATALOG.querySelector(`.container`).children[0].setAttribute(`class`, `catalog__flex`);

//Создаем 6 колонок
for (let i = 0; i < 6; i++) {
    CATALOG.querySelector(`.catalog__flex`).appendChild(document.createElement(`div`));
    CATALOG.querySelector(`.catalog__flex`).children[i].setAttribute(`class`, `catalog__column`);
}

//Создаем в колонках сами карточки товара
for (let i = 0; i < 6; i++) {
    CATALOG.querySelector(`.catalog__flex`).children[i].appendChild(document.createElement(`div`));
    CATALOG.querySelector(`.catalog__flex`).children[i].children[0].setAttribute(`class`, `catalog__item`);
}

//Создаем корзину
CATALOG.appendChild(document.createElement(`div`));
CATALOG.lastChild.className = `basket`;

//Наполняем карточки
for (let i = 0; i < 6; i++) {
    CATALOG.querySelector(`.catalog__flex`).children[i].children[0].appendChild(document.createElement(`img`));
    CATALOG.querySelector(`.catalog__flex`).children[i].children[0].children[0].setAttribute(`class`, `catalog__img`);



    CATALOG.querySelector(`.catalog__flex`).children[i].children[0].appendChild(document.createElement(`a`));
    CATALOG.querySelector(`.catalog__flex`).children[i].children[0].children[1].setAttribute(`class`, `catalog__btn`);



    CATALOG.querySelector(`.catalog__flex`).children[i].children[0].children[0].setAttribute(`id`, `i_btn_${i}`);
    CATALOG.querySelector(`.catalog__flex`).children[i].children[0].children[1].setAttribute(`id`, `c_btn_${i}`);
    CATALOG.querySelector(`.catalog__flex`).children[i].children[0].children[1].setAttribute(`href`, `#`);
    // CATALOG.querySelector(`.catalog__flex`).children[i].children[0].children[1].setAttribute(`onclick`, `countPrice()`);

    CATALOG.querySelector(`.catalog__flex`).children[i].children[0].children[1].innerHTML = `В КОРЗИНУ`;

    CATALOG.querySelector(`.catalog__flex`).children[i].children[0].appendChild(document.createElement(`p`));
    CATALOG.querySelector(`.catalog__flex`).children[i].children[0].children[2].setAttribute(`id`, `price_${i}`);


}

CATALOG.querySelector(`.catalog__flex`).children[0].children[0].children[2].innerHTML = `40000`;
CATALOG.querySelector(`.catalog__flex`).children[1].children[0].children[2].innerHTML = `1000`;
CATALOG.querySelector(`.catalog__flex`).children[2].children[0].children[2].innerHTML = `10000`;


//Функция закидывающая в массив цену товара
let iphoneSe = document.getElementById(`c_btn_0`);
let headPhones = document.getElementById(`c_btn_1`);
let tablet = document.getElementById(`c_btn_2`);


let basket_pr = CATALOG.querySelector(`.basket`);
basket_pr.innerHTML = "<p>Корзина пуста</p>";
let sumMoney = [];

function countBasketPrice(BasketPrice) {
    // console.log(BasketPrice);
    // console.log(BasketPrice.length);
    basket_pr.innerHTML = "";
    let scope = 0;
    // let BasketPrice = [];
    // BasketPrice.push(item1, item2, item3);
    for (let price of BasketPrice) {
        scope = scope + +price;
    }
    return basket_pr.innerHTML = `В корзине: ${BasketPrice.length} товаров на сумму ${scope} рублей`;
    // return scope;
}

function countPrice(_eventObj) {

    // console.log('_eventObj');
    let eventElement = _eventObj.target;
    // console.log(eventElement);
    let productPrice = eventElement.nextElementSibling;
    // console.log(productPrice.innerHTML);
    sumMoney.push(productPrice.innerHTML);
    // console.log(sumMoney);
    countBasketPrice([...sumMoney]);


}



iphoneSe.onclick = countPrice;
headPhones.onclick = countPrice;
tablet.onclick = countPrice;


// function Product(product, price) {
//     this.product = product;
//     this.price = price;
// }

// let iphoneSe = new Product(`iphoneSe`, 40000);
// let headPhones = new Product(`svenAp`, 1000);
// let tablet = new Product(`lenovoTab`, 10000);



// function countBasketPrice(item1, item2, item3) {
//     let scope = 0;
//     let BasketPrice = [];
//     BasketPrice.push(item1, item2, item3);
//     for (let price of BasketPrice) {
//         scope += price;
//     }
//     return scope;
// }

// console.log(`Цена вашей корзины покупок = ` + countBasketPrice(iphoneSe.price, headPhones.price, tablet.price));






