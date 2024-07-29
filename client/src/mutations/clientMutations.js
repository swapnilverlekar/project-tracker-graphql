import { gql } from '@apollo/client';

const DELETE_CLIENT = gql`
    mutation deleteClients($id: ID!){
        deleteClients(id: $id) {
            id,
            name,
            email,
            phone
        }
    }
`

export { DELETE_CLIENT };