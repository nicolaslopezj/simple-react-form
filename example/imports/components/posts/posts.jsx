export default Posts = new Mongo.Collection('posts');

Posts.attachSchema({
  title: {
    type: String,
  },
  body: {
    type: String,
    srf: {
      type: 'textarea',
      rows: 3,
    },
  },
});
