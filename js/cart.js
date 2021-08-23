var restauarants = document.getElementById("restaurantsList");

$(document).ready(function () {
  const database = firebase.database();
  const beforeQuery = database.ref("menu/");
  const beforecartQuery = database.ref("orders/");

  /*************************************
 SELECTING Restaurants FROM DATABASE 
***********************************/
  database.ref("Restaurants/").on("value", function getRestaurant(data) {
    if (data) {
      document.getElementById("filerRestaurantHide").style.display = "block";
      let restaurantName = "";

      let rList = "";
      $.each(data.val(), function (key, value) {
        let rId = key,
          rName = value["restaurantName"];

        let forKey = rName.replace(/\s/g, "");
        // console.log(rName);

        rList += `
          <button id="resFilter" class="filter-btn btn btn-success current" type="button" data-id=${forKey}>${rName}</button>
        `;
      });
      $("#restaurantsList").html(rList);
    }
  });

  /*************************************
 SELECTING MENU FROM DATABASE 
***********************************/
  $(document).on("click", "#resFilter", function () {
    var resValue = $(this).attr("data-id");
    console.log("Clicked", resValue);

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
            image = value["image"],
            restauName = value["restaurant"];
          restauName = restauName.replace(/\s/g, "");

          if (category == "starter" && resValue == restauName) {
            document.getElementById("idStarter").style.display = "block";
            document.getElementById("idStarters").style.display = "block";
            starter += `
            <div class="product-box">
                            <div id = ${key} > 
                            <img class ="image" src=${image} >
                            <div class = "title">${title}</div><hr>
                            <div class = "price">
                            ${parseFloat(price).toFixed(2)}
                            RS</div><hr>
                            <div class="add-to-cart" data-id= ${key}><img class="cart-icon" src="img/cart.png"></div>
                            </div>
                            </div>
                            `;
          } else if (category == "dessert" && restauName == resValue) {
            document.getElementById("idDessert").style.display = "block";
            document.getElementById("idDesserts").style.display = "block";
            dessert += `<div class="product-box">
                            <div id = ${key} >
                            <img class ="image" src=${image} >
                            <div class = "title">${title}</div><hr>
                            <div class = "price">
                            ${parseFloat(price).toFixed(2)}
                            RS</div><hr>
                            <div class="add-to-cart" data-id= ${key}><img class="cart-icon" src="img/cart.png"></div>
                            </div>
                            </div>`;
          } else if (category == "brunch" && restauName == resValue) {
            document.getElementById("idBrunch").style.display = "block";
            document.getElementById("idBrunchs").style.display = "block";
            brunch += `<div class="product-box">
                            <div id = ${key} >
                            <img class ="image" src=${image} >
                            <div class = "title">${title}</div><hr>
                            <div class = "price"> 
                            ${parseFloat(price).toFixed(2)} RS</div><hr>
                            <div class="add-to-cart" data-id= ${key}><img class="cart-icon" src="img/cart.png"></div>
                            </div>
                            </div>`;
          } else if (category == "drink" && restauName == resValue) {
            document.getElementById("idDrink").style.display = "block";
            drink += `<div class="product-box">
                        <div id = ${key} >
                        <img class ="image" src=${image} >
                        <div class = "title">${title}</div><hr>
                        <div class = "price">${parseFloat(price).toFixed(
                          2
                        )} RS</div><hr>
                        <div class="add-to-cart" data-id= ${key}><img class="cart-icon" src="img/cart.png"></div>
                        </div>
                        </div>`;
          } else {
          }
        });

        document.getElementById("starters").innerHTML = starter;
        document.getElementById("desserts").innerHTML = dessert;
        document.getElementById("brunchs").innerHTML = brunch;
        document.getElementById("drinks").innerHTML = drink;
        //   $(".dessert").html(dessert);
        //   $(".brunch").html(brunch);
        //   $(".drink").html(drink);

        /********************
      ADD TO CART

      ***********************/

        $(".add-to-cart").click(function () {
          let thekey = $(this).data("id");

          let title = $(`#${thekey} > .title`).text(),
            price = $(`#${thekey} > .price`).text(),
            slice = price.lastIndexOf("0");
          price = price.slice(0, slice);

          let appenddata = `<tr>
                                <td class="carttitle">${title}</td>
                                <td class="cartprice">${parseFloat(
                                  price
                                ).toFixed(2)} RS</td>
                                <td class="removeme">X</td>
                                </tr>`;
          $(".cart").append(appenddata);
        });

        $(".cart-toggle").click(function () {
          $(".cart-container").slideToggle();
        });

        $(document).on("click", ".removeme", function () {
          $(this).parent().remove();
        });

        $(document).on("click", ".removeme,.cart-icon", function () {
          total();
          let totalrows = $(".cartprice").length,
            itemcounter = $(".totalitems");
          itemcounter.fadeOut("slow", function () {
            $(this).html(totalrows).fadeIn("slow");
          });
        });

        /************************
     CALCULATING TOTAL
     ************************ */

        const total = () => {
          let allcartproducts = $(".cartprice"),
            total = 0;

          for (let x = 0; x < allcartproducts.length; x++) {
            var getprice = $(".cartprice").eq(x).text();
            total += parseInt(getprice);
          }

          $(".total").text(`Total : ${parseFloat(total).toFixed(2)} RS`);

          if (total > 1) {
            $(".send-order").slideDown();
          } else {
            $(".send-order").slideUp();
          }

          return total;
        };

        /****************************
SENDING ORDERS TO DB 
*******************************/

        $(document).on("click", ".send-order", function () {
          var ordereditems = [];
          let totalrows = $(".cartprice").length;

          for (let x = 0; x < totalrows; x++) {
            var items = {
              item: $(".carttitle").eq(x).text(),
              price: $(".cartprice").eq(x).text(),
            };

            ordereditems.push(items);
          }

          let newid = beforecartQuery.push();
          newid.set(
            {
              products: ordereditems,
              total: total(),
              table: Math.floor(Math.random() * 10),
            },
            function (error) {
              if (!error) {
                $(".removeme").click();
                $(".cart").append(
                  '<tr><td colspan="3">Order Sent Successfully</td></tr>'
                );
                window.location.reload();
                setTimeout(function () {
                  $(".cart-toggle").click();
                }, 2500);
              }
            }
          );
        });
      } else {
        console.log("No data found");
      }
    });
  });
});
