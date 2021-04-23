// var settingMember = {
//     edit: {
//         enable: true,
//         showRemoveBtn: false,
//         showRenameBtn: false
//     },
//     data: {
//         simpleData: {
//             enable: true
//         }
//     },
//     callback: {
//         beforeDrag: beforeDragMember,
//         beforeDrop: beforeDropMember
//     }
// };
var settingCheck = {
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onDrag: beforeDragMember,
        onDrop: beforeDropMember,
        beforeDrop: beforeDrop,
        beforeAsync: savemember,
        beforeCheck: savemember,
        beforeClick: savemember,
        beforeCollapse: savemember,
        beforeDblClick: savemember,
        beforeDrag: savemember,
        beforeDragOpen: savemember,
        beforeEditName: savemember,
        beforeExpand: savemember,
        beforeMouseDown: savemember,
        beforeMouseUp: savemember,
        beforeRemove: savemember,
        beforeRename: savemember,
        beforeRightClick: savemember,
        onAsyncError: savemember,
        onAsyncSuccess: savemember,
        onCheck: savemember,
        onClick: savemember,
        onCollapse: savemember,
        onDblClick: savemember,
        onDragMove: savemember,
        onExpand: savemember,
        onMouseDown: savemember,
        onMouseUp: savemember,
        onRemove: savemember,
        onRename: savemember,
        onRightClick: savemember
    },
    check: {
        enable: true
    },
};


function beforeDrop(treeId, treeNodes) {
    if (treeId == 'treeDemo') {
        return false;
    } else {
        return true
    }
}
function beforeDragMember(treeId, treeNodes) {
    for (var i = 0, l = treeNodes.length; i < l; i++) {
        if (treeNodes[i].drag === false) {
            return false;
        }
    }
    savemember()
    return true;
}

function beforeDropMember(treeId, treeNodes, targetNode, moveType) {
    z(treeId, treeNodes, targetNode, moveType)
    savemember()
    return targetNode ? targetNode.drop !== false : true;
}