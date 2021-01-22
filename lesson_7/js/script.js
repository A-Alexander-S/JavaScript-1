



const CATALOG = document.querySelector('#catalog');
let cardArray = CATALOG.getElementsByClassName('card');

//Объект с товарами
let PRODUCT = {
    iphoneSe: {
        id: "0",
        picture: "../img/se.jpg",
        product_price: "40000",

    },
    headPhones: {
        id: 1,
        picture: "../img/headPhones.jpg",
        product_price: "1000",

    },
    lenovoTab: {
        id: "2",
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
        cards.insertAdjacentHTML(`beforeend`, `<div><p id="product_price"></p><a href="#" class="catalog__btn" data-id="">В корзину</a></div>`);

    }
};
generationCatalog(arrayProduct.length);

console.log(arrayProduct);
// console.log(arrayProduct.find((item, index) =>
//     item.id == 0
// ));
// let rezalt = arrayProduct.find((item) => item.id == 0);
// console.log(rezalt);
// console.log(rezalt.picture);

// console.log(arrayProduct.find(function (item) {
//     item.id == 0
//     return item;
// }));








// console.log(arrayProduct[0].picture);
// console.log(arrayProduct.length);

//Наполняем карточки контентом
for (let i = 0; i < arrayProduct.length; i++) {
    cardArray[i].querySelector('img').style = 'background: url(' + arrayProduct[i].picture + ') 0 0/contain no-repeat;';
    cardArray[i].querySelector('p').innerHTML = 'Цена ' + arrayProduct[i].product_price + ' рублей';
    cardArray[i].querySelector('a').dataset.id = arrayProduct[i].id;
}

//Создаем корзину
document.querySelector('.content').insertAdjacentHTML('beforeend', '<div class="basket"></div>');
let basket = document.querySelector('.basket');
// basket.innerHTML = 'Корзина пуста';
basket.insertAdjacentHTML('afterbegin', `<p>Корзина пуста</p>
                                         <a href='#' class = 'open-basket'>Открыть корзину</a>      
                                        `);

//Массив для подсчета цены корзины(закидываем товар)
let sumMoney = [];

//Навешиваем события
for (let btn of CATALOG.querySelectorAll('a')) {
    btn.addEventListener('click', countPrice);
}

//Функция удаления товара
function deleteProductFromBasket(e) {
    let elemBasketDelete = e.target.closest('.basket__card__product');

    countBasketPrice(elemBasketDelete.querySelector('img').getAttribute('data-id'));
    elemBasketDelete.remove();
}

//Функция закидывает цену товара в массив
function countPrice(event) {
    // sumMoney.push(event.target.getAttribute('data-id'));
    let NumberIdProduct = event.target.getAttribute('data-id');
    sumMoney.push(arrayProduct.find(item => item.id == NumberIdProduct));




    countBasketPrice();
    // console.log(event.target.closest('.card'));
    // console.log(event.target.closest('.card').querySelector('img'));



    //Вычленяем имя продукта 
    let address = event.target.closest('.card').querySelector('img').style.background;
    let arrAdressSplit = address.split('');
    let nameProduct = arrAdressSplit.slice(12, arrAdressSplit.indexOf('.', 12));

    console.log(nameProduct.join(''));
    //Получаем цену


    //Вставляем картинку
    basket.insertAdjacentHTML('beforeend', `<div class = 'basket__card__product'>
                                                <img src="img/big/${nameProduct.join("") + '_big_0.jpg'}" class='basket__picture' data-id=${NumberIdProduct} ></img>
                                                <p>${nameProduct.join('')}</p>
                                                <p class='basket-price__product'>${event.target.closest('.card').querySelector('p').textContent}</p>
                                                <button class="basket-btn__delete">Удалить</button>
                                            </div>`);

    for (let elem of document.querySelectorAll('.basket-btn__delete')) {
        elem.addEventListener('click', deleteProductFromBasket)
    };

}

//Функция подсчета цены корзины товара и выведение
function countBasketPrice(deletingPrice = undefined) {

    console.log(sumMoney);

    //Ищем товар который нужно удалить по нашему пользовательскому атрибуту data-id
    let indexDelete = sumMoney.findIndex(item => item.id == deletingPrice);
    if (indexDelete >= 0) {
        sumMoney.splice(indexDelete, 1);
    }

    console.log(sumMoney);



    basket.firstChild.innerHTML = '';
    let scope = 0;
    for (let price of sumMoney) {
        scope += +price.product_price;
    }
    return basket.insertAdjacentHTML('afterbegin', `<p>В корзине: ${sumMoney.length} товаров на сумму ${scope} рублей.</p>`);
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

    // получили номер id товара
    // event.target.closest('.card').querySelector('a').getAttribute('data-id');
    // // console.log(event.target.closest('.card').querySelector('a').getAttribute('data-id'));

    // //получили объект товара со всеми значениями
    // let objPoduct = arrayProduct.find(item => item.id == event.target.closest('.card').querySelector('a').getAttribute('data-id'));
    // // console.log(arrayProduct.find(item => item.id == event.target.closest('.card').querySelector('a').getAttribute('data-id')));
    // console.log(objPoduct);




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
    // console.log(document.getElementById('modal-img'));
    document.getElementById('modal-img').src = event.target.getAttribute('src');
}
//Делаем модальный аккордеон

function showAccordeonWrapper(e) {
    document.querySelector('.accordeon-wrapper').style.display = 'block';
    // sumMoney
    document.querySelector('.composition-basket').innerHTML = '';
    for (let item of sumMoney) {
        document.querySelector('.composition-basket').insertAdjacentHTML('beforeend', `<div>
                                                                                            
                                                                                                 <img class= "img_basket-modal" src="${item.picture}"></img>
                                                                                                <p>Цена ${item.product_price} рублей</p>
                                                                                         
                                                                                    </div>`);
    }

}

document.querySelector('.open-basket').addEventListener('click', showAccordeonWrapper);







console.log(document.querySelector('.basket').getElementsByClassName('basket__card__product'));

document.querySelector('body').insertAdjacentHTML('afterbegin', `<div class='accordeon-wrapper'>
                                                                    <div class='accordeon-section'>
                                                                        <div class='accordeon-header  '>
                                                                            Header 1

                                                                        </div>
                                                                        <div class='accordeon-body composition-basket opened'>
                                                                            Body 1
                                                                        </div>
                                                                    </div>
                                                                    <div class='accordeon-section'>
                                                                        <div class='accordeon-header '>
                                                                            Header 2
                                                                        </div>
                                                                        <div class='accordeon-body delivery-address '>
                                                                            Body 2
                                                                        </div>
                                                                    </div>
                                                                    <div class='accordeon-section'>
                                                                        <div class='accordeon-header '>
                                                                            Header 3
                                                                        </div>
                                                                        <div class='accordeon-body comment'>
                                                                            Body 3
                                                                        </div>
                                                                    </div>
                                                                    <div class="close-modal-basket" ></div>
                                                                </div>`);

function closeModalBasket(e) {
    document.querySelector('.accordeon-wrapper').style.display = 'none';
}
document.querySelector('.close-modal-basket').addEventListener('click', closeModalBasket);

// +function () {
//     document.querySelector('.accordeon-section').classList.add("opened");

//     document.querySelector('.accordeon-section').forEach(function (section) {
//         section.addEventListener('click', function (e) {
//             e.target.closest('.accordeon-section').classList.add("opened")
//         })
//     })
// }();
function heightSection(e) {
    console.log(e.target.closest('.accordeon-section').querySelector('.accordeon-body'));

}
document.querySelector('.accordeon-body').addEventListener('click', heightSection);




