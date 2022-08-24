if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else{
    ready()
}
function ready(){
    var removeCartItemButton = document.getElementsByClassName('remove')
    
    for (var i = 0; i < removeCartItemButton.length; i++){
        var button = removeCartItemButton[i]
        button.addEventListener('click', removeCartitem)
          
           
    }
    
    var quantityInputs = document.getElementsByClassName('quantity')
    for ( var i = 0 ; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('cart')
    for ( var i = 0 ; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('purchase')[0].addEventListener('click', purchaseClicked)

    const cartContainer = document.querySelector(".container");
const cartIcon  = document.querySelector(".carticon");

cartIcon.addEventListener("click", () => {
    const visibility = cartContainer.getAttribute("data-visible")
    if (visibility === "false") {
        cartContainer.setAttribute("data-visible", true);
    } else if(visibility === "true"){
        cartContainer.setAttribute("data-visible", false)
    }
})

}

function purchaseClicked(){
    alert("Thank You For Your Purchase")
    var cartItems = document.getElementsByClassName('cartsec')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updatedCartTotal()
}


function removeCartitem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updatedCartTotal()
}
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value)|| input.value <= 0){
        input.value = 1
    }
    updatedCartTotal()
}

function addToCartClicked(event){
    var button=event.target
    var cartItem = button.parentElement.parentElement
    var title = cartItem.getElementsByClassName('title')[0].innerText
    var price = cartItem.getElementsByClassName('price')[0].innerText
    var imgsrc = cartItem.getElementsByClassName('itemsimg')[0].src
    console.log(title, price, imgsrc)
    addToCart(title, price, imgsrc)
    updatedCartTotal()
    updateNotify()
}


function addToCart(title, price, imgsrc){
    var cartRow = document.createElement('div')
    
    var cartItems = document.getElementsByClassName('cartsec')[0]
    var cartItemNames = cartItems.getElementsByClassName('title')
    var cartNotice = document.getElementsByClassName('notify')
    for (var i = 0; i < cartItemNames.length; i++ ){
        if (cartItemNames[i].innerText == title) {
            alert("something has happned ")
            return
        }  
        
      cartNotice.innerText = '5'
    }
    var cartrowContents = 
    `
    <div class= "cartitems"> 
    <img src= "${imgsrc}" width="70px" height="70px" class="cartimg">
    <p class="title">${title}</p>
    <p class="price">${price}</p>
    <input type="number" value="1" class="quantity" />
    <button class="remove">Remove</button>
    </div>    
    `
    cartRow.innerHTML = cartrowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('remove')[0].addEventListener('click', removeCartitem)
    cartRow.getElementsByClassName('quantity')[0].addEventListener('change', quantityChanged)

  
}
function updatedCartTotal(){
    var CartItemContainer = document.getElementsByClassName('cartsec')[0]
        var CartItems = document.getElementsByClassName('cartitems')
        var total = 0
        for ( var i = 0; i < CartItems.length; i++){
            var CartItem = CartItems[i]
            var priceElement = CartItem.getElementsByClassName('price')[0]
            var quantityElement = CartItem.getElementsByClassName('quantity')[0]
            var price = parseFloat(priceElement.innerText.replace('N',''))
            var quantity = quantityElement.value
            total =total + (price * quantity)
            
        }
        total = Math.round(total * 100) /100
        document.getElementsByClassName('total')[0].innerText = 'Total: '+'N' + total
       
        console.log('pitch')
    
}

