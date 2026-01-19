import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import axios from 'axios';
import { InternalServerErrorException } from '@nestjs/common';
@Injectable()
export class MoviesService {
  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  async findPopular(){
    try {
      let {data} = await axios({
        method:"get",
        url:`${process.env.TMDB_URL}/movie/popular?api_key=${process.env.TMDB_API}&language=en-US&page=1`
      })
      return data;
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
