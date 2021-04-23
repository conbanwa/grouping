var zTree, rMenu, otree, itree;
var armyteam = app.initcache('armyteam', armyteaminit);
var allmember = app.initcache('allmember', memberinit);
// app.initcache('struct', structinit);
app.initcache('current', "unselect");
// $(document).ready(function() {
//     $.fn.zTree.init($("#treeDemo1"), setting);
//     $.fn.zTree.init($("#treeDemo2"), setting);
//     // resetTree()
// });


function resetTree() {
    hideRMenu();
    $.fn.zTree.init($("#treeDemo"), setting, []);
    zTree = $.fn.zTree.getZTreeObj("treeDemo");
    rMenu = $("#rMenu");
    app.set("armyteam", armyteam)
    addTreeNode(armyteam)
}