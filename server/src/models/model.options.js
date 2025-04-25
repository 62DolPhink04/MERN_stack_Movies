const modelOptions = {
  toJSON: {
    VirtualTypes: true,
    transform: (_, obj) => {
      delete obj._id;
      return obj;
    },
  },
  toObject: {
    VirtualTypes: true,
    transform: (_, obj) => {
      delete obj._id;
      return obj;
    },
  },
  versionkey: false,
  timestamps: true,
};

export default modelOptions;
