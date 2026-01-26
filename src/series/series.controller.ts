import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SeriesService } from './series.service';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Post()
  create(@Body() createSeriesDto: CreateSeriesDto) {
    return this.seriesService.create(createSeriesDto);
  }
  @Get("/popular")
  async findPopular(){
    return await this.seriesService.findPopular();
  }

  @Get("/detailCredits/:id")
  async getSeriesDetailCredits(@Param("id") id:string){
    return await this.seriesService.getSeriesDetailCredits(id);
  }
  @Get("/genres")
  async getSeriesGenres(){
    return await this.seriesService.getSeriesGenres()
  }

  @Get("/top_rated")
  async getTopRatedSeries(@Query("page") page:string){
    return await this.seriesService.getTopRatedSeries(page)
  }

  @Get("/on_the_air")
  async getOnTheAirSeries(@Query("page") page:string){
    return await this.seriesService.getOnTheAirSeries(page)
  }

  @Get("/with_genres")
  async getSeriesWithGenres(@Query("page") page:string, @Query("genres") genres : string){
    return await this.seriesService.getSeriesWithGenres(page, genres) 
  }
  @Get()
  findAll() {
    return this.seriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeriesDto: UpdateSeriesDto) {
    return this.seriesService.update(+id, updateSeriesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seriesService.remove(+id);
  }
}
