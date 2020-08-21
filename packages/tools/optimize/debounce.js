export default function(func, delay = 500) {
    let timer = null

    return function(...args) {
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}
