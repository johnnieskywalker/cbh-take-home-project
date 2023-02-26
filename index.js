const {deterministicPartitionKey} = require("./dpk");
const input = process.argv[2];

console.log(deterministicPartitionKey(input));