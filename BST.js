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
        node.left = this.#buildTree(array,s,mid-1);
        node.right = this.#buildTree(array,mid+1,e);
        return node;

    }


}

const newTree = new Tree([1,2,2,3,4,5,5,6,10,2,2,1,1,3,0]);
  