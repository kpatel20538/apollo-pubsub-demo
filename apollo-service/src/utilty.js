
const pRetry = require("p-retry");

const backoff = (func) =>
  pRetry(
    async () => {
      try {
        return await func();
      } catch (error) {
        if (error.retryable) {
          throw error;
        } else {
          throw new pRetry.AbortError(error);
        }
      }
    },
    {
      onFailedAttempt: (error) => {
        console.error(`${func.name}: Attempt ${error.attemptNumber}/10`);
      },
    }
  );

module.exports = { backoff };