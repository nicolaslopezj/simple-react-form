import { SimpleSchema } from 'meteor/aldeed:simple-schema';

SimpleSchema.extendOptions({
  srf: Match.Optional(Object),
});
