// var setting = {
//     edit: {
//         enable: true,
//         editNameSelectAll: true
//     },
//     view: {
//         dblClickExpand: false
//     },
//     data: {
//         simpleData: {
//             enable: true
//         }
//     },
//     callback: {
//         onClick: onClick,
//         onRightClick: OnRightClick,
//         beforeDrag: beforeDrag,
//         onDrag: savemember,
//         onDrop: savemember,
//         beforeAsync: savemember,
//         beforeCheck: savemember,
//         beforeClick: savemember,
//         beforeCollapse: savemember,
//         beforeDblClick: savemember,
//         beforeEditName: savemember,
//         beforeExpand: savemember,
//         beforeRemove: savemember,
//         beforeRename: savemember,
//         onAsyncError: savemember,
//         onAsyncSuccess: savemember,
//         onCheck: savemember,
//         onCollapse: savemember,
//         onDblClick: savemember,
//         onDragMove: savemember,
//         onExpand: savemember,
//         onRemove: savemember,
//         onRename: savemember,
//     }
// };

function beforeDrag(treeId, treeNodes) {
    savemember()
    return false;
}

function onClick(event, treeId, treeNode, clickFlag) {
    z(treeNode.tId + " [ " + " onClick ]&nbsp;&nbsp;clickFlag = " + clickFlag + " (" + (clickFlag === 1 ? "普通选中" : (clickFlag === 0 ? "<b>取消选中</b>" : "<b>追加选中</b>")) + ")");
    // rend(treeNode.tId)
}
var thistree = $.fn.zTree.getZTreeObj("treeDemo1");

function OnRightClick(event, treeId, treeNode) {
    thistree = $.fn.zTree.getZTreeObj(treeId);
    if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        thistree.cancelSelectedNode();
        showRMenu("root", event.clientX, event.clientY);
    } else if (treeNode && !treeNode.noR) {
        thistree.selectNode(treeNode);
        showRMenu("node", event.clientX, event.clientY);
    }
}

function showRMenu(type, x, y) {
    $("#rMenu ul").show();
    if (type == "root") {
        $("#m_del").hide();
        $("#m_check").hide();
        $("#m_unCheck").hide();
    } else {
        $("#m_del").show();
        $("#m_check").show();
        $("#m_unCheck").show();
    }

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
var addCount = 1;

function addTreeNode(node = {
    name: "增加" + (addCount++)
}) {
    hideRMenu();
    var newNode = node;
    if (thistree.getSelectedNodes()[0]) {
        newNode.checked = thistree.getSelectedNodes()[0].checked;
        thistree.addNodes(thistree.getSelectedNodes()[0], newNode);
    } else {
        thistree.addNodes(null, newNode);
    }
    savemember()
}

function removeTreeNode() {
    hideRMenu();
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

function checkTreeNode(checked) {
    var nodes = thistree.getSelectedNodes();
    if (nodes && nodes.length > 0) {
        thistree.checkNode(nodes[0], checked, true);
    }
    hideRMenu();
    app.set("armyteam", thistree.getNodes())
}


function initTree() {
    hideRMenu();
    $.fn.zTree.init($("#treeDemo"), setting, []);
    thistree = $.fn.zTree.getZTreeObj("treeDemo");
    rMenu = $("#rMenu");
    app.set("armyteam", armyteaminit)
    addTreeNode(armyteaminit)
}