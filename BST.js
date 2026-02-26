class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
    constructor(array) {
        this.array = array;
        this.root = null;

        //sort array. maybe move this logic into buildTree 
        const sortedArray = this.#sortArray(array);
        this.root = this.#buildTree(sortedArray);
    
    }

    #sortArray(array) {
        array.sort((a,b) => a - b);
        return [...new Set(array)];
    }

    #buildTree(array, start = 0, end = array.length - 1) {
        if(start > end)
            return null;

        const mid = Math.floor((start + end)/ 2);
        const node = new Node(array[mid]);
        node.left = this.#buildTree(array,start,mid-1);
        node.right = this.#buildTree(array,mid+1,end);

        return node;

    }

    includes(value) 
    {
        let current = this.root;
        while(current){
            if (current.data === value) {
                return true;
            } else if(current.data > value) {
                current = current.left;
            } else {
                current = current.right;
            }

        }
        return false;
    }

    insert(value) {

        let curr = this.root;
        const newNode = new Node(value);
        if (!curr)
        {
            this.root = newNode;
            return;
        }

        while(curr){
            if( curr.data > value) {
                if(!curr.left){
                    curr.left = newNode;
                    curr = null;
                } else {
                    curr = curr.left;
                }
      

            } else {
                if(!curr.right){
                    curr.right = newNode;
                  } else {
                     curr = curr.right; 
                }             curr = null;
     
               
            }
        }
    }

    getSuccessor(curr) {
        curr = curr.right;
        while(curr !== null && curr.left !== null)
            curr = curr.left;
        return curr;
    }
    delete(root = this.root, value)
    {
        if (root === null)
            return root;

        if(root.data > value)
            root.left = delete(root.left, value);

        else if(root.data < value)
            root.right = delete(root.right, value);
        else {
            //Node with 0 or 1 child
            if(root.left === null)
                return root.right;
            if(!root.right === null)
                return root.left;

            // Node with 2 children
            const succ = getSuccessor(root);
            root.data = succ.data;
            root.right = delete(root.right, succ.data);

        }
    }

    //breadth-first level
    levelOrderForEach(callback, root = this.root) {
        if(root === NULL) return;
        const queue = [];
        queue.push(root);
        while( queue.length > 0) 
        {
            callback(root.value);
            if(root.left !== null)
                queue.push(root.left);
            if ( root.right !== null)
                queue.push(root.right);
            root = queue.shift();
        }
    }

    inOrderForEach(callback, root = this.root) {
        if (typeof callback !== 'function') throw new Error('A callback is required');
        if(root === null)
            return null;
        this.inOrderForEach(callback, root.left);
        callback(root.data);
        this.inOrderForEach(callback, root.right);
    }

    preOrderForeach(callback, root = this.root)
    {
        if (typeof callback !== 'function') throw new Error('A callback is required');
        if(root === null)
            return null;
        callback(root.data);
        this.preOrderForeach(callback, root.left);
        this.preOrderForeach(callback, root.right);
    }

    postOrderForEach(callback, root = this.root)
    {
        if (typeof callback !== 'function') throw new Error('A callback is required');
        if(root === null)
            return null;
        this.postOrderForEach(callback, root.left);
        this.postOrderForEach(callback, root.right);
        callback(root.data);
    }

    // calculateHeight(value, root = this.root, height = 0) 
    // {   
    //     // let height = 0;
    //     if(root === null) {
    //         return -1;
    //     }

    //     if( root.data > value) {
    //         height++;
    //         calculateHeight(value, root.left, height);
    //     } else if( root.data < value) {
    //         height++;
    //         calculateHeight(value, root.right, height);
    //     } else {
    //         return height;
    //     }

    // }

    height(value) {
    const findNode = (node, val) => {
      if (!node) return null;
      if (val === node.data) return node;
      return val < node.data ? findNode(node.left, val) : findNode(node.right, val);
    };
    const node = findNode(this.root, value);
    if (!node) return undefined;
    const h = (n) => {
      if (!n) return -1; // so leaf returns 0
      return Math.max(h(n.left), h(n.right)) + 1;
    };
    return h(node);
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

const newTree = new Tree([1,2,2,3,5,5,6,10,2,2,1,1,3,0]);
prettyPrint(newTree.root);
console.log(newTree.includes(1));

console.log(newTree.includes(2500));
console.log(newTree.includes(3));
newTree.insert(4);
prettyPrint(newTree.root);
console.log(newTree.height(3));
  