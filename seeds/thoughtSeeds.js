const {Thought} = require('../models/Thought');
const thoughtsSeed = [
    {
      thoughtText: 'This is a sample thought.',
      createdAt: new Date(),
      username: 'john_doe',
      reactions: [],
    },
    {
      thoughtText: 'Another thought here.',
      createdAt: new Date(),
      username: 'jane_smith',
      reactions: [],
    },
    {
        thoughtText: 'This is a great thought',
        createdAt: new Date(),
        username: 'paddy_bell',
        reactions: [],
      },
      {
        thoughtText: 'My second thought.',
        createdAt: new Date(),
        username: 'jane_smith',
        reactions: [],
      },
      {
        thoughtText: 'Another thought here.',
        createdAt: new Date(),
        username: 'todd_frog',
        reactions: [],
      },
      {
        thoughtText: 'Another thought here.',
        createdAt: new Date(),
        username: 'dennis_theMenis',
        reactions: [],
      },
      {
        thoughtText: 'I\'m him.',
        createdAt: new Date(),
        username: 'jimmy_himmy',
        reactions: [],
      },
  
  ];
  
  module.exports = thoughtsSeed;
  