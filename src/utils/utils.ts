import { IAddedCategory, ICategory, IMiddleCategory } from '../types/category';
import { IServerImage } from '../types/images';

export const isEnableFetch = (dependencyStringId: string) => {
    if (!dependencyStringId || isNaN(+dependencyStringId)) return false;

    return +dependencyStringId > 0 ? true : false;
};

export const getDeleteImages = (
    oldbie: IServerImage[],
    newbie: IServerImage[]
) => {
    const newbieIds = newbie.map((b) => b.id);
    const result = oldbie
        .filter((a) => !newbieIds.includes(a.id))
        .map((item) => ({
            id: item.id,
        }));

    return result && result.length > 0 ? result : null;
};

export const getAddedItem = (array1: any[], array2: any[]) => {
    const aIds = new Set(array1.map((obj) => obj.id));
    const inBNotInA = array2
        .filter((obj) => !aIds.has(obj.id))
        .map((item) => ({ id: item.id }));
    return inBNotInA && inBNotInA.length > 0 ? inBNotInA : null;
};

export const getDeletedItem = (array1: any[], array2: any[]) => {
    const bIds = new Set(array2.map((obj) => obj.id));
    const inANotInB = array1
        .filter((obj) => !bIds.has(obj.id))
        .map((item) => ({ id: item.id }));
    return inANotInB && inANotInB.length > 0 ? inANotInB : null;
};
