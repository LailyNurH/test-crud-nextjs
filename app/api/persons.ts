import { NextApiRequest, NextApiResponse } from 'next';

type Person = {
  id: number;
  person_name: string;
  age: number;
};

let persons: Person[] = [
  { id: 1, person_name: 'John Doe', age: 30 },
  { id: 2, person_name: 'Jane Smith', age: 25 },
  { id: 3, person_name: 'Bob Johnson', age: 40 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(persons);
      break;
    case 'POST':
      const newPerson: Person = req.body;
      persons = [...persons, newPerson];
      res.status(201).json(newPerson);
      break;
    case 'PUT':
      const updatedPerson: Person = req.body;
      persons = persons.map((person) => (person.id === updatedPerson.id ? updatedPerson : person));
      res.status(200).json(updatedPerson);
      break;
    case 'DELETE':
      const { id } = req.query;
      persons = persons.filter((person) => person.id !== Number(id));
      res.status(200).json({ message: 'Person deleted successfully' });
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}