class DeepCloner {
    // 初始化一个cache用作缓存
    constructor() {
        this.cache = new Map()
    }
    clone(source) {
        // 判断是否为对象
        if (source instanceof Object) {
            // 是否缓存中存在该source对象，避免成环
            let cachedDist = this.findCache(source)
            if (cachedDist) return cachedDist
            // 不存在的情况下分别判断source子类型：Array、Function、RegExp、Date
            let dist  // copy的source对象
            if (source instanceof Array) {
                dist = new Array()
            } else if (source instanceof Function) {
                dist = function() {
                    return source.apply(this, arguments)
                }
            } else if (source instanceof RegExp) {
                dist = new RegExp(source.source, source.flags)
            } else if (source instanceof Date) {
                dist = new Date(source)
            } else {
                dist = new Object()
            }
            // 将source、dist放入缓存中
            this.cache.set(source, dist)
            // 遍历source对象的属性，将其值再次放入clone中递归处理
            for (let key in source) {
                if (source.hasOwnProperty(key)) {
                    dist[key] = this.clone(source[key])
                }
            }
            return dist
        }
        // 不是对象就直接返回soure
        return source  
    }
    findCache(source) {
        if(this.cache.has(source)) {
            return this.cache.get(source)
        }
        return undefined
    }
}

module.exports = DeepCloner;
