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
          <span class="sidebar-item-label">Accounting Masters<span>
          <span class="sidebar-item-icon"><svg class="icon icon-xs"><use href="#es-line-down"></use></svg></span>
        </a>
      </div>

      <div class="sidebar-child-item nested-container" id="section1">
        
        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/company" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Company<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/account" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Chart of Accounts<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/accounts-settings" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Accounts Settings<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/fiscal-year" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Fiscal Year<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/accounting-dimension" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Accounting Dimension<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/finance-book" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Finance Book<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/accounting-period" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Accounting Period<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/payment-term" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Payment Term<span>
            </a>
          </div>
        </div>

      </div>
    </div>

    <div class="sidebar-item-container">

      <div class="desk-sidebar-item standard-sidebar-item collapseButton"  data-target="section2">
        <a href="#" class="item-anchor block-click">
          <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-accounting"></use></svg></span>
          <span class="sidebar-item-label">General Ledger<span>
          <span class="sidebar-item-icon"><svg class="icon icon-xs"><use href="#es-line-down"></use></svg></span>
        </a>
      </div>

      <div class="sidebar-child-item nested-container"  id="section2">
       
        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/journal-entry" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Journal Entry<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/journal-entry-template" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Journal Entry Template<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/query-report/General Ledger" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">General Ledger<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/query-report/Customer Ledger Summary" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Customer Ledger Summary<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/query-report/Supplier Ledger Summary" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Supplier Ledger Summary<span>
            </a>
          </div>
        </div>

      </div>

    </div>

    <div class="sidebar-item-container">
      
      <div class="desk-sidebar-item standard-sidebar-item collapseButton"  data-target="section3">
        <a href="#" class="item-anchor block-click">
          <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-accounting"></use></svg></span>
          <span class="sidebar-item-label">Accounts Receivable<span>
          <span class="sidebar-item-icon"><svg class="icon icon-xs"><use href="#es-line-down"></use></svg></span>
        </a>
      </div>

      <div class="sidebar-child-item nested-container"  id="section3">

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/sales-invoice" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Sales Invoice<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/customer" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Customer<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
          <div class="desk-sidebar-item standard-sidebar-item">
            <a href="/app/payment-entry" class="item-anchor block-click">
              <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
              <span class="sidebar-item-label">Payment Entry<span>
            </a>
          </div>
        </div>

        <div class="sidebar-item-container">
        <div class="desk-sidebar-item standard-sidebar-item">
          <a href="/app/payment-request" class="item-anchor block-click">
            <span class="sidebar-item-icon"><svg class="icon icon-md"><use href="#icon-primitive-dot"></use></svg></span>
            <span class="sidebar-item-label">Payment Request<span>
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
