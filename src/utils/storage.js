/* 封装本地存储功能 */

// 存储功能
export const setStorage = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
}

// 获取功能
export const getStorage = (key) => {
    const value = window.localStorage.getItem(key)
    try {
        return JSON.parse(value)
    } catch (error) {
        return value
    }
}

// 删除功能
export const removeStorage = (key) => {
    window.localStorage.removeItem(key)
}