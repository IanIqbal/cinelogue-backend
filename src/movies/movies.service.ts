import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import axios from 'axios';
@Injectable()
export class MoviesService {
  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  async findPopular(){
    try {
      let {data} = await axios({
        method:"get",
        url:`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API}&language=en-US&page=1`
      })
      return data;
    } catch (error) {
      console.log(error, "<<<<");
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
