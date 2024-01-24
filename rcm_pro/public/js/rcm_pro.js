$(document).ready(async function () {
  let dataMenu = await frappe.db.get_list("Rcm Menu", {
    fields: ["name", "title", "parent_rcm_menu", "path"],
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

  function renderTree(treeData, container, id = null, level = 1) {
    let ul = $("<ul>").attr({ id: "section-" + id, class: "nested-" + level });
    treeData.forEach(function (item) {
      let li = $("<li>")
        .text(item.path ? "" : item.title)
        .attr({
          class: level > 1 ? "collapseButton" : "",
          "data-target": "section-" + item.name,
        });
      if (item.path) {
        let link = $("<a>")
          .text(item.title)
          .attr("href", "/app/" + item.path);
        li.append(link);
      }
      if (item.children.length > 0) {
        renderTree(item.children, li, item.name, level + 1);
      }
      ul.append(li);
    });
    container.append(ul);
  }

  $(".nested-3").hide();
  $(".collapseButton").click(function () {
    let targetSection = $(this).data("target");
    $("#" + targetSection).toggle();
  });
});
