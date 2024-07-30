import { gql } from '@apollo/client';

const ADD_CLIENT = gql`
    mutation addClients($name: String!, $email: String!, $phone: String!){
        addClients(name: $name, email: $email, phone: $phone) {
            id,
            name,
            email,
            phone
        }
    }
`


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

export { ADD_CLIENT, DELETE_CLIENT };