export default function sleep(timing = 0): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(resolve, timing)
  })
}
