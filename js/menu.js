$(document).ready(function () {
  const database = firebase.database();
  const beforeQuery = database.ref("menu/");

  /*************************************
NOTIFICATIONS
***********************************/
  const notifications = (message) => {
    if (message == "fillall") {
      $(".fillall").fadeIn(1000);

      setTimeout(function () {
        $(".fillall").fadeOut(1000);
      }, 3500);
    }
    if (message == "inserted successfully") {
      $(".inserted").fadeIn(1000);

      setTimeout(function () {
        $(".inserted").fadeOut(1000);
      }, 3500);
    }
    if (message == "updated") {
      $(".updated").fadeIn(1000);

      setTimeout(function () {
        $(".updated").fadeOut(1000);
      }, 3500);
    }
  };

  /*************************************
ADDING NEW DISHES 
***********************************/

  $("[name=submit]").click(function (e) {
    e.preventDefault();

    const category = $("[name=category]").val(),
      title = $("[name=title]").val(),
      price = $("[name=price]").val(),
      image = $("[name=image]").val().slice(12),
      newid = beforeQuery.push();
    /**    console.log(category);
         console.log(title);
         console.log(price);
         console.log(image);**/

    if (!title || !price || !image) {
      notifications("fillall");
    } else {
      newid.set(
        {
          category: category,
          title: title,
          price: price,
          image: "img/" + image,
        },
        function (error) {
          if (!error) {
            notifications("inserted successfully");
            $("[name=title]").val("");
            $("[name=price]").val("");
            $("[name=image]").val("");
          } else {
            console.log("not saved");
          }
        }
      );
    }
  });

  /*************************************
 SELECTING MENU FROM DATABASE 
***********************************/

  beforeQuery.on("value", function success(data) {
    if (data) {
      let starter = "",
        dessert = "",
        brunch = "",
        drink = "";

      $.each(data.val(), function (key, value) {
        let id = key,
          category = value["category"],
          title = value["title"],
          price = value["price"],
          image = value["image"];

        if (category == "starter") {
          starter += `<div class="product-box">
                            <div id = ${key} > 
                            <img class ="image" src=${image} >
                            <div class = "title">${title}</div><hr>
                            <div class = "price">${parseFloat(price).toFixed(
                              2
                            )} RS</div><hr>
                            <div data-id = ${key} class="delete"></div>
                            
                            </div>
                            </div>`;
        } else if (category == "dessert") {
          dessert += `<div class="product-box">
                            <div id = ${key} >
                            <img class ="image" src=${image} >
                            <div class = "title">${title}</div><hr>
                            <div class = "price">${parseFloat(price).toFixed(
                              2
                            )} RS</div><hr>
                            <div data-id=${key} class="delete"></div>
                            
                            </div>
                            </div>`;
        } else if (category == "brunch") {
          brunch += `<div class="product-box">
                            <div id = ${key} >
                            <img class ="image" src=${image} >
                            <div class = "title">${title}</div><hr>
                            <div class = "price">${parseFloat(price).toFixed(
                              2
                            )} RS</div><hr>
                            <div data-id=${key} class="delete"></div>
                            
                            </div>
                            </div>`;
        } else if (category == "drink") {
          drink += `<div class="product-box">
                        <div id = ${key} >
                        <img class ="image" src=${image} >
                        <div class = "title">${title}</div><hr>
                        <div class = "price">${parseFloat(price).toFixed(
                          2
                        )} RS</div><hr>
                        <div data-id=${key} class="delete"></div>
                        
                        </div>
                        </div>`;
        } else {
        }
      });

      $(".starter").html(starter);
      $(".dessert").html(dessert);
      $(".brunch").html(brunch);
      $(".drink").html(drink);

      /********************
     DELETING FROM DATABASE

      ***********************/
      $(".delete").click(function () {
        let thekey = $(this).data("id");
        beforeQuery.child(thekey).remove();
      });
    }
  });
});
