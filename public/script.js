var $shoppingCart = $(".shopping-cart");
var $cartList = $(".cart-list");
// an array with all of our cart items

//local storage id
  var STORAGE_ID = 'shoppingcart';

//local storage functions
  var saveToLocalStorage = function () {
  localStorage.setItem(STORAGE_ID, JSON.stringify(cart));
  }

  var getFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
  }

  var cart = getFromLocalStorage();

/*
You should not have to touch the html file at all. 
If you find you want to make changes to it then stop, think and discuss what you are doing with your partner.
Add a remove button beside each item in the cart and remove that item from the cart when it's clicked. 
Update the total accordingly.
Don't allow "duplications" in the cart, but instead tally the number of each item like this:
*/
var updateCart = function () {
  // TODO: Write this function. In this function we render the page.
  // Meaning we make sure that all our cart items are displayed in the browser.
  // Remember to empty the "cart div" before you re-add all the item elements.
  $cartList.empty();
  var source = $('#cart-template').html();
  var template = Handlebars.compile(source);
  var newHTML = template({
          cart: cart
        });
  $cartList.append(newHTML);
  totalPrice = 0;
  for(i=0;i<cart.length;i++){
    totalPrice+=cart[i].price*cart[i].tally;
  }
  $(".total").html(totalPrice);
  saveToLocalStorage();
}


var addItem = function (item) {
  //add items to cart array
  for(i=0;i<cart.length;i++){
    if(cart[i].name === item.name){
      cart[i].tally += 1;
      cart[i].totalPrice = cart[i].price*Number(cart[i].tally);
      return true;
    }

  }
  cart.push({
    "name": item.name,
    "price": Number(item.price),
    "tally": 1,
    "totalPrice": item.price
  })
  saveToLocalStorage();
}

var clearCart = function () {
  //empty the shopping cart
  $cartList.empty()
  cart = [];
  total=0;
  $(".total").html(total);
  saveToLocalStorage();
}

var removeItem = function (item) {
  for(i=0;i<cart.length;i++) {
    if(cart[i].tally > 1 && cart[i].name === item[0].dataset.name){
      cart[i].tally--;
      cart[i].totalPrice = cart[i].price*Number(cart[i].tally);
      updateCart();
      return true;
    } else if (cart[i].tally === 1 && cart[i].name === item[0].dataset.name){
      cart.splice(i,1);
      updateCart();
      return true;
    }
  } 
  saveToLocalStorage();
}

$(".cart-list").on("click",".glyphicon", function () {
  deleteItem = $(this).parent();
  removeItem(deleteItem);
})

$('.view-cart').on('click', function () {
  //display shopping cart on click
  $shoppingCart.toggleClass('show');
});

$('.row').on('click', '.add-to-cart', function () {
  //get the "item" object from the page
  $shoppingCart.toggleClass('show',true);
  newItem = $(this).closest(".item").data();
  addItem(newItem);
  updateCart();
});

$('.clear-cart').on('click', function () {
  clearCart();
});

// update the cart as soon as the page loads!
updateCart();
