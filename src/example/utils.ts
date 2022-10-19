export async function wait(ms: number) {
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((f) => setTimeout(f, ms));
}