armyteaminit.forEach(a => {
    a.t = true
    if (a.pId == 0) {
        a.icon = "./img/army.jpg"
        a.font = { 'font-weight': 'bolder' }
    } else {
        a.icon = "./img/team.jpg"
        a.font = { 'color': 'midnightblue' }
    }
});
memberinit.forEach(a => {
    a.t = false
    if (a.pId == 0) {
        a.font = { 'font-weight': 'bold', 'color': 'darkgreen' }
    } else {
        a.font = { 'color': 'darkgreen' }
    }
});
var zTree, menutype;
var armyteam = app.initcache('armyteam', armyteaminit);
var allmember = app.initcache('allmember', memberinit);
// app.initcache('struct', structinit);
app.initcache('current', "unselect");
//     $.fn.zTree.init($("#demoright"), setting);
//     $.fn.zTree.init($("#demoleft"), setting);
//     // resetTree()

function beforeDrag(treeId, treeNodes) {
    savemember()
    return false;
}

function onClick(event, treeId, treeNode, clickFlag) {
    z(treeNode.tId + " [ " + " onClick ]&nbsp;&nbsp;clickFlag = " + clickFlag + " (" + (clickFlag === 1 ? "普通选中" : (clickFlag === 0 ? "<b>取消选中</b>" : "<b>追加选中</b>")) + ")");
    // rend(treeNode.tId)
}
var thistree = $.fn.zTree.getZTreeObj("demoright");

function OnRightClick(event, treeId, treeNode) {
    thistree = $.fn.zTree.getZTreeObj(treeId);
    if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        thistree.cancelSelectedNode();
        showRMenu("root", event.clientX, event.clientY, treeId);
    } else if (treeNode && !treeNode.noR) {
        thistree.selectNode(treeNode);
        menunode = thistree.getSelectedNodes()[0];
        showRMenu("node", event.clientX, event.clientY, treeId);
    }
}
let menunode

function showRMenu(type, x, y, treeId) {
    menutype = type
    $("#rMenu ul").show();
    if (type == "root") {
        $("#m_del").hide();
        $("#m_check").hide();
        $("#m_unCheck").hide();
        $(".m_child").hide();
        $("#m_restore").hide();
        $("#m_origion").hide();
    } else {
        $("#m_del").show();
        $("#m_check").show();
        $("#m_unCheck").show();
        $(".m_child").show();
        if (did("platoon")) {
            $("#m_restore").hide();
        } else {
            $("#m_restore").show();
        }
        if (did("origion")) {
            $("#m_origion").hide();
        } else if (menunode.origion[0] == (menunode.platoon ? menunode.platoon[0] : 'nosuch')) {
            $("#m_origion").hide();
        } else {
            $("#m_origion").show();
        }

        function did(pl_or) {
            if (menunode && menunode[pl_or]) {
                let origion = menunode[pl_or][0]
                let pid = menunode.parentTId || menunode.tId.split("_")[0]
                return (origion == pid)
            }
            return true
        }
    }
    $("#m_add").show();
    if (treeId == "demoright") $("#m_add").hide();

    y += document.body.scrollTop;
    x += document.body.scrollLeft;
    rMenu.css({
        "top": y + "px",
        "left": x + "px",
        "visibility": "visible"
    });

    $("body").bind("mousedown", onBodyMouseDown);
}

function hideRMenu() {
    if (rMenu) rMenu.css({
        "visibility": "hidden"
    });
    $("body").unbind("mousedown", onBodyMouseDown);
}

function onBodyMouseDown(event) {
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
        rMenu.css({
            "visibility": "hidden"
        });
    }
}
var addCounts = 1;
var addCount = 1;
var addCoun = 1;

function restore(pl_or) {
    try {
        let pid = menunode[pl_or][0]
        let tree = (pid.indexOf("demoright") > -1) ? rtree : ltree;
        if (pid == menunode.tId) {
            pid = null
        }
        let nowtree = menunode.tId ? ((menunode.tId.indexOf("demoright") > -1) ? rtree : ltree) : ltree;
        let parent = tree.getNodeByTId(pid)
        z(pid, parent)
        if (
            pid ? (pid.indexOf("_") > -1) : true &&
            !parent) {
            parent = nowtree.getNodeByParam("name", menunode[pl_or][1], null) || rtree.getNodeByParam("name", menunode[pl_or][1], null) || ltree.getNodeByParam("name", menunode[pl_or][1], null);
            if (!parent) {
                alert(pid + menunode[pl_or][1] + " 未找到父节点");
                return
            }
        }
        z(menunode, parent)
        let newNode = menunode
            // delete newNode.id
            // delete newNode.tId
            // delete newNode.pId
            // delete newNode.parentTId
        nowtree.removeNode(menunode);
        tree.addNodes(parent, newNode);
        savemember()
    } catch (error) {
        x(menunode, error)
        alert(menunode + "撤销失败！")
    }
}

// function origion() {
//     try {
//         let pid = menunode.origion[0]
//         let tree = (pid.indexOf("demoright") > -1) ? rtree : ltree;
//         let nowtree = (menunode.tId.indexOf("demoright") > -1) ? rtree : ltree;
//         let parent = tree.getNodeByTId(pid)
//         if (pid.indexOf("_") > -1 && !parent) {
//             z(pid, "未找到父节点")
//             return
//         }
//         tree.addNodes(parent, menunode);
//         nowtree.removeNode(menunode);
//         savemember()
//     } catch (error) {
//         x(error)
//         alert("还原失败！")
//     }
// }

function addTreeNode(newNode = {
    name: menutype == 'root' ? ("编组" + (addCounts++)) : ("小编组" + (addCount++)),
    icon: menutype == 'root' ? "./img/army.jpg" : "./img/team.jpg",
    font: menutype == 'root' ? { 'font-weight': 'bolder' } : { 'color': 'midnightblue' },
    t: true
}) {
    if (thistree.getSelectedNodes()[0]) {
        newNode.checked = thistree.getSelectedNodes()[0].checked;
        thistree.addNodes(thistree.getSelectedNodes()[0], newNode);
    } else {
        thistree.addNodes(null, newNode);
    }
    savemember()
}

function addteam(newNode = { name: "部队" + (addCoun++) }) {
    if (thistree.getSelectedNodes()[0]) {
        newNode.checked = thistree.getSelectedNodes()[0].checked;
        thistree.addNodes(thistree.getSelectedNodes()[0], newNode);
    } else {
        thistree.addNodes(null, newNode);
    }
    savemember()
}

function removeTreeNode() {
    var nodes = thistree.getSelectedNodes();
    if (nodes && nodes.length > 0) {
        if (nodes[0].children && nodes[0].children.length > 0) {
            var msg = "要删除的节点是父节点，如果删除将连同子节点一起删掉。\n\n请确认！";
            if (confirm(msg) == true) {
                thistree.removeNode(nodes[0]);
            }
        } else {
            thistree.removeNode(nodes[0]);
        }
    }
    savemember()
}


function expandNode(type) {
    nodes = thistree.getSelectedNodes();
    if (type.indexOf("All") < 0 && nodes.length == 0) {
        switch (type) {
            case 'expandSon':
                thistree.expandAll(true);
                break;
            case 'collapseSon':
                thistree.expandAll(false);
                break;
        }
    }

    if (type == "expandAll") {
        thistree.expandAll(true);
    } else if (type == "collapseAll") {
        thistree.expandAll(false);
    } else {
        var callbackFlag = $("#callbackTrigger").attr("checked");
        for (var i = 0, l = nodes.length; i < l; i++) {
            thistree.setting.view.fontCss = {};
            if (type == "expand") {
                thistree.expandNode(nodes[i], true, null, null, callbackFlag);
            } else if (type == "collapse") {
                thistree.expandNode(nodes[i], false, null, null, callbackFlag);
            } else if (type == "toggle") {
                thistree.expandNode(nodes[i], null, null, null, callbackFlag);
            } else if (type == "expandSon") {
                thistree.expandNode(nodes[i], true, true, null, callbackFlag);
            } else if (type == "collapseSon") {
                thistree.expandNode(nodes[i], false, true, null, callbackFlag);
            }
        }
    }
    savemember()
}

function checkTreeNode(checked) {
    var nodes = thistree.getSelectedNodes();
    if (nodes && nodes.length > 0) {
        thistree.checkNode(nodes[0], checked, true);
    }

    app.set("armyteam", thistree.getNodes())
}


function initTree() {

    $.fn.zTree.init($("#treeDemo"), setting, []);
    thistree = $.fn.zTree.getZTreeObj("treeDemo");
    rMenu = $("#rMenu");
    app.set("armyteam", armyteaminit)
    addTreeNode(armyteaminit)
}