import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import {ADD_CLIENT} from '../mutations/clientMutations';
import { GET_CLIENTS } from "../queries/clientQuery";

export default function AddClientModal() {

const [name, setName] = useState('');   
const [email, setEmail] = useState('');   
const [phone, setPhone] = useState('');  

const [addClients] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone},
    update(cache, {data: {addClients}}){
        const {clients} = cache.readQuery({query: GET_CLIENTS});
        cache.writeQuery({
            query: GET_CLIENTS,
            data: {clients: [...clients, addClients]}
        })
    }
})

const createClient = (e) =>{
    e.preventDefault();
    if(name ===''||email===''||phone===''){
        return alert('Please fill all the fields');
    }
    addClients(name, email, phone);
    setName('');
    setEmail('');
    setPhone('');
}
  return (
    <>

<button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModal">
    <div className="d-flex align-items-center">
        <FaUser className="icon"/>
        <div>Add Client</div>
    </div>
</button>


<div className="modal fade" id="addClientModal" role="dialog" aria-labelledby="addClientModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="addClientModalLabel">Add Client</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div className="modal-body">
        <form onSubmit={createClient}>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" id="name"
                value={name} onChange={(e)=> setName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" id="email"
                value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" id="phone"
                value={phone} onChange={(e)=> setPhone(e.target.value)}/>
            </div>
            <button className="btn btn-secondary" data-bs-dismiss="modal" type="submit">Create</button>
        </form>
      </div>
    </div>
  </div>
</div>
    </>
  )
}
