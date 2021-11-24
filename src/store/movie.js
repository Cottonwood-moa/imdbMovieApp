import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'  //_uniqBy(Search,'imdbID') => 배열의 고유화.
const _defaultMessage = 'Search for the movie title!'
export default{
  namespaced:true, //모듈로서 활용될 수 있다는 속성 true 명시해주고 시작한다.
  // data 함수로 return 해야지 데이터 불변성에서 문제가 생기지 않는다. (객체,배열,함수 데이터 참조 관련)
  state:()=>({
    movies:[],
    message:_defaultMessage,
    loading: false
  }),
  // computed
  getters:{},
  // methods (mutations,actions)
  // vuex 저장소에서 실제로 상태를 변경하는 유일한 방법은 mutations이다.
  mutations:{
    updateState(state, payload){ // payload에는 Search 값이 들어가있음 영화 10개 -> 객체형태로
      // ['movies','message','loading'].
      // Object.keys -> 객체 데이터의 속성의 이름들을 가지고 새로운 배열 데이터를 만듬
      console.log('그냥 페이로드',payload)
      console.log('객체의 key',Object.keys(payload))//
      // payload에는 actions에서 넘어온 키 밸류 형태의 객체데이터들이 들어가 있다.
      Object.keys(payload).forEach(key =>{ // 넘어온 key값 (movies, message, loading ...)
        state[key] = payload[key] // state.movies === state['movies']
        // state.key 라고 하면 state에서 movies 처럼 정의된 key를 찾기 때문에 [key] <- 이렇게 적어준다. forEach의 매개변수로써 key를 활용하기위해.
      })
    },
    resetMovies(state){
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    }
  },
  actions:{
    // 정의된 함수의 첫번째 매개변수에는 state,getters,mutations 같은 store 파일의 속성을 이용할 수 있는 내용이 들어가 있다.
    // 두번째 매개변수는 함수를 호출할때 받아오는 인수
    async searchMovies({commit,state}, payload){
      if (state.loading){
        return
      } //사용자가 apply버튼을 여러번 누를시 바로 return 하기

      commit('updateState',{
        message:'',
        movies:'',
        loading:true,
        theMovie:{}
      })
      try{
      // const { title, type, number, year} = payload // Search.vue에서 받아는 데이터 (사용자가 입력하는 데이터)
      const res = await _fetchMovies({
        ...payload,
        page:1
      })
      const {Search, totalResults} = res.data //결과로 나온 Search, totalResults를 바로 변수로 만들어 객체분해할당. 지정변수로 쓰려면 anyVar:Search 의 형태로 할당
      
      commit('updateState',{ //context.commit
        movies: _uniqBy(Search,'imdbID') // movies: Search의 키 밸류인 객체를 updateState의 payload에 할당함.
        // message:'Hello world',
        // loading: true
        // 이런식으로 이후 들어가게 될 message나 loading의 key값을 updateState에서 활용할 수 있음

      })
      console.log(totalResults) // 268
      console.log(typeof totalResults) // String

      const total = parseInt(totalResults, 10) // 10진법으로 변환
      const pageLength = Math.ceil(total / 10) //ceil -> 올림
      //추가 요청
      if(pageLength > 1){
        for(let page = 2; page <= pageLength; page += 1){
          if(page > (payload.number /10)) break
          const res = await _fetchMovies({
            ...payload,
            page
          })
          const {Search} =res.data
          commit('updateState',{
            movies: [
              ...state.movies, 
              ..._uniqBy(Search,'imdbID')]
          })
        }
      }
      }catch(message){
        commit('updateState',{
          movies:[],
          message
        })
      } finally{
        commit('updateState',{
          loading:false
        })
      }
    },
    async searchMovieWithId({state,commit}, payload){
      if(state.loading) return
      commit('updateState',{
        loading:true
      })
      try{
        const res = await _fetchMovies(payload)
        commit('updateState',{
          theMovie:res.data
        })
      }catch(error){
        commit('updateState',{
          theMovie:{}
        })
      }finally{
        commit('updateState',{
          loading:false
        })
      }
    }
  }
}

function _fetchMovies(payload){
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = '7035c60c'
  const url = id 
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  return new Promise((resolve,reject)=>{
    axios.get(url)
    .then(res=>{
      console.log(res)
      if(res.data.Error){
        reject(res.data.Error)
      }
      resolve(res)
    })
    .catch(err=>{
      reject(err.message)
    })
  })
}