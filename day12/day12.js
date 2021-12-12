/* Day 12 */
const { getInputData } = require('../utils');

function day12A (file) {
    const data = getInputData(file);
    const linksMap = {};
    data.forEach(row => {
       const [start, end] = row.split('-');
       if (linksMap[start]) linksMap[start].push(end);
       else linksMap[start] = [end];
       if (linksMap[end]) linksMap[end].push(start);
       else linksMap[end] = [start];
    });

    function getPath (start, thisPath, allPaths) {
        let newPath = [
            ...thisPath,
            start,
        ];
        if (start === 'end') {
            allPaths.push(newPath);
            return;
        }
        linksMap[start].forEach(dest => {
            if (dest.toUpperCase() === dest || !newPath.includes(dest)) {
                getPath(dest, newPath, allPaths);
            }
        });
    }

    const paths = [];
    getPath('start', [], paths);

    return paths.length;
}

function day12B (file) {
}

module.exports = {
    day12A,
    day12B,
};
