const BillsData = [
  {
    id: 1,
    place: 'Burger King',
    totalAmount: 4000,
    completed: false,
    customers: [
      {
        id: 1,
        firstName: 'Josue',
        lastName: 'Vidaur',
        phone: '',
        amount: 0.4
      },
      {
        id: 2,
        firstName: 'Carlos',
        lastName: 'Martinez',
        phone: '',
        amount: 0.6
      }
    ]
  },
  {
    id: 2,
    place: 'Kentuky',
    totalAmount: 200,
    completed: false,
    customers: [
      {
        id: 1,
        firstName: 'Josue',
        lastName: 'Vidaur',
        phone: '',
        amount: 1
      }
    ]
  }
];
export default BillsData;
