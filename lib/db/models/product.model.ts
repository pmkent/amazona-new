import { IProductInput } from '@/types'
import { Document, model, Model, models, Schema } from 'mongoose'

export interface IProduct extends Document, IProductInput {
  _id: string
  createdAt: Date
  updatedAt: Date
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    images: [String],
    brand: { type: String, required: true },
    description: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    price: { type: Number, required: true },
    listPrice: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    tags: { type: [String], default: ['new arrival'] },
    colors: { type: [String], default: ['White', 'Red', 'Black'] },
    sizes: { type: [String], default: ['S', 'M', 'L'] },
    avgRating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    ratingDistribution: [
      {
        rating: { type: Number, required: true },
        count: { type: Number, required: true },
      },
    ],
    numSales: { type: Number, required: true, default: 0 },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
        default: [],
      },
    ],
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
  }
)

const Product =
  (models.Product as Model<IProduct>) ||
  model<IProduct>('Product', productSchema)

export default Product
