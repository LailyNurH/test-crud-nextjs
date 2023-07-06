import AddPerson from "./addPerson";
import DeletePerson from "./deletePerson";
import UpdatePerson from "./updatePerson";

type Person ={
    id: number;
    person_name:string;
    age:number;
}
async function getPerson() {
    const res = await fetch('http://localhost:5000/person',{cache: 'no-store'},
    );
    return res.json();
    
}
export default async function PersonList() {
    const person: Person[]= await getPerson();
    return (
        <div className = "py-10 px-10">
            <div className="py-2">
                <AddPerson />
            </div>

            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name Person</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                     {person.map((person,index)=>(
                    <tr key={person.id} >
                       <td>{index+1}</td>
                       <td>{person.person_name}</td>
                       <td>{person.age}</td>
                       <td className="flex mx-1">
                         <UpdatePerson {...person}/>
                        <DeletePerson {...person}/>
                       </td>
                     </tr>
             ))}
             </tbody>
             </table>
             </div>

    );
    
}