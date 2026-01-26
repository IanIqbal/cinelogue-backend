import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get("/popular")
  async findPopular() {
    return await this.moviesService.findPopular();
  }

  @Get("/detailCredits/:id")
  async getMovieDetail(@Param("id") id: string) {    
    return await this.moviesService.getMovieDetailCredits(id);
  }

  @Get("/genres")
  async getMoviesGenres(){
    return await this.moviesService.getMoviesGenres()
  }
  @Get("/top_rated")
  async getTopRatedMovies(@Query("page") page:string){
    return await this.moviesService.getTopRatedMovies(page)
  }

  @Get("/now_playing")
  async getNowPlayingMovies(@Query("page") page:string){
    return await this.moviesService.getNowPlayingMovies(page)
  }

  @Get("/upcoming")
  async getUpComingMovies(@Query("page") page:string){
    return await this.moviesService.getUpComingMovies(page)
  }

  @Get("/with_genres")
  async getMoviesWithGenres(@Query("page") page:string, @Query("genres") genres : string){
    return await this.moviesService.getMoviesWithGenres(page, genres)
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
