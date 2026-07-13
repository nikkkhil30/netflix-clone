// Mock content catalog — pure frontend, no API keys or backend required.
// Poster/backdrop art comes from Picsum's seeded placeholder service so every
// card has a stable, unique image without needing a real media API.

const poster = (seed) => `https://picsum.photos/seed/${seed}/400/600`
const backdrop = (seed) => `https://picsum.photos/seed/${seed}/1280/720`

const titleBank = [
  'Crimson Tide City', 'The Last Signal', 'Glass Horizon', 'Midnight Cartel',
  'Echoes of Tomorrow', 'The Silent Order', 'Neon Requiem', 'Ashfall',
  'Velvet Static', 'Borderline Kingdom', 'The Hollow Crown', 'Paper Moon Rising',
  'Iron Season', 'Wildfire Country', 'The Long Descent', 'Salt & Smoke',
  'Nightshade Avenue', 'The Fracture Point', 'Copper Sky', 'Low Orbit',
  'The Quiet Storm', 'Runaway Frequency', 'Blackwater Heights', 'The Amber Hour',
  'Static Bloom', 'Dead Reckoning Bay', 'The Paper Tiger', 'Furnace Creek Files',
  'The Last Cartographer', 'Glasshouse', 'Nowhere Fast', 'The Winter Line',
  'Afterglow District', 'The Cold Open', 'Marigold & Rust', 'Undertow',
  'The Fifth Season', 'Concrete Sky', 'Halfway to Sunrise', 'The Broken Compass',
]

const genres = [
  { key: 'trending', label: 'Trending Now' },
  { key: 'originals', label: 'Netflix Originals' },
  { key: 'action', label: 'Action & Adventure' },
  { key: 'comedy', label: 'Comedies' },
  { key: 'drama', label: 'Critically Acclaimed Dramas' },
  { key: 'scifi', label: 'Sci-Fi & Fantasy' },
  { key: 'horror', label: 'Horror Nights' },
  { key: 'documentary', label: 'Documentaries' },
]

const synopses = [
  'A fractured family is pulled back together when a decades-old secret resurfaces in the last place anyone expected.',
  'When the grid goes dark across three cities, a small team of engineers races against time to find out why.',
  'A disgraced detective takes one final case that forces her to confront the choices that ended her career.',
  'Two rival chefs are forced to share a kitchen — and slowly, a life — in this slow-burn comedy of errors.',
  'In a world where memories can be traded like currency, one broker discovers a memory that was never for sale.',
  'A small coastal town unravels after a stranger arrives claiming to be someone who died twenty years ago.',
  'Four friends reunite for a weekend that spirals into a reckoning none of them saw coming.',
  'An elite pilot is grounded after a near-fatal accident, only to be called back for one impossible mission.',
  'A journalist chasing a routine story stumbles onto a conspiracy that reaches the highest levels of government.',
  'After inheriting a house full of secrets, a young architect must decide what to save and what to let burn.',
]

function seedRandom(seed) {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

function buildCatalog() {
  const rand = seedRandom(42)
  let id = 1
  const catalog = {}

  genres.forEach((genre) => {
    const items = []
    const count = 12
    for (let i = 0; i < count; i++) {
      const nameIndex = Math.floor(rand() * titleBank.length)
      const title = titleBank[(nameIndex + id) % titleBank.length]
      const year = 2016 + Math.floor(rand() * 9)
      const match = 80 + Math.floor(rand() * 19)
      const seasons = rand() > 0.5 ? null : 1 + Math.floor(rand() * 5)
      const runtime = seasons ? null : 85 + Math.floor(rand() * 60)
      const maturity = ['U/A 13+', 'U/A 16+', 'U/A 18+', 'U'][Math.floor(rand() * 4)]
      const synopsis = synopses[Math.floor(rand() * synopses.length)]
      const seedTag = `${genre.key}-${id}`

      items.push({
        id,
        title,
        year,
        match,
        seasons,
        runtime,
        maturity,
        synopsis,
        genre: genre.label,
        poster: poster(seedTag),
        backdrop: backdrop(seedTag),
        tags: [genre.label, maturity, seasons ? `${seasons} Season${seasons > 1 ? 's' : ''}` : `${runtime}m`],
      })
      id += 1
    }
    catalog[genre.key] = items
  })

  return catalog
}

export const CATALOG = buildCatalog()
export const GENRES = genres

export const ALL_TITLES = Object.values(CATALOG).flat()

export const FEATURED = ALL_TITLES[3]
