const traits = ['name', 'email', 'year'];
const members = [
  {
    name: 'John',
    email: 'johnamadeo.daniswara@gmail.com',
    year: '2019',
  },
  {
    name: 'Tuan',
    email: 'tuandoan.nguyen@yale.edu',
    year: '2019',
  },
];

export function fetchMembers(csv) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ members, traits });
    }, 1000);
  });
};

export function fakeFetch(response) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(response);
    }, 1000);
  });
}