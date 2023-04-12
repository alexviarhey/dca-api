
type ArrayToMap = {
    _id: string
}

export const fromArrayToMap = <T extends ArrayToMap>(array: T[]): Map<string, T> => {
    return array.reduce((map, el) => {
        map.set(el._id, el)
        return map
    }, new Map())
}

