const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
} = require('graphql')

const db = require("../models/index")

const userModel = db.sequelize.models.User

const User = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
})

const querys = new GraphQLObjectType({
    name: "Querys",
    fields: {
        getUser: {
            type: User,
            args: {
                id: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return userModel.findOne({
                    where: {
                        id: args.id
                    }
                })
            }
        },
        getAllUsers: {
            type: GraphQLList(User),
            resolve(parent, args) {
                return userModel.findAll()
            }
        }
    }
})

var mutations = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: User,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return userModel.create({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    age: args.age
                })
            }
        },
        deleteUser: {
            type: User,
            args:{ id: { type: GraphQLInt } },
            resolve(parent, args){
                return userModel.destroy({
                    where:{
                        id: args.id
                    }
                })
            }
        },
        updateUser: {
            type: User,
            args: {
                id: { type: GraphQLInt },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return userModel.update({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    age: args.age
                }, {
                    where: {
                        id: args.id
                    }
                })
            }
        }
        
    }
});

module.exports = new GraphQLSchema({
    query: querys,
    mutation: mutations
})
