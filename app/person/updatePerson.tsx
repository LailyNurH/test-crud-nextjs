"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Person ={
    id: number;
    person_name:string;
    age:number;
}

export default function UpdatePerson(person :Person ) {
  const [person_name, setPersonName] = useState(person.person_name);
  const [age, setAge] = useState(person.age);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch(`http://localhost:5000/person/${person.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        person_name: person_name,
        age: age,
      }),
    });

    setIsMutating(false);

    setPersonName("");
    setAge("");
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleChange}>
       Update 
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Data Person</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Person Name</label>
              <input
                type="text"
                value={person_name}
                onChange={(e) => setPersonName(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Person Name"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Age</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Age"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}