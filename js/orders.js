$(function () {
  const database = firebase.database();
  const beforeQuery = database.ref("orders/");

  /************************
 SELECTING  ORDERS FROM DB
 *****************************/

  beforeQuery.on("value", function success(data) {
    if (data) {
      let orders = "";
      $.each(data.val(), function (key, value) {
        let order_number = key,
          order_total = value.total,
          total_products = value.products;

        orders += `<div class="order-id" id= ${order_number}>${order_number}
                        <span class="order-total">${order_total} $</span>
                   
                        <i class="fas fa-spinner orderIcon" id = "pending"></i> &nbsp;
                        <i class="far fa-check-circle orderIcon" id = "accepted"></i> &nbsp;
                       <i class="fas fa-truck orderIcon" id = "delivered"></i>
                        </div>
                       `;
      });
      document.getElementById("addOrders").innerHTML = orders;
      // $('.append-orders').html(orders);
    }
    // Move to Pending
    $("#pending").click(function () {
      let thekey = $(this).parent().attr("id");
      let dataPrice = $("order-total").text();
      let orderKey = (orderTotal = $(`#${thekey} > .order-total`).text());

      let appenddata = `<div class="order-id" >
      <span class="order-total">${thekey} $</span>
      ${orderKey}
                   
                        <i class="far fa-check-circle orderIcon" id = "accepted"></i> &nbsp;
                       <i class="fas fa-truck orderIcon" id = "delivered"></i>
                        </div>`;
      $("#pendingOrders").append(appenddata);

      $(document).on("click", "#pending", function () {
        $(this).parent().remove();
      });
    });

    //   Move to Accepted

    $("#accepted").click(function () {
      let thekey = $(this).parent().attr("id");
      let dataPrice = $("order-total").text();
      let orderKey = (orderTotal = $(`#${thekey} > .order-total`).text());

      let appenddata = `<div class="order-id" >
      <span class="order-total">${thekey} $</span>
      ${orderKey}
                   
                        <i class="fas fa-spinner orderIcon" id = "pending"></i> &nbsp;
                       <i class="fas fa-truck orderIcon" id = "delivered"></i>
                        </div>`;
      $("#acceptedOrders").append(appenddata);

      $(document).on("click", "#accepted", function () {
        $(this).parent().remove();
      });
    });

    //   Move to Delivered

    $("#delivered").click(function () {
      let thekey = $(this).parent().attr("id");
      let dataPrice = $("order-total").text();
      let orderKey = (orderTotal = $(`#${thekey} > .order-total`).text());

      let appenddata = `<div class="order-id" >
      <span class="order-total">${thekey} $</span>
      ${orderKey}
                   
                        <i class="fas fa-spinner orderIcon" id = "pending"></i> &nbsp;
                       <i class="fas fa-truck orderIcon" id = "delivered"></i>
                        </div>`;
      $("#deliveredOrders").append(appenddata);

      $(document).on("click", "#delivered", function () {
        $(this).parent().remove();
      });
    });
  });
});
