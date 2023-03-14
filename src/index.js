#!/usr/bin/env node

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
// const util = require('util');

// Solution no 2
// const lstat = util.promisify(fs.lstat);

// Solution no 3
// const { lstat } = fs.promises;

function lstat(filename) {
    return new Promise((resolve, reject) => {
        fs.lstat(filename, (err, stats) => {
            if (err) {
                reject(err);
            }
            resolve(stats);
        });
    });
}
const targetDir = process.argv[2] || process.cwd();
fs.readdir(targetDir, async (err, filenames) => {
    if (err) {
        console.log(err);
    }
    const statPromises = filenames.map((filename) =>
        lstat(path.join(targetDir, filename))
    );
    const allStats = await Promise.all(statPromises);
    for (const stat of allStats) {
        const index = allStats.indexOf(stat);
        if (stat.isFile()) {
            console.log(filenames[index]);
        } else {
            console.log(chalk.bold(filenames[index]));
        }
    }
});
// for (const filename of filenames) {
//     const stats = await lstat(filename);
//     try {
//         console.log(filename, stats.isFile());
//     } catch (err) {
//         console.log(err);
//     }
// }

// Solution 1 Its too not that good
// const allStats = Array(filenames.length).fill(null);
// for (const filename of filenames) {
//     const index = filenames.indexOf(filename);
//     fs.lstat(filename, (err, stats) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         allStats[index] = stats;
//         const ready = allStats.every((stat) => stat);
//         if (ready) {
//             allStats.forEach((stats, index) => {
//                 console.log(filenames[index], stats.isFile());
//             });
//         }
//     });
// }
// Bad Code Here!!
// for (const filename of filenames) {
//     fs.lstat(filename, (err, stats) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(filename, stats.isFile());
//     });
// }
// Bad Code Ends Here!
// });
