import build1 from '../Components/Images/img1.jpeg'
import build2 from '../Components/Images/img2.jpeg'
import build3 from '../Components/Images/img3.jpeg'
import build4 from '../Components/Images/img4.jpeg'
import build5 from '../Components/Images/img5.jpg'
import build6 from '../Components/Images/img6.jpg'

const imgSet = [build1, build2, build3, build4, build5, build6]

export const properties = [

  // ================= ORIGINAL 6 (NO PRICE ADDED) =================

  {
    slug: 'the-monarch-suite',
    title: 'The Monarch Suite',
    location: 'Banana Island, Lagos',
    fullAddress: '123 Banana Island Way, Ikoyi, Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    propertyType: 'apartment',
    image: build3,
    images: [build3, build2, build4, build1],
    type: 'buy',
    beds: 4,
    baths: 3,
    sqft: '2,400',
    yearBuilt: '2022',
    parking: '2 spaces',
    description:
      'Luxury waterfront apartment in Banana Island.',
    amenities: ['Swimming Pool', 'Gym', '24/7 Security', 'Parking', 'Elevator']
  },

  {
    slug: 'sapphire-heights',
    title: 'Sapphire Heights',
    location: 'Lekki Phase 1, Lagos',
    fullAddress: '45 Admiralty Way, Lekki Phase 1, Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    propertyType: 'penthouse',
    image: build2,
    images: [build2, build3, build4, build1],
    type: 'buy',
    beds: 6,
    baths: 5,
    sqft: '4,800',
    yearBuilt: '2023',
    parking: '3 spaces',
    description: 'Modern luxury penthouse.',
    amenities: ['Private Cinema', 'Wine Cellar', 'Gym', 'Pool']
  },

  {
    slug: 'ocean-view-villa',
    title: 'Ocean View Villa',
    location: 'Victoria Island, Lagos',
    fullAddress: '78 Ahmadu Bello Way, Victoria Island, Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    propertyType: 'villa',
    image: build4,
    images: [build4, build3, build2, build1],
    type: 'rent',
    beds: 5,
    baths: 4,
    sqft: '3,500',
    yearBuilt: '2021',
    parking: '2 spaces',
    description: 'Beachfront luxury villa.',
    amenities: ['Beach Access', 'Infinity Pool', 'Private Gym']
  },

  {
    slug: 'central-park-tower',
    title: 'Central Park Tower',
    location: 'Ikoyi, Lagos',
    fullAddress: '22 Bourdillon Road, Ikoyi, Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    propertyType: 'apartment',
    image: build4,
    images: [build4, build5, build6, build1],
    type: 'rent',
    beds: 3,
    baths: 3,
    sqft: '2,200',
    yearBuilt: '2022',
    parking: '2 spaces',
    description: 'Urban luxury apartment.',
    amenities: ['Rooftop Lounge', 'Pool', 'Gym', 'Co-working Space']
  },

  {
    slug: 'golden-estate',
    title: 'Golden Estate',
    location: 'Ajah, Lagos',
    fullAddress: '15 Abraham Adesanya Estate, Ajah, Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    propertyType: 'duplex',
    image: build5,
    images: [build5, build6, build1, build2],
    type: 'buy',
    beds: 5,
    baths: 4,
    sqft: '3,200',
    yearBuilt: '2023',
    parking: '3 spaces',
    description: 'Modern duplex estate.',
    amenities: ['Solar Panels', 'Fiber Internet', 'Private Garden']
  },

  {
    slug: 'pearl-gardens',
    title: 'Pearl Gardens',
    location: 'Ikeja GRA, Lagos',
    fullAddress: '8 Mobolaji Bank Anthony Way, Ikeja, Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    propertyType: 'apartment',
    image: build6,
    images: [build6, build1, build2, build3],
    type: 'rent',
    beds: 2,
    baths: 2,
    sqft: '1,500',
    yearBuilt: '2022',
    parking: '1 space',
    description: 'Cozy luxury apartments.',
    amenities: ['Pool', 'Gym', 'Backup Power']
  },

  // ================= 94 WEST AFRICA PROPERTIES =================

  ...Array.from({ length: 94 }).map((_, i) => {
    const countries = ['Nigeria', 'Ghana', 'Senegal', 'Ivory Coast', 'Benin']
    const cities = ['Lagos', 'Accra', 'Dakar', 'Abidjan', 'Cotonou']
    const types = ['apartment', 'duplex', 'villa', 'bungalow', 'penthouse']

    return {
      slug: `west-africa-property-${i + 1}`,
      title: `Luxury Estate ${i + 1}`,
      location: `${cities[i % cities.length]}, ${countries[i % countries.length]}`,
      fullAddress: `${10 + i} Main Street`,
      state: cities[i % cities.length],
      country: countries[i % countries.length],
      propertyType: types[i % types.length],
      image: imgSet[i % imgSet.length],
      images: imgSet,
      type: i % 2 === 0 ? 'buy' : 'rent',
      beds: (i % 7) + 1,
      baths: (i % 5) + 1,
      sqft: `${1200 + i * 40}`,
      yearBuilt: 2018 + (i % 7),
      parking: `${1 + (i % 3)} spaces`,
      description: `Beautiful ${types[i % types.length]} located in West Africa.`,
      amenities: ['Security', 'Parking', 'Water Supply', 'Internet']
    }
  })

]