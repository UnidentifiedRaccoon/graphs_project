export const transposition = (links) => {
    const reversedLinks = []
    for (let l of links) {
        reversedLinks.push({source: l.target, target: l.source, index: l.index})
    }
    return reversedLinks
}