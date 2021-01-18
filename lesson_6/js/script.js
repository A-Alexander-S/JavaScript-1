



const CATALOG = document.querySelector('#catalog');
let cardArray = CATALOG.getElementsByClassName('card');

//Объект с товарами
let PRODUCT = {
    iphoneSe: {
        picture: "../img/se.jpg.webp",
        product_price: "40000",
    },
    headPhones: {
        picture: "../img/headPhones.jpg",
        product_price: "1000",
    },
    lenovoTab: {
        picture: "../img/lenovoTab.jpg",
        product_price: "10000",
    },
};
let arrayProduct = Object.values(PRODUCT);

//Функция генерирующая HTML разметку
function generationCatalog(numberCards) {
    for (; numberCards >= 0; numberCards--) {

        //Создаем колонки
        let catalog__column = document.createElement('div');
        catalog__column.setAttribute('class', 'catalog__column');
        CATALOG.append(catalog__column);

        //Создаем в колонках карточки
        let cards = document.createElement('div');
        cards.setAttribute('class', 'card');
        catalog__column.append(cards);

        //Наполняем карточки основными элементами
        let catalog__img = document.createElement('div');
        catalog__img.setAttribute('class', 'card');

        //...
        cards.insertAdjacentHTML('beforeend', `<img style="" class="img__card">`);
        cards.insertAdjacentHTML(`beforeend`, `<div><p id="product_price"></p><a href="#" class="catalog__btn" data-value="">В корзину</a></div>`);

    }
};
generationCatalog(arrayProduct.length);

// console.log(arrayProduct);
// console.log(arrayProduct[0].picture);
// console.log(arrayProduct.length);

//Наполняем карточки контентом
for (let i = 0; i < arrayProduct.length; i++) {
    cardArray[i].querySelector('img').style = 'background: url(' + arrayProduct[i].picture + ') 0 0/contain no-repeat;';
    cardArray[i].querySelector('p').innerHTML = 'Цена ' + arrayProduct[i].product_price + ' рублей';
    cardArray[i].querySelector('a').dataset.value = arrayProduct[i].product_price;
}

//Создаем корзину
document.querySelector('.content').insertAdjacentHTML('beforeend', '<div class="basket"></div>');
let basket = document.querySelector('.basket');
basket.innerHTML = 'Корзина пуста';

//Массив для подсчета цены корзины(закидываем товар)
let sumMoney = [];

//Навешиваем события
for (let btn of CATALOG.querySelectorAll('a')) {
    btn.addEventListener('click', countPrice);
}

//Функция закидывает цену товара в массив
function countPrice(event) {
    // console.log(event.target);
    sumMoney.push(event.target.getAttribute('data-value'));
    // console.log(event.target.getAttribute('data-value'));
    // console.log(sumMoney);
    countBasketPrice([...sumMoney]);
}

//Функция подсчета цены корзины товара и выведение
function countBasketPrice(BasketPrice) {
    console.log(BasketPrice);
    basket.innerHTML = '';
    let scope = 0;
    for (let price of BasketPrice) {
        scope += +price;
    }
    return basket.innerHTML = `В корзине: ${BasketPrice.length} товаров на сумму ${scope} рублей.`;
}

//Модальное окно
document.querySelector('.content').insertAdjacentHTML('beforeend', '<div id="modal_window" style="display:none;" >\
                                                                        <div id="close_modal" ></div>\
                                                                        <img id="modal-img" src="">\
                                                                        <div id="big_gallery">\
                                                                        </div>\
                                                                    </div>');
//Событие на крестик, закрывающее модальное окно
document.querySelector('#close_modal').addEventListener('click', function closeModal(e) {
    document.querySelector('#modal_window').style = 'display:none;';
});

//Навешиваем события на картинки
for (let elem of document.getElementsByClassName('img__card')) {
    elem.addEventListener('click', showModal);
}

function showModal(event) {
    let address = event.target.style.background;

    //Разбиваем на символы адрес картинки
    let arrAdressSplit = address.split('');
    // console.log(arrAdressSplit.slice(0, 12));
    // console.log(arrAdressSplit.indexOf('.', 12));

    //Ищем имя картинки в адресе картинки
    let nameProduct = arrAdressSplit.slice(12, arrAdressSplit.indexOf('.', 12));
    // console.log(nameProduct.join(''));
    document.querySelector('#modal_window').style = 'display:block;';
    document.querySelector('#modal-img').src = '../img/big/' + nameProduct.join('') + '_big' + '_0' + '.jpg';
    document.getElementById('big_gallery').innerHTML = '';
    //Вставляем набор картинок для галереи в модальном окне
    document.getElementById('big_gallery').insertAdjacentHTML('beforeend', `<img class="modal-img__small" src="../img/big/${nameProduct.join('')}_big_0.jpg">
                                                                            <img class="modal-img__small" src="../img/big/${nameProduct.join('')}_big_1.jpg">
                                                                            <img class="modal-img__small" src="../img/big/${nameProduct.join('')}_big_2.jpg">
                                                                            <img class="modal-img__small" src="../img/big/${nameProduct.join('')}_big_3.jpg">
                                                                            `);
    //навешиваем события на кртинки в галерее
    let arrGalleryImg = document.getElementById('big_gallery').children;
    for (let item of arrGalleryImg) {
        item.addEventListener('click', showBigPicture);
    }
}

//Функция перелистывающая картинки в модальном окне
function showBigPicture(event) {
    event.target.getAttribute('src');
    console.log(document.getElementById('modal-img'));
    document.getElementById('modal-img').src = event.target.getAttribute('src');
}



