/**
 * Tests for delay utility function
 */
import { delay } from '../../src/utils/delay';

describe('delay', () => {
  it('should resolve after specified time', async () => {
    const startTime = Date.now();
    const delayTime = 100;

    await delay(delayTime);

    const endTime = Date.now();
    const actualDelay = endTime - startTime;

    // Allow some tolerance for timing variations
    expect(actualDelay).toBeGreaterThanOrEqual(delayTime - 10);
    expect(actualDelay).toBeLessThan(delayTime + 50);
  });

  it('should resolve immediately for zero delay', async () => {
    const startTime = Date.now();

    await delay(0);

    const endTime = Date.now();
    const actualDelay = endTime - startTime;

    expect(actualDelay).toBeLessThan(10);
  });

  it('should handle negative delay', async () => {
    const startTime = Date.now();

    await delay(-100);

    const endTime = Date.now();
    const actualDelay = endTime - startTime;

    expect(actualDelay).toBeLessThan(10);
  });

  it('should be chainable', async () => {
    const startTime = Date.now();

    await delay(50).then(() => delay(50));

    const endTime = Date.now();
    const actualDelay = endTime - startTime;

    expect(actualDelay).toBeGreaterThanOrEqual(90);
    expect(actualDelay).toBeLessThan(150);
  });

  it('should work with async/await', async () => {
    const startTime = Date.now();

    await delay(50);
    await delay(50);

    const endTime = Date.now();
    const actualDelay = endTime - startTime;

    expect(actualDelay).toBeGreaterThanOrEqual(90);
    expect(actualDelay).toBeLessThan(150);
  });
});
