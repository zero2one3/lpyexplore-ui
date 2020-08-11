function updateClass(elClassName, oldClass, newClass) {
    let arr = elClassName.split(' ')
    for(let i in arr) {
        if(arr[i] === oldClass) {
            arr[i] = newClass
            break;
        }
    }
    return arr.join(' ')
}


export {updateClass}