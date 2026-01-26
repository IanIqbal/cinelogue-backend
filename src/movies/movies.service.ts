import { Inject, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import axios from 'axios';
import { InternalServerErrorException } from '@nestjs/common';
import { Redis } from '@upstash/redis';
import { HelpersService } from 'src/helpers/helpers.service';
import { RedisModule } from 'src/redis/redis.module';
@Injectable()
export class MoviesService {
  constructor(
    @Inject("REDIS_CLIENT") private readonly redisClient: Redis,
    private readonly helpersService: HelpersService
  ){}
  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  async findPopular(){
    try {
      
      let cachedData = await this.redisClient.get("popular_movies");
      
      if(cachedData){
        return cachedData
      }else{

        
        let {data} = await axios({
          method:"get",
          url:`${process.env.TMDB_URL}/movie/popular?api_key=${process.env.TMDB_API}&language=en-US&page=1`
        })
        
        let secondsUntilMidnight = this.helpersService.timeUntilMidnight(new Date());
        
        await this.redisClient.set("popular_movies", data, {
          ex: secondsUntilMidnight
        })
        return data;
      }
    } catch (error) {      
      return new InternalServerErrorException("Internal Server Error")
    }
  }
  async getMovieDetail(id:string){
    try {
      const {data} = await axios({
        url:`${process.env.TMDB_URL}/movie/${id}?api_key=${process.env.TMDB_API}`,
        method:"get"
      })
      return data
    } catch (error) {
      return new InternalServerErrorException("Internal Server Error")
    }
  }
  async getMovieCredits(id:string){
    try {
      const {data} = await axios({
        url:`${process.env.TMDB_URL}/movie/${id}/credits?api_key=${process.env.TMDB_API}`,
      })
      
      return data
    } catch (error) {
      
      return new InternalServerErrorException("Internal Server Error")
    }
  }
  async getMovieDetailCredits(id:string){
    try {
      const data = await this.getMovieDetail(id);
      const creditsData = await this.getMovieCredits(id);
      
      data.creditsData = creditsData
      return data
    } catch (error) {
      return new InternalServerErrorException("Internal Server Error")
    }
  }

  async getMoviesGenres(){
    try {
      const {data} = await axios({
        url:`${process.env.TMDB_URL}/genre/movie/list?api_key=${process.env.TMDB_API}`,
        method:"get"
      })
      return data
    } catch (error) {
      return new InternalServerErrorException("Internal Server Error")
    }
  }

  async getTopRatedMovies(page:string){
    try {
      const {data} = await axios({
        url:`${process.env.TMDB_URL}/movie/top_rated?api_key=${process.env.TMDB_API}&language=en-US&page=${page}`
      })

      return data
    } catch (error) {
      return new InternalServerErrorException("Internal Server Error")
    }
  }

  async getNowPlayingMovies(page:string){
    try {
      const {data} = await axios({
        url:`${process.env.TMDB_URL}/movie/now_playing?api_key=${process.env.TMDB_API}&page=${page}`,
        method:"get"
      })

      return data
    } catch (error) {
      return new InternalServerErrorException("Internal Server Error")
    }
  }

  async getUpComingMovies(page:string){
    try {
      
      const {data} = await axios({
        url:`${process.env.TMDB_URL}/movie/upcoming?api_key=${process.env.TMDB_API}&language=en-US&page=${+page}`
      })
      
      return data
    } catch (error) {
      return new InternalServerErrorException("Internal Server Error")
    }
  }

  async getMoviesWithGenres(page:string, genres : string){
    try {
      const{data} = await axios({
        url:`${process.env.TMDB_URL}/discover/movie?api_key=${process.env.TMDB_API}&language=en-US&include_adult=false&include_video=false&page=${page}&with_genres=${genres}`
      })
      return data;
    } catch (error) {
      return new InternalServerErrorException("Internal Server Error")
    }
  }
  findAll() {
    return `This action returns all movies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
