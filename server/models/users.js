import mongoose from 'mongoose';
//import { fieldEncryption } from 'mongoose-field-encryption';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

const UserSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    minlength: 3,
    maxlength: 50,
    required: true
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  isAdmin: { type: mongoose.SchemaTypes.Boolean, default: false }
});

//custom method to generate authToken
UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin },
    process.env.SESSION_SECRET
  );
  return token;
};

/*
UserSchema.plugin(fieldEncryption, {
  fields: ['password'],
  secret: process.env.SECRET,
});
 */

export function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required()
  };

  return Joi.validate(user, schema);
}

UserSchema.index({ email: 1, type: 1 });

export default mongoose.model('user', UserSchema);

