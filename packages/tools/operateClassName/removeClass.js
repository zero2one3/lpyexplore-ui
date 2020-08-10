function removeClass(elClassName, className) {
    let arr = elClassName.split(' ')
    for(let i in arr) {
        if(arr[i] == className) {
            arr.splice(Number(i), 1)
            break;
        }
    }
    return arr.join(' ')
}


export {removeClass}