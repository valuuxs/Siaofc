//@Dev.Criss 🇦🇱
import mongoose from 'mongoose';

const { Schema, connect, model: _model } = mongoose;
const defaultOptions = { useNewUrlParser: true, useUnifiedTopology: true };

export class mongoDB {
  constructor(url, options = defaultOptions) {
    this.url = url;
    this.options = options;
    this.data = this._data = {};
    this._schema = {};
    this._model = {};
    this.db = connect(this.url, { ...this.options }).catch(console.error);
  }

  async read() {
    this.conn = await this.db;
    this._schema = new Schema({
      data: {
        type: Object,
        required: true,
        default: {}
      }
    });
    try {
      this._model = _model('data', this._schema);
    } catch {
      this._model = _model('data');
    }
    this._data = await this._model.findOne({});
    if (!this._data) {
      this.data = {};
      await this.write(this.data);
      this._data = await this._model.findOne({});
    } else {
      this.data = this._data.data;
    }
    return this.data;
  }

  async write(data) {
    if (!data) throw new Error('No data provided');
    if (!this._data) return new this._model({ data }).save();

    const doc = await this._model.findById(this._data._id);
    if (!doc) throw new Error('Document not found'); // Manejo de error si no se encuentra el documento
    if (!doc.data) doc.data = {};
    doc.data = data;
    this.data = {};
    return doc.save();
  }
}

export const mongoDBV2 = class MongoDBV2 {
  constructor(url, options = defaultOptions) {
    this.url = url;
    this.options = options;
    this.models = [];
    this.data = {};
    this.lists = null;
    this.list = null;
    this.db = connect(this.url, { ...this.options }).catch(console.error);
  }

  _getModel(name, schema) {
    try {
      return _model(name);
    } catch {
      return _model(name, schema);
    }
  }

  async read() {
    this.conn = await this.db;
    const listSchema = new Schema({
      data: [{
        name: String,
      }]
    });
    try {
      this.list = _model('lists', listSchema);
    } catch {
      this.list = _model('lists');
    }
    this.lists = await this.list.findOne({});
    
    // Verificación de listas
    if (!this.lists || !this.lists.data) {
      await this.list.create({ data: [] });
      this.lists = await this.list.findOne({});
    }

    let garbage = [];

    for (let { name } of this.lists.data) {
      let collection;
      try {
        collection = this._getModel(name, new Schema({ data: Array }));
      } catch (e) {
        console.error(e);
        garbage.push(name);
        continue; // Continuar si hay un error
      }
      this.models.push({ name, model: collection });

      let collectionsData = await collection.find({});
      this.data[name] = Object.fromEntries(
        collectionsData.map(v => {
          if (Array.isArray(v.data) && v.data.length === 2) {
            return [v.data[0], v.data[1]];
          }
          return [v._id.toString(), v.data];
        })
      );
    }

    try {
      let del = await this.list.findById(this.lists._id);
      del.data = del.data.filter(v => !garbage.includes(v.name));
      await del.save();
    } catch (e) {
      console.error(e);
    }

    return this.data;
  }

  async write(data) {
    if (!this.lists || !data) throw new Error('Missing lists or data');
    let collections = Object.keys(data);
    let listDoc = [];

    for (let key of collections) {
      let index = this.models.findIndex(v => v.name === key);
      let doc;
      if (index !== -1) {
        doc = this.models[index].model;
        await doc.deleteMany().catch(console.error);
        await doc.insertMany(
          Object.entries(data[key]).map(([k, v]) => ({ data: [k, v] }))
        );
        listDoc.push({ name: key });
      } else {
        const schema = new Schema({ data: Array });
        try {
          doc = this._getModel(key, schema);
        } catch (e) {
          console.error(e);
          doc = _model(key);
        }
        if (index === -1) {
          this.models.push({ name: key, model: doc });
        } else {
          this.models[index] = { name: key, model: doc };
        }
        await doc.insertMany(
          Object.entries(data[key]).map(([k, v]) => ({ data: [k, v] }))
        );
        listDoc.push({ name: key });
      }
    }

    let doc = await this.list.findById(this.lists._id);
    doc.data = listDoc;
    this.data = {};
    await doc.save();

    return true;
  }
}