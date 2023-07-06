"use client";

import {  useState } from "react";
import { useRouter } from "next/navigation";

type Person ={
    id: number;
    person_name:string;
    age:number;
};

export default function DeletePerson(person: Person) {

  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(personId:number) {
   
    setIsMutating(true);

    await fetch(`http://localhost:5000/person/${personId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    
    });

    setIsMutating(false);


    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-sm btn-error" onClick={handleChange}>
        Delete
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure to delete this  {person.person_name} ?</h3>
            
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="button" onClick={() =>handleDelete(person.id)} className="btn btn-error ">
                  Delete
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Deleting...
                </button>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}