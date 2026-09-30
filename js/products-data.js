/**
 * Toy Haven - Product Catalog Dataset
 * Module: COMP40053 Assignment 3
 * University of Staffordshire
 * 
 * Provides product data for Figurines, Board Games, Toys, and Diecast Cars.
 * Stored as a JavaScript object for maximum compatibility with both HTTP(S) and local file:// protocols.
 */

const TOY_PRODUCTS = [
  {
    id: "fig-01",
    name: "Cyber-Ronin Neo Tokyo Figurine",
    category: "Figurines",
    price: 64.99,
    originalPrice: 79.99,
    rating: 4.9,
    reviewsCount: 52,
    badge: "Collector Edition",
    inStock: true,
    stockCount: 6,
    image: "images/products/fig-cyber-ronin.jpg",
    shortDescription: "1/8 scale hand-finished articulated cyberpunk warrior with dual plasma katanas and metallic accents.",
    description: "The Cyber-Ronin Neo Tokyo collectible figure brings futuristic high-concept samurai aesthetic to life. Featuring over 28 points of articulated movement, interchangeable masked and unmasked head sculpts, translucent energy effects, and heavy metallic diecast armor plates. Ideal for showcase display.",
    specs: {
      "Scale": "1:8 Scale",
      "Height": "24 cm",
      "Material": "ABS, PVC & Diecast Metal",
      "Age Grade": "14+ Years",
      "Manufacturer": "Ronin Forge Studios"
    }
  },
  {
    id: "fig-02",
    name: "Galactic Trooper Imperial Commander",
    category: "Figurines",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviewsCount: 38,
    badge: "Bestseller",
    inStock: true,
    stockCount: 12,
    image: "images/products/fig-galactic-trooper.jpg",
    shortDescription: "Premium articulated sci-fi infantry leader equipped with heavy thermal blaster and magnetic display base.",
    description: "Standardized imperial elite commander clad in battle-hardened composite composite plating. Features custom weathered battlefield paint finish, holsterable sidearm, comms backpack, and swappable tactical gesture hands. A must-have centerpiece for sci-fi dioramas.",
    specs: {
      "Scale": "1:10 Scale",
      "Height": "19 cm",
      "Material": "High-Grade PVC",
      "Age Grade": "12+ Years",
      "Manufacturer": "Starlight Collectibles"
    }
  },
  {
    id: "fig-03",
    name: "Mythic Dragon Slayer Resin Statue",
    category: "Figurines",
    price: 89.99,
    originalPrice: 110.00,
    rating: 5.0,
    reviewsCount: 29,
    badge: "Staff Pick",
    inStock: true,
    stockCount: 4,
    image: "images/products/fig-dragon-slayer.jpg",
    shortDescription: "Dynamic hand-painted cold-cast polystone statue capturing a legendary knight perched upon defeated dragon skull.",
    description: "Impeccably sculpted polystone statue crafted by premier fantasy illustrators. Showcases ultra-fine etched runes upon the runic greatsword, distressed chainmail texture, and glowing acrylic eyes inset into the monstrous skull base. Individually numbered with certificate of authenticity.",
    specs: {
      "Scale": "1:7 Scale",
      "Height": "31 cm",
      "Material": "Cold-Cast Polystone Resin",
      "Age Grade": "16+ Years",
      "Manufacturer": "Aethelgard Guild"
    }
  },
  {
    id: "fig-04",
    name: "Mecha Vanguard Titan Unit 01",
    category: "Figurines",
    price: 54.50,
    originalPrice: 65.00,
    rating: 4.7,
    reviewsCount: 44,
    badge: "New Arrival",
    inStock: true,
    stockCount: 9,
    image: "images/products/fig-mecha-vanguard.jpg",
    shortDescription: "Fully poseable robotic titan with LED chest core, folding shoulder cannons, and shield barrier.",
    description: "Inspired by 1980s retro-futuristic anime mechanics, the Titan Unit 01 combines vintage mechanical silhouettes with modern ball-joint engineering. Includes glowing LED core housing, interchangeable railgun armaments, and dynamic flight pose stand.",
    specs: {
      "Scale": "Non-Scale (18 cm)",
      "Height": "18.5 cm",
      "Material": "ABS & POM Plastic",
      "Age Grade": "14+ Years",
      "Manufacturer": "Nippon Mecha Works"
    }
  },
  {
    id: "bg-01",
    name: "Settlers of Catan: 6-Player Deluxe",
    category: "Board Games",
    price: 44.99,
    originalPrice: 49.99,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Classic Favorite",
    inStock: true,
    stockCount: 15,
    image: "images/products/bg-catan.jpg",
    shortDescription: "The world-renowned island-building strategy game expanded with premium wooden tokens and 5-6 player support.",
    description: "Picture yourself in the era of discovery! Harvest timber, quarry ore, breed sheep, and negotiate trades to develop flourishing settlements. This deluxe boxed set contains the complete base game plus the 5-6 player expansion tiles and custom linen-finish cards.",
    specs: {
      "Players": "3 - 6 Players",
      "Play Time": "75 - 90 Minutes",
      "Age Grade": "10+ Years",
      "Designer": "Klaus Teuber",
      "Manufacturer": "Catan Studio"
    }
  },
  {
    id: "bg-02",
    name: "Terraforming Mars Strategy Game",
    category: "Board Games",
    price: 52.00,
    originalPrice: 62.00,
    rating: 4.8,
    reviewsCount: 88,
    badge: "Award Winner",
    inStock: true,
    stockCount: 7,
    image: "images/products/bg-terraforming-mars.jpg",
    shortDescription: "Lead a mega-corporation to transform the Red Planet into a habitable cradle for human civilization.",
    description: "A deep and rewarding engine-building science fiction experience. Raise planetary oxygen levels, plant massive green forests, crash icy comets to seed oceans, and construct interplanetary infrastructure to claim victory points.",
    specs: {
      "Players": "1 - 5 Players",
      "Play Time": "120 Minutes",
      "Age Grade": "12+ Years",
      "Designer": "Jacob Fryxelius",
      "Manufacturer": "FryxGames"
    }
  },
  {
    id: "bg-03",
    name: "Ticket to Ride: Europe 15th Anniversary",
    category: "Board Games",
    price: 48.50,
    originalPrice: 55.00,
    rating: 4.9,
    reviewsCount: 116,
    badge: "Bestseller",
    inStock: true,
    stockCount: 11,
    image: "images/products/bg-ticket-to-ride.jpg",
    shortDescription: "Cross-country railway adventure across majestic European cities with detailed sculpted train cars.",
    description: "From the craggy hillsides of Edinburgh to the sunlit docks of Constantinople, embark on an unforgettable cross-continental rail journey. Includes tunnels, ferries, and train stations alongside oversized map board and embossed collector tins.",
    specs: {
      "Players": "2 - 5 Players",
      "Play Time": "60 Minutes",
      "Age Grade": "8+ Years",
      "Designer": "Alan R. Moon",
      "Manufacturer": "Days of Wonder"
    }
  },
  {
    id: "bg-04",
    name: "Wingspan Illustrated Deluxe Box",
    category: "Board Games",
    price: 55.00,
    originalPrice: 65.00,
    rating: 5.0,
    reviewsCount: 97,
    badge: "Staff Pick",
    inStock: true,
    stockCount: 8,
    image: "images/products/bg-wingspan.jpg",
    shortDescription: "Relaxing, gorgeously illustrated ornithology engine-building board game featuring 170 unique species.",
    description: "You are bird enthusiasts seeking to discover and attract the best birds to your wildlife preserve. Features exquisite watercolor illustrations, custom pastel egg miniatures, dice-tower birdhouse, and balanced competitive or solo play modes.",
    specs: {
      "Players": "1 - 5 Players",
      "Play Time": "45 - 70 Minutes",
      "Age Grade": "10+ Years",
      "Designer": "Elizabeth Hargrave",
      "Manufacturer": "Stonemaier Games"
    }
  },
  {
    id: "toy-01",
    name: "LEGO Creator Expert Modular Bookshop",
    category: "Toys",
    price: 149.99,
    originalPrice: 169.99,
    rating: 4.9,
    reviewsCount: 210,
    badge: "Collector Essential",
    inStock: true,
    stockCount: 5,
    image: "images/products/toy-lego-bookshop.jpg",
    shortDescription: "2,504-piece modular architectural marvel featuring a charming European bookstore and adjoining townhouse.",
    description: "Capture the romantic charm of a quaint European village bookstore. Features 3-story modular removable floor sections, interior bookshelves, cozy reading nooks, vintage spiral staircase, autumn birch tree, and 5 minifigures.",
    specs: {
      "Pieces": "2,504 pcs",
      "Dimensions": "29 x 25 x 25 cm",
      "Age Grade": "16+ Years",
      "Theme": "Modular Buildings",
      "Manufacturer": "The LEGO Group"
    }
  },
  {
    id: "toy-02",
    name: "Vintage Wind-Up Clockwork Brass Robot",
    category: "Toys",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.6,
    reviewsCount: 31,
    badge: "Retro Classic",
    inStock: true,
    stockCount: 18,
    image: "images/products/toy-retro-robot.jpg",
    shortDescription: "Authentic tinplate mechanical walking robot wound by brass turnkey with sparking chest viewer.",
    description: "Faithfully reproduced from 1950s golden era mechanical toy designs. Crafted using traditional lithographed tinplate metal stamping. Turn the included antique brass key and watch him march purposefully across table surfaces with swinging arms.",
    specs: {
      "Power": "Mechanical Spring Clockwork",
      "Height": "21 cm",
      "Material": "Lithographed Tin & Brass",
      "Age Grade": "14+ (Collector Item)",
      "Manufacturer": "Schylling Heritage"
    }
  },
  {
    id: "toy-03",
    "name": "RC Quadcopter Falcon Pro 4K Drone",
    category: "Toys",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviewsCount: 65,
    badge: "Top Tech",
    inStock: true,
    stockCount: 9,
    image: "images/products/toy-rc-drone.jpg",
    shortDescription: "Foldable aerial drone with 4K UHD stabilized camera, optical flow hovering, and dual battery kit.",
    description: "Engineered for both beginners and hobbyist pilots. Features 1-key take-off and return, 360-degree stunt rolls, 28 minutes total airtime across two modular lipo packs, and real-time 5GHz FPV streaming directly to smartphone controller mount.",
    specs: {
      "Flight Time": "28 Mins (2 Batteries)",
      "Range": "350 Meters",
      "Camera": "4K Ultra HD 120° FOV",
      "Age Grade": "14+ Years",
      "Manufacturer": "SkyHawke Drones"
    }
  },
  {
    id: "toy-04",
    name: "Classic Heritage Wooden Train Express",
    category: "Toys",
    price: 39.99,
    originalPrice: 45.00,
    rating: 4.8,
    reviewsCount: 73,
    badge: "Childhood Heritage",
    inStock: true,
    stockCount: 14,
    image: "images/products/toy-wooden-train.jpg",
    shortDescription: "Sustainable natural beechwood train railway set with suspension bridge, station depot, and magnetic cars.",
    description: "Crafted from 100% FSC certified solid German beechwood with non-toxic water-based paints. Compatible with all major wooden rail brands. Includes 42 interlocking track pieces, working crane, magnetic locomotive, passenger wagons, and figurines.",
    specs: {
      "Track Length": "3.8 Meters Total",
      "Pieces": "68 Piece Playset",
      "Material": "Solid European Beechwood",
      "Age Grade": "3+ Years",
      "Manufacturer": "Eichhorn Heritage"
    }
  },
  {
    id: "die-01",
    name: "1969 Dodge Charger R/T 1:18 Diecast",
    category: "Diecast Cars",
    price: 69.99,
    originalPrice: 85.00,
    rating: 4.9,
    reviewsCount: 84,
    badge: "Muscle Legend",
    inStock: true,
    stockCount: 5,
    image: "images/products/die-dodge-charger.jpg",
    shortDescription: "Precision 1:18 heavyweight diecast replica in Midnight Black with opening 426 HEMI V8 engine bay and bumblebee tail stripe.",
    description: "The quintessential American muscle icon reproduced with museum-grade accuracy. Features fully articulated steering linked to front wheels, opening doors and hood, detailed 426 HEMI engine, carpeted interior cockpit, chrome five-spoke magnum wheels, and real rubber Goodyear tires.",
    specs: {
      "Scale": "1:18 Scale",
      "Length": "29.5 cm",
      "Material": "Heavy Diecast Metal & ABS",
      "Age Grade": "14+ Years",
      "Manufacturer": "Autoworld Elite"
    }
  },
  {
    id: "die-02",
    name: "1962 Ferrari 250 GTO 1:18 Diecast",
    category: "Diecast Cars",
    price: 74.99,
    originalPrice: 89.99,
    rating: 5.0,
    reviewsCount: 76,
    badge: "Motorsport Icon",
    inStock: true,
    stockCount: 4,
    image: "images/products/die-ferrari-250-gto.jpg",
    shortDescription: "Museum-grade 1:18 precision scale diecast replica of the legendary 1962 Ferrari 250 GTO in Rosso Corsa.",
    description: "Widely regarded as the holy grail of collector cars, this precision 1:18 diecast recreation of the 1962 Ferrari 250 GTO features hand-assembled photo-etched wire wheels, opening doors, detailed Colombo 3.0L V12 engine bay, authentic blue cloth bucket seats, and flawless mirror-polished Rosso Corsa lacquer.",
    specs: {
      "Scale": "1:18 Scale",
      "Length": "24.5 cm",
      "Material": "Diecast Zinc Alloy & Photo-Etched Parts",
      "Age Grade": "14+ Years",
      "Manufacturer": "CMC Classic Model Cars"
    }
  },
  {
    id: "die-03",
    name: "1961 Porsche 356 B Cabriolet 1:18 Diecast",
    category: "Diecast Cars",
    price: 48.50,
    originalPrice: 59.99,
    rating: 4.8,
    reviewsCount: 58,
    badge: "Vintage Classic",
    inStock: true,
    stockCount: 7,
    image: "images/products/die-porsche-356b.jpg",
    shortDescription: "Authentic 1:18 Bburago diecast scale replica of the classic 1961 Porsche 356 B Cabriolet in Royal Blue with chrome hubcaps.",
    description: "Faithfully scaled reproduction of the timeless rear-engine Stuttgart sports cabriolet. Finished in lustrous deep Royal Blue with folded convertible soft-top, functional front-wheel steering, opening front trunk with spare tire, chrome bumper overriders, and cream leatherette interior.",
    specs: {
      "Scale": "1:18 Scale",
      "Length": "22.2 cm",
      "Material": "Diecast Metal & ABS",
      "Age Grade": "14+ Years",
      "Manufacturer": "Bburago Heritage"
    }
  },
  {
    id: "die-04",
    name: "1957 Chevrolet Corvette 1:18 Diecast",
    category: "Diecast Cars",
    price: 58.00,
    originalPrice: 69.99,
    rating: 4.9,
    reviewsCount: 64,
    badge: "American Heritage",
    inStock: true,
    stockCount: 6,
    image: "images/products/die-corvette-1957.jpg",
    shortDescription: "Classic 1:18 diecast model car of the 1957 Chevrolet Corvette Fuel Injection roadster in Roman Red with Arctic White coves.",
    description: "The definitive 1950s American sports roadster recreated in heavyweight diecast. Features the classic two-tone Roman Red body with contrasting Arctic White side coves, panoramic wrap-around windscreen, authentic chrome spinner wheel covers, opening hood revealing the Rochester Ramjet Fuel-Injected 283 V8, and detailed red cockpit.",
    specs: {
      "Scale": "1:18 Scale",
      "Length": "24.0 cm",
      "Material": "Diecast Zinc Alloy & Vinyl",
      "Age Grade": "14+ Years",
      "Manufacturer": "Highway 61 Collectibles"
    }
  }
];

// Reusable getter function supporting both standalone variable and fetch API fallback
function fetchAllProducts() {
  return new Promise((resolve) => {
    // If running in browser where TOY_PRODUCTS is loaded in memory:
    if (typeof TOY_PRODUCTS !== 'undefined' && Array.isArray(TOY_PRODUCTS)) {
      resolve(TOY_PRODUCTS);
      return;
    }
    // Otherwise attempt fetch from JSON file
    fetch('data/products.json')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => resolve(data))
      .catch(err => {
        console.warn('Could not fetch products.json, falling back to local dataset.', err);
        resolve([]);
      });
  });
}

// Attach globally for access across all pages
window.TOY_PRODUCTS = TOY_PRODUCTS;
window.fetchAllProducts = fetchAllProducts;
