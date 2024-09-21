class ArrayUtil {

    // Store useful util function for array
  
    static getKeyArrayInArray(array) {
        if (Array.isArray(array)) {
            const keyArray = [];

            for (const childArray of array) {
                if (Array.isArray(childArray)) {
                    keyArray.push(childArray[0]);
                } else {
                    throw new Error(`Invalid childArray inside array: ${childArray}, ${array}`);
                }
            }
            return keyArray;
        } else {
            throw new Error(`Invalid array: ${array}`);
        }
    }

    static compareArrays(arr1, arr2) {
        if (arr1.length === arr2.length) {
            return arr1.every((value, index) => value === arr2[index]);      
        } else {
            return false;
        }       
    }
}