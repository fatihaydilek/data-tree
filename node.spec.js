const Node = require('./node');
const {buildTree}  = require('./index')

describe('Node', () => {
    test('Node is a constructor', () => {
        expect(typeof Node.prototype.constructor).toEqual('function');
    });

    test('Node has a data and children properties', () => {
        const n = new Node(1526915703274,"2467-359");
        expect(n.start).toEqual(1526915703274);
        expect(n.tier).toEqual("2467-359");
        expect(n.children.length).toEqual(0);
    });

    test('Node can add children', () => {
        const n = new Node(1526915703274,"2467-359");
        n.add(new Node(1526915707396,"2467-359-2862"));
        expect(n.children.length).toEqual(1);
        expect(n.children[0].children).toEqual([]);
    });

    test('Node can add children with same tier different start', () => {
        const n = new Node(1526915703274,"2467-359");
        n.add(new Node(1526915703284,"2467-359"));
        expect(n.children.length).toEqual(1);
        expect(n.children[0].children).toEqual([]);
        expect(n.children[0].start).toEqual(1526915703284);
    });

});

describe('Build Tree', () => {
   test('buildTree is a function', () => {
      expect(typeof  buildTree).toEqual('function');
   });

    test('buildTree with empty array', () => {
        const tree = buildTree([])
        expect(tree).toEqual([])
    });

    test('buildTree with unsorted dataPoint', () => {
        const dataPoint = [
                {
                    "start": 1526915703284,
                    "tier": "2467-359"
                },
                {
                    "start": 1526915703274,
                    "tier": "2467-359"
                },
            ];
        const tree = buildTree(dataPoint);
        expect(tree).toEqual(
            [
                {
                    "start": 1526915703274,
                    "tier": "2467-359",
                    "children": [
                        {
                            "start": 1526915703284,
                            "tier": "2467-359",
                            "children": []
                        }
                    ]
                }
            ]
        )
    });

});
