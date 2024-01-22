$(document).ready(async function () {
  // let data = await frappe.db.get_value("workspace", "Accounting", ["*"]);
  // if (data && data.message) {
  //   let contentList = data.message.content
  //     ? JSON.parse(data.message.content)
  //     : [];
  //   const cards = contentList.filter((card) => card.type == "card");
  //   console.log("cards ", cards);
  //   debugger;
  let appendData = $(`
    <div class="standard-sidebar-label" style="margin:5px">
			<span class="section-title">Custom Menu<span>
		</div>

    <div class="sidebar-item-container">
      
      <div class="desk-sidebar-item standard-sidebar-item collapseButton" data-target="section1">
        <a href="#" class="item-anchor block-click">
          <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-accounting"></use></svg></span>
          <span class="sidebar-item-label">All Masters<span>
          <span class="sidebar-item-icon"><svg class="icon icon-xs"><use href="#es-line-down"></use></svg></span>
        </a>
      </div>

      <div class="sidebar-child-item nested-container" id="section1">
        
        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/plants" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Plants<span>
            </a>
          </div>
        </div>


      </div>
    </div>

    <div class="sidebar-item-container">

      <div class="desk-sidebar-item standard-sidebar-item collapseButton"  data-target="section2">
        <a href="#" class="item-anchor block-click">
          <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-accounting"></use></svg></span>
          <span class="sidebar-item-label">Sales<span>
          <span class="sidebar-item-icon"><svg class="icon icon-xs"><use href="#es-line-down"></use></svg></span>
        </a>
      </div>

      <div class="sidebar-child-item nested-container"  id="section2">
       
        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/customer" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Customers<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/quotation" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Quotations<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/sales-order" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Sales Order<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/Scheduling" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Scheduling<span>
            </a>
          </div>
        </div>

      </div>

    </div>

    <div class="sidebar-item-container">
      
      <div class="desk-sidebar-item standard-sidebar-item collapseButton"  data-target="section3">
        <a href="#" class="item-anchor block-click">
          <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-accounting"></use></svg></span>
          <span class="sidebar-item-label">Custom<span>
          <span class="sidebar-item-icon"><svg class="icon icon-xs"><use href="#es-line-down"></use></svg></span>
        </a>
      </div>

      <div class="sidebar-child-item nested-container"  id="section3">

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/rcm-customer" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Customers<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/rcm-quotation" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Quotations<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/rcm-order" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Orders<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
        <div class="desk-sidebar-item standard-sidebar-item">
          <a href="/app/rcm-Scheduling" class="item-anchor block-click">
            <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
            <span class="sidebar-item-label">Scheduling<span>
          </a>
        </div>
      </div>

      <div class="sidebar-item-container">
        <div class="desk-sidebar-item standard-sidebar-item">
          <a href="/app/payment-reconciliation" class="item-anchor block-click">
            <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
            <span class="sidebar-item-label">Payment Reconciliation<span>
          </a>
        </div>
      </div>

      <div class="sidebar-item-container">
        <div class="desk-sidebar-item standard-sidebar-item">
          <a href="/app/query-report/Accounts Receivable" class="item-anchor block-click">
            <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
            <span class="sidebar-item-label">Accounts Receivable<span>
          </a>
        </div>
      </div>

      <div class="sidebar-item-container">
        <div class="desk-sidebar-item standard-sidebar-item">
          <a href="/app/query-report/Accounts Receivable Summary" class="item-anchor block-click">
            <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
            <span class="sidebar-item-label">Accounts Receivable Summary<span>
          </a>
        </div>
      </div>

      <div class="sidebar-item-container">
        <div class="desk-sidebar-item standard-sidebar-item">
          <a href="/app/query-report/Sales Register" class="item-anchor block-click">
            <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
            <span class="sidebar-item-label">Sales Register<span>
          </a>
        </div>
      </div>

      <div class="sidebar-item-container">
      <div class="desk-sidebar-item standard-sidebar-item">
        <a href="/app/query-report/Item-wise Sales Register" class="item-anchor block-click">
          <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
          <span class="sidebar-item-label">Item-wise Sales Register<span>
        </a>
      </div>
    </div>

    <div class="sidebar-item-container">
    <div class="desk-sidebar-item standard-sidebar-item">
      <a href="/app/query-report/Sales Order Analysis" class="item-anchor block-click">
        <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
        <span class="sidebar-item-label">Sales Order Analysis<span>
      </a>
    </div>
  </div>

  <div class="sidebar-item-container">
  <div class="desk-sidebar-item standard-sidebar-item">
    <a href="/app/query-report/Delivered Items To Be Billed" class="item-anchor block-click">
      <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
      <span class="sidebar-item-label">Delivered Items To Be Billed<span>
    </a>
  </div>
</div>


      </div>

    </div>
  `);
  $(".desk-sidebar").each(function () {
    $(this).append(appendData);
  });
  // }

  $(".nested-container").hide();
  $(".collapseButton").click(function () {
    let targetSection = $(this).data("target");
    $("#" + targetSection).toggle();
  });
});
