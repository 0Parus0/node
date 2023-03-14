let counter = 0;
module.exports = {
    incrementCounter() {
        return (counter += 1);
    },
    getCounter() {
        return counter;
    },
};
