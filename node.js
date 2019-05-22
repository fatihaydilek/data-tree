class Node {
    constructor(start, tier) {
        this.start = start;
        this.tier = tier;
        this.children = [];
    }

    add(node) {
        this.children.push(node);
    }
}


module.exports = Node;