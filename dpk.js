const crypto = require("crypto");
const { TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH } = require("./consts").constants;

exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  let candidate = initCandidate();

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash('sha3-512').update(candidate).digest('hex');
  }

  return candidate;

  function initCandidate() {
    return event.partitionKey || crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex');
  }
};