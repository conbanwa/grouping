var rtree = $.fn.zTree.getZTreeObj("demoright");
var ltree = $.fn.zTree.getZTreeObj("demoleft");

const rMenu = $("#rMenu");
var setting = {
    view: {
        fontCss: getFont
    },
    edit: {
        enable: true,
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onDrag: ondrag,
        onDrop: ondrop,
        beforeDrop: beforeDrop,
        onRightClick: OnRightClick,
        // beforeCheck: savemember,
        // beforeClick: savemember,
        // beforeCollapse: savemember,
        // beforeDblClick: savemember,
        // beforeDrag: savemember,
        // beforeDragOpen: savemember,
        // beforeEditName: savemember,
        // beforeExpand: savemember,
        // beforeMouseDown: savemember,
        // beforeMouseUp: savemember,
        // beforeRemove: savemember,
        // beforeRename: savemember,
        onCheck: savemember,
        onRemove: savemember,
        onRename: savemember,
    }
};
var settingblue = setting
settingblue.view.fontCss = blueFont

rend()

function rend() {
    let id = ($("#selects").val());
    z(id)
    app.set("current", id)
    if (app.get(id) == null) {
        app.set(id, {
            out: allmember,
            in: armyteam
        })
    } else {
        console.log(app.get(id))
    }
    $.fn.zTree.init($("#demoright"), settingblue, app.get(id).out);
    $.fn.zTree.init($("#demoleft"), setting, app.get(id).in);
    ltree = $.fn.zTree.getZTreeObj("demoleft");
    rtree = $.fn.zTree.getZTreeObj("demoright");
}

function getFont(treeId, node) {
    return node.font ? node.font : {};
}

function blueFont(treeId, node) {
    return node.font ? node.font : { 'color': 'darkgreen' };
}

function resetTree() {
    hideRMenu();
    $.fn.zTree.init($("#demoright"), setting, []);
    // thistree = $.fn.zTree.getZTreeObj("demoright");
    app.set("armyteam", armyteam)
    addTreeNode(armyteam)
}

function savemember(event, treeId, treeNode) {
    hideRMenu();
    // z(ltree.getNodes())
    app.set(app.get("current"), { out: rtree.getNodes(), in: ltree.getNodes() })
}

function beforeDrop(treeId, treeNodes) {
    for (let i = 0; i < treeNodes.length; i++) {
        let pid = treeNodes[i].parentTId
        if (treeId == 'demoright' && treeNodes[i].t == true) {
            alert("已禁止向部队放入编组")
            return false;
            // } else if (
            //     // treeId == 'demoleft' &&
            //     treeNodes[i].t == false) {
            //     treeNodes[i].platoon = [pid, rtree.getNodeByTId(pid).name]
        } else {
            // let tree = (pid.indexOf("demoright") > -1) ? rtree : ltree;
            treeNodes[i].platoon = [pid || treeNodes[i].tId.split("_")[0], tidnode(pid) ? tidnode(pid).name : '作战力量']
            if (treeNodes[i].tId.indexOf("demoright") > -1 && treeNodes[i].t == false) {
                treeNodes[i].origion = [pid || treeNodes[i].tId.split("_")[0], rtree.getNodeByTId(pid) ? rtree.getNodeByTId(pid).name : '作战力量']
                z(treeNodes[i].tId, " 写入m_origion", treeNodes[i].origion)
            }

        }
    }
    return true
}

function tidnode(tid) {
    if (!tid) return null
    let tree = tid.indexOf("demoright") > -1 ? rtree : ltree;
    return tree.getNodeByTId(tid)
}

function ondrag(treeId, treeNodes) {
    for (var i = 0, l = treeNodes.length; i < l; i++) {
        if (treeNodes[i].drag === false) {
            return false;
        }
    }
    savemember()
    return true;
}

function ondrop(treeId, treeNodes, targetNode, moveType) {
    // z(treeId, treeNodes, targetNode, moveType)
    savemember()
    return targetNode ? targetNode.drop !== false : true;
}

function clearall() {
    var r = confirm("将初始化所有数据，此操作不可恢复!");
    if (r == true) {
        wx.clearStorage()
        rend()
    }
}