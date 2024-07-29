import { FaTrash } from "react-icons/fa";
import {useMutation} from "@apollo/client";
import { DELETE_CLIENT} from '../mutations/clientMutations'
import { GET_CLIENTS } from "../queries/clientQuery";



export default function ClientRow({client}) {
  
  const [deleteClients] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    update(cache, {data:{deleteClients}}){
      const {clients} = cache.readQuery({query:
        GET_CLIENTS});
        cache.writeQuery({
          query:GET_CLIENTS,
          data:{clients:clients.filter(client=>client.id !== deleteClients.id)},
      })
    }
  });
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm"
        onClick={deleteClients}
        >
          <FaTrash/>
        </button>
      </td>
    </tr>
  )
}
