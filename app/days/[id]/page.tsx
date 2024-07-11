

const page = ({params}: {params: {id: string}}) => {
  return (
    <main className="ml-[15%]">
      {params.id}
    </main>
  )
}

export default page
