function outport() {
    let text = ""
    zTree.getNodes().forEach(e => nest(e, 0));

    // 下载文件方法
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

    function nest(n, t, m) {
        text += teamname(n.name, t)
        if (n.pId != null) {
            let members = app.get(n.tId)
            if (members && members.in) {
                let l = members.in.length
                if (l) {
                    for (i = 0; i < l; i++) {
                        text += teamname(members.in[i].name, t)
                        let mc = members.in[i].children
                        if (mc) {
                            for (let i = 0, l = mc.length; i < l; i++)
                                nest(mc[i], t + 1)
                        }
                    }
                }
            }
        }
        if (n.children) {
            for (let i = 0, l = n.children.length; i < l; i++)
                nest(n.children[i], t + 1)
        }
    }

    function teamname(name, t, m) {
        if (m == null) {
            return t + name + "\n"
        } else {
            return t + m + name + "\n"
        }
    }
}