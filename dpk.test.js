const { deterministicPartitionKey } = require("./dpk");
const { TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH } = require("./consts").constants;
const assert = require('assert');
const crypto = require('crypto');

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it('given input partition key my-partition-key should return the same my-partition-key as output', () => {
    const event = { partitionKey: 'my-partition-key' };
    const expected = 'my-partition-key';
    const actual = deterministicPartitionKey(event);
    assert.strictEqual(actual, expected);
  });

  it('given event without partition key should create partition key using sha3-512 algorithm', () => {
    const event = { id: 123, otherData: 'abc', date: new Date() };
    const data = JSON.stringify(event);
    const expected = crypto.createHash('sha3-512').update(data).digest('hex');
    const actual = deterministicPartitionKey(event);
    assert.strictEqual(actual, expected);
  });

  it('given number as partition key as input, should return the same numeric key converted to string', () => {
    const event = { partitionKey: 555 };
    const expected = '555';
    const actual = deterministicPartitionKey(event);
    assert.strictEqual(actual, expected);
  });

  it('given partition key that exceeds max length should return new hashed partition key', () => {
    const lengthExcedingMaximum = MAX_PARTITION_KEY_LENGTH+1
    const longPartitionKey = 'a'.repeat(lengthExcedingMaximum);
    const expected = crypto.createHash('sha3-512').update(longPartitionKey).digest('hex');
    const actual = deterministicPartitionKey({ partitionKey: longPartitionKey });
    console.log(expected)
    assert.strictEqual(actual, expected);
  });

  it('given partition key that is shorter than maximum lenght should return the same partition key', () => {
    const lengthNotExcedingMaximum = MAX_PARTITION_KEY_LENGTH-1
    const partitionKey = 'a'.repeat(lengthNotExcedingMaximum);
    const expected = partitionKey;
    const actual = deterministicPartitionKey({ partitionKey });
    assert.strictEqual(actual, expected);
  });
});
