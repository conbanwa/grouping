armyteaminit.forEach(a => {
    if (a.pId == 0) {
        // a.icon = "./img/teams.jpg"
        a.font = { 'font-weight': 'bold' }
    } else {
        a.icon = "./img/team.jpg"
        a.font = { 'font-weight': 'bold' }
    }
});
memberinit.forEach(a => {
    a.font = { 'color': 'blue' }
    if (a.pId == 0) {
        a.font = { 'font-weight': 'bold', 'color': 'blue' }
    }
});
var zTree, otree, itree;
var armyteam = app.initcache('armyteam', armyteaminit);
var allmember = app.initcache('allmember', memberinit);
// app.initcache('struct', structinit);
app.initcache('current', "unselect");
// $(document).ready(function() {
//     $.fn.zTree.init($("#treeDemo1"), setting);
//     $.fn.zTree.init($("#treeDemo2"), setting);
//     // resetTree()
// });

const rMenu = $("#rMenu");

function resetTree() {
    hideRMenu();
    $.fn.zTree.init($("#treeDemo1"), setting, []);
    // thistree = $.fn.zTree.getZTreeObj("treeDemo1");
    app.set("armyteam", armyteam)
    addTreeNode(armyteam)
}