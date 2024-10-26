import { desc } from "drizzle-orm"
import { cache } from "~/lib/cache"
import { Accommodation } from "./accommodation.schema"
import { db } from "~/database"

export const listAccommodations = cache(
  () =>
    db.query.Accommodation.findMany({
      with: { address: true },
      orderBy: desc(Accommodation.createdAt),
    }),
  { tags: ["listAccommodations"] },
)
