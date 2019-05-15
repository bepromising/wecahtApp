/**
 * 
 * @param {array} nodes 需解析成树的数组
 * @param {string|number} pid 树的最顶层id，默认是'0'
 * @param {string|number} parentId，父节点的名称，默认是parentId
 * @returns array
 * @example parseTree(data); //如果最顶层的id是0
 */
const parseTreeNode = function (nodes, pid = '0', parentId = 'parentId',id = 'id') {
  let finalNodes = [],
    tempNode;
  for (let i = 0, len = nodes.length; i < len; i++) {
    if (nodes[i][parentId] == pid) {
      let _node = nodes[i];
      tempNode = parseTreeNode(nodes, nodes[i][id], parentId,id);
      if (tempNode.length > 0) {
        _node.children = tempNode;
      }
      finalNodes.push(_node);
    } else {
      continue;
    }
  }
  return finalNodes;
};

const formatDate = function (a) {
  if (a) {
    let time = new Date(a),
        year = time.getFullYear(),
        month = time.getMonth() + 1,
        date = time.getDate(),
        hour = time.getHours(),
        minute = time.getMinutes(),
        second = time.getSeconds();

    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second ;
    // return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  } else {
    return '';
  }
      
}

module.exports = {
  parseTreeNode,
  formatDate
}