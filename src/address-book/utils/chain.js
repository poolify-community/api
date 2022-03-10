const chainNameIdMap = {
    bsc: 97, // 56 for main net
    eth: 1,
};

const reverseChain = function(objToReverse){
    let res = {};
    for (const [key, value] of Object.entries(objToReverse)) {
        res[value] = key;
    }
    return res;
}

export const chainReverseMap = reverseChain(chainNameIdMap);

export default chainNameIdMap;