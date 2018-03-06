module.exports = {
  Query: {
    allPersons: async (parent, args, { Person }) => {
      const persons = await Person.find();
      return persons.map( x => {
        x._id = x._id.toString()
        return x;
      })
      // return persons.map(x => ({ ...x, _id: x._id.toString() }));
    },
    getPerson: async (parent, { id }, { Person }) => {
      const person = await Person.findById(id);
      person._id = person._id.toString();
      return person;
    }
  },
  Mutation: {
    createPerson: async (parent, args, { Person }) => {
      const person = await new Person(args).save();
      person._id = person._id.toString();
      return person;
    },
    changeNickName: async (parent, { id, nickName }, { Person }) => {
      const newPerson = await Person.findById(id);
      newPerson.set({
        nickName
      });
      await newPerson.save();
      return newPerson;
    }
  }
};