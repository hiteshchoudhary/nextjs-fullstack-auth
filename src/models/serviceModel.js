import { Schema, model } from 'mongoose';

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // Other service-related fields
  serviceProvider: {
    type: Schema.Types.ObjectId,
    ref: 'ServiceProvider',
    required: true,
  },
});

const Service = model('Service', serviceSchema);

export default Service;
