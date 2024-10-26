import { revalidateTag, unstable_cache } from "next/cache"
import { cache as react_cache } from "react"

interface CachedFunction<Inputs extends unknown[], Output> {
  (...args: Inputs): Promise<Output>
  revalidate: () => void
}

export const cache = <Inputs extends unknown[], Output>(
  callback: (...args: Inputs) => Promise<Output>,
  options: { tags: string[]; revalidate?: number | false },
) => {
  const fn = react_cache(
    unstable_cache(callback, options.tags, options),
  ) as CachedFunction<Inputs, Output>

  fn.revalidate = function () {
    options.tags.forEach((t) => revalidateTag(t))
  }

  return fn
}
