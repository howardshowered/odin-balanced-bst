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
                    curr = null;
                } else {
                     curr = curr.right; 
                }
               
            }


        }




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
  