function outport(w) {
    let l1 = "    │      "
    let text = ""
    ltree.getNodes().forEach(e => nest(e, -1));
    text = text.replace(/）（/g, "，").replace(/    │          └──── (.*)/g, "    │          └──── $1\n    │  ")
    if (w) {
        text = '<h1 align="center">情报侦察力量编组</h1><br/>' + text.replace(/\n/g, "<br/>").replace(/ /g, "&ensp;")
        $("#wordexport").html(text)
        $("#wordexport").wordExport("导出结果");
        $("#wordexport").hide();
    } else {
        var funDownload = function(content, filename) {
            var eleLink = document.createElement('a');
            eleLink.download = filename;
            eleLink.style.display = 'none';
            // 字符内容转变成blob地址
            var blob = new Blob([content]);
            eleLink.href = URL.createObjectURL(blob);
            // 触发点击
            document.body.appendChild(eleLink);
            eleLink.click();
            // 然后移除
            document.body.removeChild(eleLink);
        };
        if ('download' in document.createElement('a')) {
            funDownload(text, '导出结果.txt');
        } else {
            alert('浏览器不支持');
        }
    }

    function nest(n, t) {
        t++
        if (n.level == 0 && n.isLastNode) { l1 = "           " };
        text += n.t ? teamname(n.name, t, n.isLastNode) : membername(n.origion, n.name, t)
            // if (n.pId != null) {
            //     let members = app.get(n.tId)
            //     if (members && members.in) {
            //         let l = members.in.length
            //         if (l) {
            //             for (i = 0; i < l; i++) {
            //                 text += teamname(members.in[i].name, t)
            //                 let mc = members.in[i].children
            //                 if (mc) {
            //                     for (let i = 0, l = mc.length; i < l; i++)
            //                         nest(mc[i], t)
            //                 }
            //             }
            //         }
            //     }
            // }
        if (n.children) {
            for (let i = 0, l = n.children.length; i < l; i++)
                nest(n.children[i], t)
        }
    }

    function teamname(name, t, isLastNode) {
        return "\n" + strtimes(l1, t) + (isLastNode ? "    └──── " : "    ├──── ") + name // + "  " + (isLastNode ? "\n        │  " : "")
    }

    function membername(origion, name, t) {
        let plat = "·"
        if (origion) {
            let rtn = rtree.getNodeByTId(origion[0]);
            let ltn = ltree.getNodeByTId(origion[0]);
            let tn = (rtn ? rtn.name : null) || (ltn ? ltn.name : null) || origion[1] || "-"
            if (tn) plat = tn + "："
        }
        return "（" + plat + name + "）"
    }
}

$(document).ready(function() {
    $("#btnPrint").click(function() {
        ltree.expandAll(true);
        var mode = $("input[name='mode']:checked").val();
        var close = mode == "popup" && $("input#closePop").is(":checked");
        var extraCss = $("input[name='extraCss']").val();
        // var print = "";
        // $("input.selPA:checked").each(function() {
        //     print += (print.length > 0 ? "," : "") + "div.PrintArea." + $(this).val();
        // });

        // var keepAttr = [];
        // $(".chkAttr").each(function() {
        //     if ($(this).is(":checked") == false)
        //         return;

        //     keepAttr.push($(this).val());
        // });
        var headElements = $("input#addElements").is(":checked") ? '<meta charset="utf-8" />,<meta http-equiv="X-UA-Compatible" content="IE=edge"/>' : '';
        var options = { mode: mode, popClose: close, extraCss: extraCss, extraHead: headElements };
        setTimeout(() => {
            alert("可在弹出窗口中选择\n 目标打印机：另存为PDF")
            $("#demoleft").printArea(options);
        }, 500);
    });
});