export default async function CategoryDetails({params}) {
  const {category_id} = await params;
  return (
    <div>
      {category_id?.replaceAll('--', ' & ').replaceAll('-', ' ')}

    </div>
  )
}
