function insertElement(array, index, ...args) {
    return [...array.slice(0, index), ...args, ...array.slice(index)];
}

function moveElement(array, sourceIndex, targetIndex) {
    if (targetIndex == sourceIndex) return array;

    let el = array[sourceIndex];
    let res = [...array];
    if (sourceIndex < targetIndex) {
        for (let i = sourceIndex; i + 1 < targetIndex; i++) res[i] = res[i + 1];
        targetIndex--;
    } else {
        for (let i = sourceIndex; i > targetIndex; i--) res[i] = res[i - 1];
    }
    res[targetIndex] = el;
    return res;
}