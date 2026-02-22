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
        this.array.sort((a,b) => a - b);
        const uniqueArray = [...new Set(this.array)];
        console.log("previous array:" + this.array);
        console.log("fixed array: " + uniqueArray);
        this.root = this.#buildTree(array);
    
    }

    #buildTree(array) {
        //sort array


    }


}

const newTree = new Tree([1,2,2,3,4,5,5,6,10,2,2,1,1,3,0]);
  