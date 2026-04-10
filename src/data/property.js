import build1 from '../Components/Images/img1.jpeg'
import build2 from '../Components/Images/img2.jpeg'
import build3 from '../Components/Images/img3.jpeg'
import build4 from '../Components/Images/img4.jpeg'
import build5 from '../Components/Images/img5.jpg'
import build6 from '../Components/Images/img6.jpg'

export const properties = [
  {
    slug: 'the-monarch-suite',
    title: 'The Monarch Suite',
    location: 'Banana Island, Lagos',
    fullAddress: '123 Banana Island Way, Ikoyi, Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    image: build3,
    images: [build3, build2, build4],
    type: 'buy',
    beds: 4,
    baths: 3,
    sqft: '2,400',
    yearBuilt: '2022',
    parking: '2 spaces',
    description:
      'Experience luxury living at its finest in The Monarch Suite. This stunning 4-bedroom apartment features premium finishes and breathtaking views.',
    amenities: ['Swimming Pool', 'Gym', '24/7 Security', 'Parking', 'Elevator'],
    nearby: ['Banana Island Club (5 min)', 'Lekki Conservation Centre (10 min)']
  },

  {
    slug: 'sapphire-heights',
    title: 'Sapphire Heights',
    location: 'Lekki Phase 1, Lagos',
    fullAddress: '45 Admiralty Way, Lekki Phase 1, Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    image: build2,
    images: [build2, build3, build4],
    type: 'buy',
    beds: 6,
    baths: 5,
    sqft: '4,800',
    yearBuilt: '2023',
    parking: '3 spaces',
    description:
      'Sapphire Heights is a masterpiece of modern architecture with smart home features and luxurious interiors.',
    amenities: ['Private Cinema', 'Wine Cellar', 'Gym', 'Pool'],
    nearby: ['Novare Mall (3 min)', 'Lagos Business School (8 min)']
  },

  {
    slug: 'ocean-view-villa',
    title: 'Ocean View Villa',
    location: 'Victoria Island, Lagos',
    fullAddress: '78 Ahmadu Bello Way, Victoria Island, Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    image: build4,
    images: [build4, build3, build2],
    type: 'rent',
    beds: 5,
    baths: 4,
    sqft: '3,500',
    yearBuilt: '2021',
    parking: '2 spaces',
    description:
      'Wake up to stunning ocean views every morning in this beautiful beachfront villa.',
    amenities: ['Beach Access', 'Infinity Pool', 'Private Gym'],
    nearby: ['Landmark Beach (2 min)', 'Eko Atlantic (7 min)']
  },

  {
    slug: 'central-park-tower',
    title: 'Central Park Tower',
    location: 'Ikoyi, Lagos',
    fullAddress: '22 Bourdillon Road, Ikoyi, Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    image: build4,
    images: [build4, build5, build6, build1],
    type: 'rent',
    beds: 3,
    baths: 3,
    sqft: '2,200',
    yearBuilt: '2022',
    parking: '2 spaces',
    description:
      'Central Park Tower offers contemporary urban living in the heart of Ikoyi.',
    amenities: ['Rooftop Lounge', 'Pool', 'Gym', 'Co-working Space', 'Concierge'],
    nearby: ['Parkview Estate (3 min)', 'Ikoyi Club (8 min)']
  },

  {
    slug: 'golden-estate',
    title: 'Golden Estate',
    location: 'Ajah, Lagos',
    fullAddress: '15 Abraham Adesanya Estate, Ajah, Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    image: build5,
    images: [build5, build6, build1, build2],
    type: 'buy',
    beds: 5,
    baths: 4,
    sqft: '3,200',
    yearBuilt: '2023',
    parking: '3 spaces',
    description:
      'Golden Estate is a newly developed luxury compound featuring spacious homes with modern amenities.',
    amenities: ['Solar Panels', 'Fiber Internet', 'Private Garden', 'Security Gate'],
    nearby: ['Ajah Market (5 min)', 'Novare Mall (10 min)']
  },

  {
    slug: 'pearl-gardens',
    title: 'Pearl Gardens',
    location: 'GRA, Ikeja',
    fullAddress: '8 Mobolaji Bank Anthony Way, Ikeja, Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    image: build6,
    images: [build6, build1, build2, build3],
    type: 'rent',
    beds: 2,
    baths: 2,
    sqft: '1,500',
    yearBuilt: '2022',
    parking: '1 space',
    description:
      'Pearl Gardens offers cozy yet luxurious apartments in the heart of Ikeja GRA.',
    amenities: ['Swimming Pool', 'Gym', 'Backup Power', 'CCTV'],
    nearby: ['Ikeja City Mall (5 min)', 'MMIA Airport (12 min)']
  }
]