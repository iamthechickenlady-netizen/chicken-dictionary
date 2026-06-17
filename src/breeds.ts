export interface Breed {
  id: string;
  name: string;
  origin: string;
  vibe: "friendly" | "independent" | "showy" | "utility" | "gentle-giant";
  vibeLabel: string;
  size: "Bantam" | "Standard" | "Giant";
  eggColor: string;
  eggProduction: "Superb (250-300+/year)" | "Excellent (200-250/year)" | "Moderate (150-200/year)" | "Low (under 100/year)";
  eggSize: "Small" | "Medium" | "Large" | "Extra Large";
  temperament: string[];
  hardiness: "Cold Hardy" | "Heat Tolerant" | "All-Weather Hardy" | "Needs Shelter";
  shortDesc: string;
  longDesc: string;
  combType: "Single" | "Rose" | "Pea" | "Cushion" | "V-shape" | "Walnut";
  foraging: "Excellent" | "Good" | "Average" | "Poor";
  noiseLevel: "Whisper Quiet" | "Moderate" | "Vocal & Chatty";
  funFact: string;
  colorTheme: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    accent: string;
  };
}

export const breedData: Breed[] = [
  {
    id: "silkie",
    name: "Silkie",
    origin: "China",
    vibe: "friendly",
    vibeLabel: "Lap Kitten Bird",
    size: "Bantam",
    eggColor: "Cream / Tinted",
    eggProduction: "Low (under 100/year)",
    eggSize: "Small",
    temperament: ["Docile", "Friendly", "Extremely Broody", "Excellent Mothers", "Great for Kids"],
    hardiness: "Needs Shelter",
    shortDesc: "Fluffy, docile, and behaves more like a sweet, soft lap kitten than a bird.",
    longDesc: "Silkies are famous for their unique fluffy plumage, which lacks barbicels and feels exactly like silk or fur. Beneath their feathers, they have black skin and bones, blue earlobes, and five toes on each foot instead of the standard four. They are exceptionally friendly, handle confinement well, and make world-class mothers who will happily hatch any egg you put under them.",
    combType: "Walnut",
    foraging: "Poor",
    noiseLevel: "Whisper Quiet",
    funFact: "Ancient traveler Marco Polo wrote about these 'furry chickens' during his explorations in Asia in the 13th century.",
    colorTheme: {
      bg: "bg-teal-50/60",
      border: "border-teal-200/40 hover:border-teal-400",
      text: "text-teal-900",
      badge: "bg-teal-100 text-teal-800",
      accent: "teal"
    }
  },
  {
    id: "leghorn",
    name: "Leghorn",
    origin: "Italy",
    vibe: "independent",
    vibeLabel: "Energetic Foragers",
    size: "Standard",
    eggColor: "Bright White",
    eggProduction: "Superb (250-300+/year)",
    eggSize: "Large",
    temperament: ["Active", "Independent", "Noisy", "Flighty", "Excellent Foragers"],
    hardiness: "Heat Tolerant",
    shortDesc: "The ultimate prolific egg layer with a high-energy, independent personality.",
    longDesc: "Leghorns are highly active, noisy, and independent birds. They are fantastic foragers, which helps them feed themselves in large yards, and can fly over fences easily if they feel like exploring. If you are looking for maximum white egg production and a bird that can smartly fend for itself against minor predators, this is it.",
    combType: "Single",
    foraging: "Excellent",
    noiseLevel: "Vocal & Chatty",
    funFact: "The popular cartoon character Foghorn Leghorn was modeled after this loud and proud breed.",
    colorTheme: {
      bg: "bg-amber-50/60",
      border: "border-amber-200/40 hover:border-amber-400",
      text: "text-amber-900",
      badge: "bg-amber-100 text-amber-800",
      accent: "amber"
    }
  },
  {
    id: "rhode-island-red",
    name: "Rhode Island Red",
    origin: "United States",
    vibe: "utility",
    vibeLabel: "Tough Companion",
    size: "Standard",
    eggColor: "Rich Brown",
    eggProduction: "Superb (250-300+/year)",
    eggSize: "Extra Large",
    temperament: ["Hardy", "Curious", "Slightly Bossy", "Dependable", "Assertive"],
    hardiness: "All-Weather Hardy",
    shortDesc: "A smart, tough, and highly dependable brown egg laying champion.",
    longDesc: "One of the most popular breeds globally, Rhode Island Reds are smart, tough, and highly adaptable to cold weather. They possess a distinct rust-red coloring and maintain steady egg production even during rough winter months. They are confident birds that can dominate a mixed flock, but are often friendly with human keepers.",
    combType: "Single",
    foraging: "Excellent",
    noiseLevel: "Moderate",
    funFact: "It is the official state bird of Rhode Island, and they even raised a monument to it in Little Compton, RI.",
    colorTheme: {
      bg: "bg-rose-50/60",
      border: "border-rose-200/40 hover:border-rose-400",
      text: "text-rose-900",
      badge: "bg-rose-100 text-rose-800",
      accent: "rose"
    }
  },
  {
    id: "buff-orpington",
    name: "Buff Orpington",
    origin: "United Kingdom",
    vibe: "friendly",
    vibeLabel: "Golden Teddy Bear",
    size: "Standard",
    eggColor: "Light Brown",
    eggProduction: "Excellent (200-250/year)",
    eggSize: "Large",
    temperament: ["Sweet", "Calm", "Cuddly", "Quiet", "Heavy Feathered"],
    hardiness: "Cold Hardy",
    shortDesc: "Big, fluffy, golden teddy bears of the chicken world who love a good hug.",
    longDesc: "Orpingtons are the ultimate backyard sweethearts. Styled in a rich, buttery gold plumage with heaps of soft fluff, they look twice their actual weight. They love being handled, are calm and patient with children, and make wonderful companions. Because of their heavy feather layer, they do great in snowy winters but need shade in hot summers.",
    combType: "Single",
    foraging: "Good",
    noiseLevel: "Whisper Quiet",
    funFact: "Queen Elizabeth The Queen Mother was a famous breeder of Buff Orpingtons and won several awards with them.",
    colorTheme: {
      bg: "bg-yellow-50/60",
      border: "border-yellow-200/40 hover:border-yellow-400",
      text: "text-yellow-905",
      badge: "bg-yellow-100 text-yellow-800",
      accent: "yellow"
    }
  },
  {
    id: "plymouth-rock",
    name: "Barred Rock",
    origin: "United States",
    vibe: "utility",
    vibeLabel: "All-Star Favorite",
    size: "Standard",
    eggColor: "Warm Pinkish Brown",
    eggProduction: "Excellent (200-250/year)",
    eggSize: "Large",
    temperament: ["Friendly", "Even-Tempered", "Docile", "Curious", "Playful"],
    hardiness: "All-Weather Hardy",
    shortDesc: "Instantly recognizable for their gorgeous zebra-stripe feathers and gentle souls.",
    longDesc: "Plymouth Rocks, often called Barred Rocks because of their neat zebra-like black-and-white stripes, are a historical American breed. They are the ideal dual-performance flock member: tough enough to thrive in freeze and heat, highly sweet-tempered with humans, and exceptional layers of pink-hued brown eggs.",
    combType: "Single",
    foraging: "Excellent",
    noiseLevel: "Moderate",
    funFact: "They were among the very first breeds recognized by the American Poultry Association in 1874.",
    colorTheme: {
      bg: "bg-slate-50/60",
      border: "border-slate-300/40 hover:border-slate-500",
      text: "text-slate-950",
      badge: "bg-slate-200 text-slate-800",
      accent: "slate"
    }
  },
  {
    id: "marans",
    name: "Black Copper Marans",
    origin: "France",
    vibe: "utility",
    vibeLabel: "Chocolate egg Artist",
    size: "Standard",
    eggColor: "Dark Chocolate Brown",
    eggProduction: "Moderate (150-200/year)",
    eggSize: "Large",
    temperament: ["Quiet", "Robust", "Calm", "Alert", "Handsome"],
    hardiness: "Cold Hardy",
    shortDesc: "Prized worldwide for laying the darkest, rich-chocolate colored eggs in poultry.",
    longDesc: "Originating from the swampy French town of Marans, these beautiful chickens have shiny black bodies with fiery coppery head feathers. They are strong, quiet birds who love running around large pastures. Egg lovers pursue them passionately because their eggshells have a heavy dark-brown coat that looks like melted chocolate.",
    combType: "Single",
    foraging: "Excellent",
    noiseLevel: "Whisper Quiet",
    funFact: "Ian Fleming's James Bond would only eat fresh, copper-shelled Marans eggs for his breakfast, boiled exactly 3 and a half minutes.",
    colorTheme: {
      bg: "bg-orange-50/60",
      border: "border-orange-200/40 hover:border-orange-400",
      text: "text-orange-950",
      badge: "bg-orange-100 text-orange-900",
      accent: "orange"
    }
  },
  {
    id: "polish",
    name: "Polish",
    origin: "Poland (or Netherlands)",
    vibe: "showy",
    vibeLabel: "Rock Star Crest",
    size: "Standard",
    eggColor: "White",
    eggProduction: "Moderate (150-200/year)",
    eggSize: "Medium",
    temperament: ["Quirky", "Easily Startled", "Gentle", "Comical", "Sweet"],
    hardiness: "Needs Shelter",
    shortDesc: "Famous for their massive '80s rock-star feather crown blocking their eyesight.",
    longDesc: "Polish chickens look like fluffy puppets! They carry a huge, round helmet of feathers that completely obscures their eyes, which makes them walk with funny high-stepping struts and get startled easily. They are incredibly loving and comical, but they need protection from rainy weather and bullying flock members who might peck at their gorgeous hats.",
    combType: "V-shape",
    foraging: "Poor",
    noiseLevel: "Whisper Quiet",
    funFact: "Because their feathers grow over their eyes, they can't see hawks or enemies directly from above, making them rely on chicken friends for guard duty.",
    colorTheme: {
      bg: "bg-violet-50/60",
      border: "border-violet-200/40 hover:border-violet-400",
      text: "text-violet-950",
      badge: "bg-violet-100 text-violet-800",
      accent: "violet"
    }
  },
  {
    id: "easter-egger",
    name: "Easter Egger",
    origin: "United States",
    vibe: "friendly",
    vibeLabel: "Rainbow Layer",
    size: "Standard",
    eggColor: "Blue / Green / Pink",
    eggProduction: "Excellent (200-250/year)",
    eggSize: "Large",
    temperament: ["Friendly", "Quirky", "Chatty", "Expressive", "Smart"],
    hardiness: "All-Weather Hardy",
    shortDesc: "A delightful flock surprise bird that lays rainbow colored eggs in shades of blue, green, or olive.",
    longDesc: "Easter Eggers are not a formal purebred pedigree, but rather a crossbreed from ancestors like Ameraucanas. They are intensely popular because they carry the gene for putting colorful pigments on their eggshells! Every individual hen lays one distinct color: turquoise blue, pastel green, mint, pale pink, or olive brown. They are extraordinarily friendly and often sit on shoulders.",
    combType: "Pea",
    foraging: "Excellent",
    noiseLevel: "Vocal & Chatty",
    funFact: "Since they are mixed hybrids, no two Easter Eggers look exactly alike; they can have fluffy cheek muffs, thick beards, or feathers in fifty shades of grey and gold.",
    colorTheme: {
      bg: "bg-emerald-50/60",
      border: "border-emerald-200/40 hover:border-emerald-400",
      text: "text-emerald-950",
      badge: "bg-emerald-100 text-emerald-850",
      accent: "emerald"
    }
  },
  {
    id: "australorp",
    name: "Australorp",
    origin: "Australia",
    vibe: "utility",
    vibeLabel: "Record Egg Machine",
    size: "Standard",
    eggColor: "Brown",
    eggProduction: "Superb (250-300+/year)",
    eggSize: "Large",
    temperament: ["Calm", "Sweet", "Heavy", "Quiet", "Dutiful"],
    hardiness: "All-Weather Hardy",
    shortDesc: "An Australian legend that once set a world record by laying 364 eggs in a single year.",
    longDesc: "Designed in Australia, this black-feathered beauty is the national pride of Aussie poultry. They have an incredible oil-slick emerald sheen on their black feathers when sunlight hits them. They are heavy, peaceful, highly productive, and don't make much fuss. They bond deeply with household pets and children.",
    combType: "Single",
    foraging: "Good",
    noiseLevel: "Whisper Quiet",
    funFact: "A single Black Australorp hen holds the world record for laying 364 eggs in 365 days without commercial stimulants.",
    colorTheme: {
      bg: "bg-cyan-50/60",
      border: "border-cyan-200/40 hover:border-cyan-400",
      text: "text-cyan-950",
      badge: "bg-cyan-100 text-cyan-800",
      accent: "cyan"
    }
  },
  {
    id: "brahma",
    name: "Light Brahma",
    origin: "United States (via Asia)",
    vibe: "gentle-giant",
    vibeLabel: "King of Poultry",
    size: "Giant",
    eggColor: "Brown",
    eggProduction: "Moderate (150-200/year)",
    eggSize: "Large",
    temperament: ["Very Gentle", "Quiet", "Majestic", "Friendly", "Fuzzy Toes"],
    hardiness: "Cold Hardy",
    shortDesc: "The gentle giant of the barnyard with majestic fluffy leggings and fuzzy toes.",
    longDesc: "Brahmas are massive, sometimes weighing up to 12 pounds, earning them the nickname 'The King of Poultry.' Despite their heavy defensive build, they are incredibly gentle, quiet, and slow-moving. Their thick body feathers extend all the way down to their outer toes, keeping them warm in freezing conditions while making them look like royal puffballs.",
    combType: "Pea",
    foraging: "Average",
    noiseLevel: "Whisper Quiet",
    funFact: "A viral video of a massive Brahma rooster walking out of a coop in 2017 shocked millions of humans who thought it was a person wearing a chicken costume.",
    colorTheme: {
      bg: "bg-indigo-50/60",
      border: "border-indigo-200/40 hover:border-indigo-400",
      text: "text-indigo-950",
      badge: "bg-indigo-100 text-indigo-800",
      accent: "indigo"
    }
  },
  {
    id: "cochin",
    name: "Cochin",
    origin: "China",
    vibe: "showy",
    vibeLabel: "Fluffy Ball of Feathers",
    size: "Standard",
    eggColor: "Light Brown",
    eggProduction: "Low (under 100/year)",
    eggSize: "Medium",
    temperament: ["Sweetest Bird", "Extremely Quiet", "Lazy Forager", "Maternal", "Very Fluffy"],
    hardiness: "Cold Hardy",
    shortDesc: "A complete sphere of soft, fluffy feathers that would rather cuddle than roam.",
    longDesc: "Cochins were bred to be decorative masterpieces with a ball-like feather structure. They are famously round, sweet, and quiet. They have extremely lazy foraging habits and are content staying in a small enclosure. If you want a giant living feather duster that sits quietly in your lap, look no further.",
    combType: "Single",
    foraging: "Poor",
    noiseLevel: "Whisper Quiet",
    funFact: "In the 1850s, Cochins caused a massive obsession known as 'Hen Fever' across England and America, driving prices that rivaled the Dutch Dutch tulip mania.",
    colorTheme: {
      bg: "bg-fuchsia-50/60",
      border: "border-fuchsia-200/40 hover:border-fuchsia-400",
      text: "text-fuchsia-950",
      badge: "bg-fuchsia-100 text-fuchsia-800",
      accent: "fuchsia"
    }
  },
  {
    id: "wel-summer",
    name: "Welsummer",
    origin: "Netherlands",
    vibe: "utility",
    vibeLabel: "Speckled Egg Artist",
    size: "Standard",
    eggColor: "Dark Reddish Brown (Speckled)",
    eggProduction: "Moderate (150-200/year)",
    eggSize: "Large",
    temperament: ["Active", "Friendly", "Curious", "Vocal", "Alert"],
    hardiness: "All-Weather Hardy",
    shortDesc: "Bears a beautiful rustic gold pattern and lays gorgeous dark, speckled brown eggs.",
    longDesc: "Originating in the Dutch village of Welsum, Welsummers are dual-purpose chickens known for their rich golden-brown neck hackles and forest-forager smarts. They are very active and love scratching for worms. They lay gorgeous matte reddish-brown eggs that are frequently decorated with unique dark spots.",
    combType: "Single",
    foraging: "Excellent",
    noiseLevel: "Vocal & Chatty",
    funFact: "The famous rooster on the cover of the Kellogg's Corn Flakes cereal boxes ('Cornelius') is a proud Welsummer rooster.",
    colorTheme: {
      bg: "bg-amber-50/60",
      border: "border-amber-200/40 hover:border-amber-400",
      text: "text-amber-950",
      badge: "bg-amber-200 text-amber-900",
      accent: "amber"
    }
  },
  {
    id: "sebright",
    name: "Sebright",
    origin: "United Kingdom",
    vibe: "showy",
    vibeLabel: "Laced Masterpiece",
    size: "Bantam",
    eggColor: "Cream / White",
    eggProduction: "Low (under 100/year)",
    eggSize: "Small",
    temperament: ["Active", "Flyer", "Spirited", "Friendly", "Social"],
    hardiness: "Needs Shelter",
    shortDesc: "A true masterclass in ornamental symmetry with perfect black-laced feathers.",
    longDesc: "Sebrights are exceptionally unique miniature bantam chickens. Each of their feathers is rimmed in a flawless, thin black border, making them look like a pen-and-ink drawing. They are active, proud flyers, hold their heads upright, and have bright purple-colored wattles. They make dazzling backyard ornaments.",
    combType: "Rose",
    foraging: "Good",
    noiseLevel: "Moderate",
    funFact: "Sebright is one of the oldest recorded British bantam breeds, developed in the 1800s by Sir John Sebright through decades of rigorous breeding.",
    colorTheme: {
      bg: "bg-neutral-50/60",
      border: "border-neutral-300/40 hover:border-neutral-500",
      text: "text-neutral-950",
      badge: "bg-neutral-200 text-neutral-800",
      accent: "neutral"
    }
  },
  {
    id: "jersey-giant",
    name: "Jersey Giant",
    origin: "United States",
    vibe: "gentle-giant",
    vibeLabel: "The Gentle Heavyweight",
    size: "Giant",
    eggColor: "Brown",
    eggProduction: "Moderate (150-200/year)",
    eggSize: "Extra Large",
    temperament: ["Enormously Calm", "Friendly", "Heavy", "Quiet", "Docile"],
    hardiness: "Cold Hardy",
    shortDesc: "The heaviest pure chicken breed in history, acting like a slow, friendly tank.",
    longDesc: "Developed in New Jersey to replace the turkey, Jersey Giants are legendary heavy weights (often exceeding 13-15 pounds). They occupy a massive footprint, yet they are extremely friendly and slow-moving. Because of their huge mass, they can't fly at all, and a simple 2-foot fence is enough to keep them contained.",
    combType: "Single",
    foraging: "Good",
    noiseLevel: "Whisper Quiet",
    funFact: "Historically, the black variety of the Jersey Giant was bred specifically to be incredibly large, but they take a full 12-16 months to grow to their true size, much slower than modern chickens.",
    colorTheme: {
      bg: "bg-stone-50/60",
      border: "border-stone-300/40 hover:border-stone-500",
      text: "text-stone-950",
      badge: "bg-stone-200 text-stone-800",
      accent: "stone"
    }
  },
  {
    id: "creme-legbar",
    name: "Cream Legbar",
    origin: "United Kingdom",
    vibe: "utility",
    vibeLabel: "Sky Blue Egg Queen",
    size: "Standard",
    eggColor: "Sky Blue",
    eggProduction: "Excellent (200-250/year)",
    eggSize: "Large",
    temperament: ["Curious", "Inquisitive", "Alert", "Noisy", "Fast Runner"],
    hardiness: "All-Weather Hardy",
    shortDesc: "A crested, striped helper bird that consistently lays beautiful sky-blue eggs.",
    longDesc: "Developed at Cambridge University, the Cream Legbar is highly prized because it combines excellent blue egg-laying genetics with auto-sexing qualities (chicks can be sorted by gender on day one based on down stripes). They are fast, hyper-aware foragers with adorable little feathered crests behind their combs.",
    combType: "Single",
    foraging: "Excellent",
    noiseLevel: "Vocal & Chatty",
    funFact: "They were bred using an elaborate cross of Araucanas, Golden Campines, Salmon Faverolles, and Barred Plymouth Rocks.",
    colorTheme: {
      bg: "bg-sky-50/60",
      border: "border-sky-200/40 hover:border-sky-400",
      text: "text-sky-950",
      badge: "bg-sky-100 text-sky-850",
      accent: "sky"
    }
  }
];

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Poultry Basics" | "Anatomy" | "Behaviors";
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Bantam",
    definition: "A miniature variety of chicken, typically one-third to one-fifth the size of a standard breed. Known for their high spirited attitude and small coop demands.",
    category: "Poultry Basics"
  },
  {
    term: "Broody / Broodiness",
    definition: "The maternal instinct of a hen to sit on a clutch of eggs to hatch them. A broody hen stays stuck on her nest and will protective-growl if approached.",
    category: "Behaviors"
  },
  {
    term: "Comb",
    definition: "The fleshy, red crest on top of a chicken's head. It acts as an air conditioner to cool the bird in summer and is a key indicator of its health and laying status.",
    category: "Anatomy"
  },
  {
    term: "Wattles",
    definition: "The two flaps of red skin hanging beneath a chicken's beak. Like the comb, they help in temperature regulation.",
    category: "Anatomy"
  },
  {
    term: "Molting",
    definition: "The annual process where chickens shed old, worn-out feathers and regrow shiny new ones. Egg production usually stops during this high-protein construction phase.",
    category: "Behaviors"
  },
  {
    term: "Pullet",
    definition: "A young female chicken under one year of age that has either just started laying or has not yet laid an egg.",
    category: "Poultry Basics"
  },
  {
    term: "Cockerel",
    definition: "A young male chicken under one year of age. Known for practicing their squeaky early-morning crows.",
    category: "Poultry Basics"
  },
  {
    term: "Foraging",
    definition: "The behavior of scratching the soil and grazing the yard to find tasty bugs, seeds, worms, and fresh weeds.",
    category: "Behaviors"
  },
  {
    term: "Crop",
    definition: "A muscular pouch at the base of the chicken's neck where food is swallowed and temporarily stored before heading into the stomach and gizzard.",
    category: "Anatomy"
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    description: string;
    value: "friendly" | "independent" | "showy" | "utility" | "gentle-giant";
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's the absolute number-one reason you're bringing chickens home?",
    options: [
      {
        text: "🍳 To gather heaps of farm-fresh, delicious eggs!",
        description: "Focus on maximum, highly dependable egg production.",
        value: "utility"
      },
      {
        text: "🧸 Absolute cuddles and lovable feathered companions for my kids.",
        description: "Docility and high tolerance to hugs and laps.",
        value: "friendly"
      },
      {
        text: "👒 To show off some gorgeous, fancy-looking garden royalty!",
        description: "Peculiar aesthetic traits, incredible crests, and plumage patterns.",
        value: "showy"
      },
      {
        text: "🌳 Low maintenance, highly independent natural insect-helpers.",
        description: "Active foragers who prefer to feed themselves.",
        value: "independent"
      },
      {
        text: "🏰 To have giant, slow-moving majestic backyard royalty.",
        description: "Large size but extremely warm, steady, and peaceful temperament.",
        value: "gentle-giant"
      }
    ]
  },
  {
    id: 2,
    question: "How much backyard acreage or run space do they have to explore?",
    options: [
      {
        text: "🏡 Cozy suburban backyard with a secure, standard-sized run.",
        description: "Quiet breeds that tolerate smaller spaces and don't fly.",
        value: "friendly"
      },
      {
        text: "🌾 Generous green pasture or a huge, wide double-fenced lawn.",
        description: "Active birds who adore foraging and can evade yard threats.",
        value: "independent"
      },
      {
        text: "🏡 Large yard with a tall fence (they can fly or roam safely).",
        description: "Adaptable utility breeds that love a mix of yard and coop.",
        value: "utility"
      },
      {
        text: "👑 A delicate luxury orchard space with covered shelters.",
        description: "Ornamental birds that need safety and look spectacular under roses.",
        value: "showy"
      },
      {
        text: "🛡️ A fortified wide-open range with light shelters.",
        description: "Gigantic heavy birds that can't fly and fear no minor predators.",
        value: "gentle-giant"
      }
    ]
  },
  {
    id: 3,
    question: "What's your typical local weather like over the course of a year?",
    options: [
      {
        text: "❄️ Freezing winter blizzards and heavy snowfall.",
        description: "Needs heavy fluff, tiny combs (pea/walnut), and cold hardiness.",
        value: "gentle-giant"
      },
      {
        text: "☀️ Hot, humid, or dry heatwaves most of the time.",
        description: "Lightweight bodies with large combs to shed body heat easily.",
        value: "independent"
      },
      {
        text: "🍂 All four seasons with rain, mud, and mild frost.",
        description: "Tough, highly adaptable birds that take on anything.",
        value: "utility"
      },
      {
        text: "☀️ Hot summers and mild, wet winters (need shaded runs).",
        description: "Quiet cuddles that do well with good shade and care.",
        value: "friendly"
      },
      {
        text: "🌤️ Mild and pleasant with good weather shields/domes.",
        description: "Fabulous crests that might get soggy if left in the heavy rain.",
        value: "showy"
      }
    ]
  },
  {
    id: 4,
    question: "How vocal can your chickens be without annoying the neighbors?",
    options: [
      {
        text: "🤫 Whisper quiet! Need silent, peaceful hens.",
        description: "Breeds that rarely speak unless singing the 'egg song'.",
        value: "friendly"
      },
      {
        text: "🗣️ Sound is fine, I find happy clucking and chatting endearing!",
        description: "Curious, communicative birds that like telling you stories.",
        value: "independent"
      },
      {
        text: "🐔 Standard friendly barnyard volume is perfectly fine.",
        description: "Dependable egg layers with average conversational skills.",
        value: "utility"
      },
      {
        text: "🤫 Very quiet, but I care more about them being gentle.",
        description: "Slow-moving, calm, heavy birds that don't startle or squawk.",
        value: "gentle-giant"
      },
      {
        text: "🎭 Comical or unique clucks, I don't mind silly behavior at all!",
        description: "Quirky birds with big personalities.",
        value: "showy"
      }
    ]
  }
];
