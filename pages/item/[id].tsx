import type { GetServerSideProps, NextPage } from 'next'


type ItemData = {
  id: number
  name: string
}

type ResponseData = {
  data: ItemData[],
  status: String
}


const ItemPage: NextPage<ResponseData> = (data: ResponseData) => {

  return (
    <>
      {
        data.data.map(({ id, name }) => {
          return (

            <div key={id}>
              id = {id} , name = {name}
              <br />
            </div>

          )
        })
      }
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {

  const { id } = context.query;

  const res = await fetch(`http://localhost:3000/api/data`)
  const data = res.json()

  return {
    props: data
  }

}

export default ItemPage
