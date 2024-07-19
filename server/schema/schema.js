const {project, clients, projects } = require('../sampleData.js');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require('graphql');

const ClientType = new GraphQLObjectType({
    name:'Client',
    fields: () => ({
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        email: {type:GraphQLString},
        phone: {type:GraphQLString},
    })
})

const ProjectType = new GraphQLObjectType({
    name:'Project',
    fields: () => ({
        id: {type:GraphQLID},
        clientId: {type:GraphQLID},
        name: {type:GraphQLString},
        description: {type:GraphQLString},
        status: {type:GraphQLString},
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {

        clients: {
            type: new GraphQLList(ClientType),
            resolve() {
                return clients
            }
        },

        client: {
            type: ClientType,
            args: {id: {type:GraphQLID}},
            resolve(parent, arg) {
                return clients.find(client => client.id == arg.id);
            }
        },

        projects: {
            type: new GraphQLList(ProjectType),
            resolve() {
                return projects
            }
        },

        project: {
            type: ProjectType,
            args: {id: {type:GraphQLID}},
            resolve(parent, arg) {
                return projects.find(project => project.id == arg.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})