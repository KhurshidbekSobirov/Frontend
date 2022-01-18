const son = document.querySelector('.son');

const belgi = document.querySelector('.belgi');

const raqam = document.querySelector('.raqam');

const kopaytirish = document.querySelector('.kopaytirish');

const ayrish = document.querySelector('.ayrish');

const qoshish = document.querySelector('.qoshish');

const bolish = document.querySelector('.bolish');

const qoldiq = document.querySelector('.qoldiq');

const daraja = document.querySelector('.daraja');

const katta = document.querySelector('.katta');

const kichik = document.querySelector('.kichik');




const info_p = document.querySelector('.p')



kopaytirish.addEventListener('click', function () {

    let inp_natija = son.value * raqam.value

      info_p.innerHTML = (inp_natija)

} )


ayrish.addEventListener('click', function () {

    let inp_natija = son.value - raqam.value

      info_p.innerHTML = (inp_natija)

} )

qoshish.addEventListener('click', function () {

    let inp_natija = Number(son.value) + Number(raqam.value)

    info_p.innerHTML = (eval(inp_natija))

} )

bolish.addEventListener('click', function () {

    let inp_natija = son.value / raqam.value

      info_p.innerHTML = (inp_natija)

} )

qoldiq.addEventListener('click', function () {

    let inp_natija = son.value % raqam.value

      info_p.innerHTML = (eval("inp_natija"))

} )

daraja.addEventListener('click', function () {

    let inp_natija = son.value ** raqam.value

      info_p.innerHTML = (inp_natija)

} )

katta.addEventListener('click', function () {

    let inp_natija = son.value > raqam.value

      info_p.innerHTML = (inp_natija)

} )

kichik.addEventListener('click', function () {

    let inp_natija = son.value < raqam.value

      info_p.innerHTML = (inp_natija)

} )