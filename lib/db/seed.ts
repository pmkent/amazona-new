import data from '@/lib/data'
import { connectToDatabase } from '@/lib/db'
import Product from '@/lib/db/models/product.model'
import { cwd } from 'process'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(cwd())

const main = async () => {
  try {
    const { products } = data
    await connectToDatabase(process.env.MONGODB_URI)

    await Product.deleteMany() //{})
    const createdProducts = await Product.insertMany(products)

    console.log({
      createdProducts,
      message: 'Seeded datababase successfully', // `Created ${createdProducts.length} products successfully`,
    })

    process.exit(0)
  } catch (error) {
    console.error(error)
    throw new Error('Error seeding database')
  }
}

main()
