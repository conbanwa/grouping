var zTree, rMenu, otree, itree;
var armyteam = app.initcache('armyteam', armyteaminit);
var allmember = app.initcache('allmember', memberinit);
// app.initcache('struct', structinit);
app.initcache('current', "unselect");
$(document).ready(function() {
    $.fn.zTree.init($("#treeDemo1"), settingCheck);
    $.fn.zTree.init($("#treeDemo2"), settingCheck);
    otree = $.fn.zTree.getZTreeObj("treeDemo1");
    itree = $.fn.zTree.getZTreeObj("treeDemo2");
    resetTree()
});

function resetTree() {
    hideRMenu();
    $.fn.zTree.init($("#treeDemo"), setting, []);
    zTree = $.fn.zTree.getZTreeObj("treeDemo");
    rMenu = $("#rMenu");
    app.set("armyteam", armyteam)
    addTreeNode(armyteam)
}

function rend(id) {
    app.set("current", id)
    if (app.get(id) == null) {
        app.set(id, {
            out: allmember,
            in: []
        })
    }
    console.log(app.get(id))
    $.fn.zTree.init($("#treeDemo1"), settingCheck, app.get(id).out);
    $.fn.zTree.init($("#treeDemo2"), settingCheck, app.get(id).in);
}

function saveteam(event, treeId, treeNode) {
    app.set("armyteam", zTree.getNodes())
}

function savemember(event, treeId, treeNode) {
    app.set(app.get("current"), { out: otree.getNodes(), in: itree.getNodes() })
}