function fetchMovies(title){
  const OMDB_API_KEY = '7035c60c123'
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve,reject)=>{
    try{
      const res = await axios.get(`http://omdbapi.com?apikey=${OMDB_API_KEY}&s=${title}`)
      resolve(res)
    } catch(error){
      reject('잘못된 API KEY')
    }
  })
}

async function test(){
 const res = await fetchMovies('frozen')
 console.log(res)
}

test()