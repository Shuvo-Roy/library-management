import mongoose, { Schema, Document, Model } from 'mongoose';

// genre 
export enum Genre {
  FICTION = 'FICTION',
  NON_FICTION = 'NON_FICTION',
  SCIENCE = 'SCIENCE',
  HISTORY = 'HISTORY',
  BIOGRAPHY = 'BIOGRAPHY',
  FANTASY = 'FANTASY',
}


// book interface
interface IBook extends Document {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  checkAvailability(): void;
}

// book schema
const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, enum: Object.values(Genre), required: true },
  isbn: { type: String, required: true, unique: true },
  description: { type: String },
  copies: { type: Number, required: true, min: 0 },
  available: { type: Boolean, default: true },
}, { timestamps: true });

// check availabilty
bookSchema.methods.checkAvailability = function () {
  this.available = this.copies > 0;
};

bookSchema.pre<IBook>('save', function (next) {
  this.checkAvailability();
  next();
});

const Book: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);
export default Book;
