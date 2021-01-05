

let wrap = document.querySelector(`.wrapper`);

let div1 = document.createElement(`div`);
// wrap.appendChild(div1);
div1.className = `container`;
wrap.insertBefore(div1, wrap.children[1]);

let table_chess = document.createElement(`table`);
div1.insertBefore(table_chess, div1.children[1]);
table_chess.className = `list`;



let heading = document.createElement(`tr`);



for (let i = 0; i < 10; i++) {
    table_chess.appendChild(document.createElement(`tr`));

};

for (let i = 0; i < 10; i++) {
    table_chess.rows[i].className = `line`;
}

let element = document.querySelectorAll(`.line`);
for (let i = 0; i < 10; i++) {
    for (j = 0; j < 10; j++) {
        table_chess.rows[i].appendChild(document.createElement(`td`));
    }
}

for (let i = 0; i < 10; i++) {
    for (j = 0; j < 10; j++) {
        table_chess.rows[i].cells[j].className = `cel`;
    }
}
table_chess.rows[0].className = `line b_dell`;
table_chess.rows[9].className = `line b_dell`;

for (let i = 1; i <= 8; i++) {
    if (i % 2 == 0) {
        for (let j = 1; j <= 7; j += 2) {
            table_chess.rows[i].cells[j].style.background = `#79553D`;
        }
    } else {
        for (let j = 2; j <= 8; j += 2) {
            table_chess.rows[i].cells[j].style.background = `#79553D`;
        }
    };
}


function figuresCol_1() {
    let j = 8;
    for (let i = 1; i <= 8; i++) {
        if (j >= 1) {
            table_chess.rows[i].cells[0].innerHTML = `<h1>${j}</h1>`;
        }
        j--;
    }
}
figuresCol_1();

function figuresCol_2() {
    let j = 8;
    for (let i = 1; i <= 8; i++) {
        if (j >= 1) {
            table_chess.rows[i].cells[9].innerHTML = `<h1>${j}</h1>`;
        }
        j--;
    }
}
figuresCol_2();




let _lettersBottom = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`];
function figuresRowBottom(_lettersBottom) {
    let j = 0;
    for (let i = 1; i <= 8; i++) {
        if (j <= 8) {
            table_chess.rows[9].cells[i].innerHTML = `<h1>${_lettersBottom[j]}</h1>`;
        }
        j++;
    }
}
figuresRowBottom(_lettersBottom);


let _lettersTop = [`ɐ`, `q`, `ɔ`, `p`, `ǝ`, `ɟ`, `ƃ`, ` ɥ`];
function figuresRowTop(_lettersTop) {
    let j = 0;
    for (let i = 1; i <= 8; i++) {
        if (j <= 8) {
            table_chess.rows[0].cells[i].innerHTML = `<h1>${_lettersTop[j]}</h1>`;
        }
        j++;
    }
}
figuresRowTop(_lettersTop);

