const fs = require('fs');
const Node = require("./node");

let rawData = fs.readFileSync('dataPoint.json');
let dataPoint = JSON.parse(rawData);


function findParent(tier, map) { // constant time ~O(1)
    if(!!map[tier]) return map[tier];
    let lastIndex = tier.lastIndexOf('-');
    while (lastIndex > 0){
        tier = tier.substr(0,lastIndex);
        if(!!map[tier]) return map[tier];
        lastIndex = tier.lastIndexOf('-');
    }

    return null;
}

function buildTree(arr){
    const roots = [];
    const map = {};

    arr = arr.sort((a,b) => {   // O(nlogn)
        if( a.tier < b.tier ) return -1;
        if( a.tier > b.tier ) return 1;
        if( a.start < b.start ) return -1;
        if( a.start > b.start ) return 1;
    });


    arr.forEach( data => {   // ~O(n)
        const node = new Node(data.start, data.tier);
        const parent = findParent(data.tier, map);
        if(!!parent){
            parent.add(node);
        } else{
            roots.push(node);
        }
        if(!map[data.tier])
            map[data.tier] = node;

    });
    return roots
}


// console.log(JSON.stringify(buildTree(dataPoint),null,2));


module.exports = { buildTree }