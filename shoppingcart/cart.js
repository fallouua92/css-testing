var basket = {
    hPdt : null, // This varibale is for the product list.
    hItems : null, // This varibale is for the shopping cart items
    items : {}, // This one is the current item in the shopping cart
    iURL : "Images/", // This varibale is for the imges 
    
    // This code is the localstorage cart
    save : function () {
      localStorage.setItem("cart", JSON.stringify(basket.items));
    },
  
   
    // This is for getting back items from the local storage
    
    load : function () {
      basket.items = localStorage.getItem("cart");
      if (basket.items == null) { basket.items = {}; }
      else { basket.items = JSON.parse(basket.items); }
    },
  
    // This function to to empty the cart
    empty : function () {
      if (confirm("Empty cart?")) {
        basket.items = {};
        localStorage.removeItem("cart");
        basket.list();
      }
    },
  
    init : function () {
     
      // This is a connection betwen the HTML ID and varible of this page
      basket.hPdt = document.getElementById("cart-products");
      basket.hItems = document.getElementById("cart-items");
  
      
   // I have created a new varible to save the details from the products page varible.
       basket.hPdt.innerHTML = "";
      let p, item, part;
      for (let id in productswebpets) {
     
        // This is creating an area to insert product items
        p = productswebpets[id];
        item = document.createElement("div");
        item.className = "p-item";
        basket.hPdt.appendChild(item);
  
        // This function is to add product images
        part = document.createElement("img");
        part.src = basket.iURL + p.img;
        part.className = "p-img";
        item.appendChild(part);
  
       
        // I have created a function here to put names
        part = document.createElement("div");
        part.innerHTML = p.name;
        part.className = "p-name";
        item.appendChild(part);
  
        
        // This one is to add the description to the product
        part = document.createElement("div");
        part.innerHTML = p.desc;
        part.className = "p-desc";
        item.appendChild(part);
  
       
        // This is the code to get the prices from the varible
        part = document.createElement("div");
        part.innerHTML = "£" + p.price;
        part.className = "p-price";
        item.appendChild(part);
  

        // This is the button to add items to the cart

        part = document.createElement("input");
        part.type = "button";
        part.value = "Add to Cart";
        part.className = "cart p-add";
        part.onclick = basket.add;
        part.dataset.id = id;
        item.appendChild(part);
      }
  
  
      // This is the loading from the previous
      basket.load();
  
  
      // The actual list of the cart items
      basket.list();
    },
  
   
    // This is the current list items in HTML file
    list : function () {
    
      // This one is to take out all the items from the cart
      basket.hItems.innerHTML = "";
      let item, part, pdt;
      let empty = true;
      for (let key in basket.items) {
        if(basket.items.hasOwnProperty(key)) { empty = false; break; }
      }
  
     
      // This one is to show that notthing inside the cart,it is completely empty
      if (empty) {
        item = document.createElement("div");
        item.innerHTML = "Cart is empty";
        basket.hItems.appendChild(item);
      }
  
      // This one is notify that we have the list itmes inside the cart
      else {
        let p, total = 0, subtotal = 0;
        for (let id in basket.items) {
          // ITEM
          // This code is going to put the ids of selected item and put in the cart sectiion.
          p = productswebpets[id];
          item = document.createElement("div");
          item.className = "c-item";
          basket.hItems.appendChild(item);
  
          // NAME
          // This code is going to put the name of the items in the cart sections.
          part = document.createElement("div");
          part.innerHTML = p.name;
          part.className = "c-name";
          item.appendChild(part);
  
     
          // This part is for creating a button for removing items from the cart
          part = document.createElement("input");
          part.type = "button";
          part.value = "X";
          part.dataset.id = id;
          part.className = "c-del cart";
          part.addEventListener("click", basket.remove);
          item.appendChild(part);
  
          // This showing how many items in the cart.
          part = document.createElement("input");
          part.type = "number";
          part.min = 0;
          part.value = basket.items[id];
          part.dataset.id = id;
          part.className = "c-qty";
          part.addEventListener("change", basket.change);
          item.appendChild(part);
  
          // This code is going to add the price of each item to the total
          subtotal = basket.items[id] * p.price;
          total += subtotal;
        }
  
        // This part is to show the total of price to all items
        item = document.createElement("div");
        item.className = "c-total";
        item.id = "c-total";
        item.innerHTML ="TOTAL: £" + total;
        basket.hItems.appendChild(item);
  
        // The empty button is going to ask a question when the customer click on the empty button
        item = document.createElement("input");
        item.type = "button";
        item.value = "Empty";
        item.addEventListener("click", basket.empty);
        item.className = "c-empty cart";
        basket.hItems.appendChild(item);
  
        // The checkout button where the customers can click.
        item = document.createElement("input");
        item.type = "button";
        item.value = "Checkout";
        item.addEventListener("click", basket.checkout);
        item.className = "c-checkout cart";
        basket.hItems.appendChild(item);
      }
    },
  
    // This function is going to add items into the cart
    add : function () {
      if (basket.items[this.dataset.id] == undefined) {
        basket.items[this.dataset.id] = 1;
      } else {
        basket.items[this.dataset.id]++;
      }
      basket.save();
      basket.list();
    },

    // This function is for changing the quantity
    change : function () {
    // this part is going to remove itmes
      if (this.value <= 0) {
        delete basket.items[this.dataset.id];
        basket.save();
        basket.list();
      }

      // This one is just to update the total
      else {
        basket.items[this.dataset.id] = this.value;
        var total = 0;
        for (let id in basket.items) {
          total += basket.items[id] * productswebpets[id].price;
          document.getElementById("c-total").innerHTML ="TOTAL: Â£" + total;
        }
      }
    },
  
    // (G) REMOVE ITEMS FROM CART
    // This function is for removing items from the cart
    remove : function () {
      delete basket.items[this.dataset.id];
      basket.save();
      basket.list();
    },
  
    // (H) CHECKOUT
    // This function is for the checkout and it will show on the top of the page when the customer click the checkout button.
    checkout : function () {
      alert("Thanks for shopping with us, hope to see you soon!");
  
      /*
      var data = new FormData();
      data.append('cart', JSON.stringify(cart.items));
      data.append('products', JSON.stringify(products));
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "SERVER-SCRIPT");
      xhr.onload = function(){ ... };
      xhr.send(data);
      */
    }
  };
  window.addEventListener("DOMContentLoaded", basket.init);