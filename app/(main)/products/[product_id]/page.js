export default async function ProductDetails({params}) {
  const {product_id} = await params;
  return (
    <div>
      {product_id.replaceAll('-', ' ').replaceAll('--', ' & ')}
    </div>
  )
}
