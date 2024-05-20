const testCollections = [
    {
        title: 'Water',
        photos: [
            'N04FIfHhv_k',
            '2l0CWTpcChI',
            'U3aF7hgUSrk'
        ]
    },
    {
        title: 'Dogs',
        photos: [
            'NH1d0xX6Ldk',
            '73pyV0JJOmE'
        ]
    },
    {
        title: 'Cats',
        photos: [
            'NH1d0xX6Ldk',
        ]
    }
]
const createTestCollection = () => localStorage.setItem('collections', JSON.stringify(testCollections));

export default createTestCollection;