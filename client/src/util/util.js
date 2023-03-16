function removeElementFromArray(element, array) {
    const index = array.indexOf(element)
    if (index > -1) array.splice(index, 1)
}

function getNameByNumber(num) {
    // eslint-disable-next-line default-case
    switch (num) {
        case 1:
            return "First"
        case 2:
            return "Second"
        case 3:
            return "Third"
        case 4:
            return "Fourth"
    }
}

export {removeElementFromArray, getNameByNumber}