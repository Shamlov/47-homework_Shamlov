const btn = document.querySelector('button')
const colorName = document.querySelector('#colorName')
const type = document.querySelector('#type')
const code = document.querySelector('#code')

let colorArr = []    // храним массив всех цветов   


btn.addEventListener('click', btnclick ) // клик по кнопке
function btnclick() {
    formVerification()
    
}

function formVerification() {    // проверка формы и запись в массив . не могу составить регулярки в проверках
    let data = {}        // получаем данные из формы
    let status1 = false
    let status2 = false
    ////// проверяем и записываем имя цвета
    let nameMatchBoolean = true  // совпадение имени цвета  
    colorArr.forEach((el)=> {
        if(el.colorName == `${colorName.value}`) {
            nameMatchBoolean = false
        }
    })
    // console.log(/\D/gi.test(`${colorName.value}`))   //тут верно если одновременно и буквы и циыры. но как сделать ложным если встечается хоть одна цифра
    if(/^\D/gi.test(`${colorName.value}`) && nameMatchBoolean) {
        document.querySelector('#colorNameLabel').classList.remove('invalid-field')
        data.colorName = `${colorName.value}`
        status1 = true
    } else {
        document.querySelector('#colorNameLabel').classList.add('invalid-field')
    }
    /////////проверяем формат и введеные значения формата///////////////////////////////
    if(type.value == 'rgb' && /./gi.test(`${code.value}`)) {     // тут проблема с регуляркой . не могу составить. пишу только цифры
        data.type ='rgb'
        data.code = `${code.value}`
        status2 = true
    }

    if(type.value == 'rgba' && /./gi.test(`${code.value}`)) {     // тут проблема с регуляркой . не могу составить. пишу только цифры
        data.type ='rgba'
        data.code = `${code.value}`
        status2 = true
    }

    if(type.value == 'hex' && /./gi.test(`${code.value}`)) {     // тут проблема с регуляркой . не могу составить. пишу только цифры
        data.type ='hex'
        data.code = `${code.value}`
        status2 = true
    } else 

    if(status2) {
        document.querySelector('#codeLabel').classList.remove('invalid-field')
    } else {
        document.querySelector('#codeLabel').classList.add('invalid-field')
    }

    if(status2 && status1) {    // если оба условия выполнены . запишем в массив
        colorArr.push(data)
        colorName.value = ''
        code.value = ''
        addingСard()
    }
}

let paletteBlock = document.querySelector('#paletteBlock')

function addingСard() {
    let div = document.createElement('div') 
    div.className = 'color-cards'
    let a = colorArr.slice(-1)[0].type
    let b = ((colorArr.slice(-1)[0].code))
    if(colorArr.slice(-1)[0].type == 'hex') {
        a = ''
        b = colorArr.slice(-1)[0].code
        div.style.cssText = `background-color: ${a} ${b}`
    } else {
        div.style.cssText = `background-color: ${a}(${b})`
    }
    paletteBlock.prepend(div)
    div.innerHTML  = `
    <div class="color-card">
        <div class="card-name">
            <p>${colorArr.slice(-1)[0].colorName}</p>
            <p>${colorArr.slice(-1)[0].type}</p>
            <p>${colorArr.slice(-1)[0].code}</p>
        </div>
    </div>
    `
}

