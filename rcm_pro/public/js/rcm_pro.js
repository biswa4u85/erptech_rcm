$(document).ready(async function () {
  let dataMenu = await frappe.db.get_list("Rcm Menu", {
    fields: ["name", "title", "parent_rcm_menu", "path", "is_group"],
    filters: {},
  });
  let treeData = buildTree(dataMenu);
  renderTree(treeData, $(".desk-sidebar"));

  function buildTree(data) {
    let tree = [];
    let lookup = {};
    data.forEach(function (item) {
      lookup[item.name] = item;
      item.children = [];
    });
    data.forEach(function (item) {
      if (item.parent_rcm_menu !== null) {
        lookup[item.parent_rcm_menu].children.push(item);
      } else {
        tree.push(item);
      }
    });
    return tree;
  }

  function renderTree(treeData, container, level = 1) {
    let ul = $("<ul>").attr({ class: level > 2 ? "hidden" : "" });
    treeData.forEach(function (item) {
      let li = $("<li>");
      let link = $("<a>")
        .text(item.title)
        .attr("href", "/app/" + item.is_group == 0 ? item.path : "")
        .click(function () {
          if (level > 1) {
            $(this).siblings("ul").toggleClass("hidden");
          }
        });
      if (item.children.length > 0) {
        if (level > 1) {
          let childLabels = `<span class="sidebar-item-icon" item-icon="getting-started">
          <svg class="icon icon-xs"><use href="#es-line-down"></use></svg>
          </span>`;
          link.append(childLabels);
        }
      }
      li.append(link);
      if (item.children.length > 0) {
        renderTree(item.children, li, level + 1);
      }
      ul.append(li);
    });
    container.append(ul);
  }
});
