const crypto = require("crypto");
const { TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH } = require("./consts").constants;

exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  let candidate = getPartitionKeyCandidate(event);

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = hashPartitionKey(candidate);
  }

  return candidate;

  function getPartitionKeyCandidate(event) {
    return event.partitionKey || crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex');
  }

  function hashPartitionKey(partitionKey) {
    return crypto.createHash('sha3-512').update(partitionKey).digest('hex');
  }
};