export default async function ProductDetails({params}) {
  const {product_id} = await params;
  const categoryTitle = product_id.replaceAll('-', ' ').replaceAll('--', ' & ');
  return (
    <div>
      
    </div>
  )
}
