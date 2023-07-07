"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AddPerson from "./addPerson";
import DeletePerson from "./deletePerson";
import UpdatePerson from "./updatePerson";

type Person = {
  id: number;
  person_name: string;
  age: number;
};

async function getPerson(): Promise<Person[]> {
  const res = await fetch("http://localhost:5000/person", { cache: "no-store" });
  return res.json();
}

export default function PersonList() {
  const [person, setPerson] = useState<Person[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const personData: Person[] = await getPerson();
        setPerson(personData);
      } catch (error) {
        console.error("Error fetching person data: ", error);
      }
    }

    fetchData();
  }, []);

 
  const isLoggedIn = true; 

  if (!isLoggedIn) {
    router.push("/login"); 
    return null; 
  }

  return (
    <div className="mx-10 my-10 overflow-x-auto">
      <div className="py-2">
        <AddPerson />
      </div>

      <table className="table w-full  ">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Age</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {person.map((person, index) => (
            <tr key={person.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b justify-center ">{person.person_name}</td>
              <td className="py-2 px-4 border-b justify-center ">{person.age}</td>
              <td className="py-2 px-4 border-b flex justify-center ">
                <UpdatePerson {...person} />
                <DeletePerson {...person} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}