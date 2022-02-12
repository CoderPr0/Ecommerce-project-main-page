// Picture variables
const bigImages = document.querySelectorAll('.product-big>img')
const smallImages = document.querySelectorAll('.product-small>img')
const scrolls = document.querySelectorAll('.scroll')


// Nav variables
const cartIcon = document.querySelector('.cart-icon')


// Card variables
const itemName = document.querySelector('.card > h1')
const priceNow = document.querySelector('.price-now')
const prePrice = document.querySelector('.pre-price')
const quantityBtn = document.querySelectorAll('.quantity-btns > div')
const itemNumber = document.querySelector('.quantity-btns > p')
const addBtn = document.querySelector('.cart-addition button')


// Cart variables
const cart = document.querySelector('.cart')
const emptyCart = document.querySelector('.cart > p')
const cartBox = document.querySelector('.inCart')



// Picture scrolling
smallImages.forEach(product =>{
    const smallBox = document.querySelector('.product-small')

    product.addEventListener("click", ()=>{
        let index = [...smallBox.children].indexOf(product)
        bigImages.forEach(image=>{
            image.classList.remove("active")
        })
        bigImages[index].classList.add("active")
    })
})

scrolls.forEach((direction)=>{
    direction.addEventListener('click', ()=>{
        const bigBox = document.querySelector('.product-big')
        
        const offset = direction.classList.contains('next') === true ? 1 : -1
        const activeImage = document.querySelector('.active')
        let index = [...bigBox.children].indexOf(activeImage) + offset
        activeImage.classList.remove('active')

        if(index >= bigImages.length) index = 0
        if(index < 0) index = bigImages.length -1
        
        bigImages[index].classList.add('active')
    })
})


// show cartbox
cartIcon.addEventListener('click', ()=>{
    if(cartBox.classList.contains('active-cart') == true){
        cartBox.classList.remove('active-cart')
    }else{
        cartBox.classList.add('active-cart')
    }
})


// Item quantity
let newNumber = 0

quantityBtn.forEach((btn)=>{
    const addition = btn.classList.contains('plus') === true ? 1 : -1

    btn.addEventListener('click', ()=>{
        if(itemNumber.innerHTML == 0 && addition == -1){
            return
        }else{
            newNumber = newNumber + addition
            itemNumber.innerHTML = newNumber
        }
    })
})


// Add to cart
addBtn.addEventListener('click', ()=>{
    if(itemNumber.innerHTML !== "0"){
        emptyCart.classList.add('hidden')

        const div = document.createElement('div')
        cart.append(div)

        bigImages.forEach(product=>{
            if(product.classList.contains('active') == true){
                const source = product.getAttribute('src')

                const item = document.createElement('img')
                item.setAttribute('src', source)
                item.classList.add('item-pic')
                div.append(item)
            }
        })

        const p1 = document.createElement('p')
        p1.innerHTML = itemName.innerHTML
        div.append(p1)

        const p2 = document.createElement('p')
        p2.innerHTML = `${priceNow.innerHTML} x ${itemNumber.innerHTML} `
        div.append(p2)

        const span = document.createElement('span')
        span.innerHTML = prePrice.innerHTML
        p2.append(span)

        const trash = document.createElement('img')
        trash.setAttribute('src', 'images/icon-delete.svg')
        trash.classList.add('trash')
        div.append(trash)

        const button = document.createElement('button')
        button.innerHTML = "Checkout"
        div.append(button)
    }
})