import { Injectable } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import axios from 'axios';
import { InternalServerErrorException } from '@nestjs/common';
@Injectable()
export class SeriesService {
  create(createSeriesDto: CreateSeriesDto) {
    return 'This action adds a new series';
  }

  async findPopular(){
    try {
      let {data} = await axios({
        method:"get",
        url:`${process.env.TMDB_URL}/tv/popular?api_key=${process.env.TMDB_API}&language=en-US&page=1`
      })
      return data
    } catch (error) {
      return new InternalServerErrorException("Internal Server Error")
    }
  }
  async getSeriesDetail(id:string){
    try {
      const {data} = await axios({
        url:`${process.env.TMDB_URL}/tv/${id}?api_key=${process.env.TMDB_API}`,
        method:"get"
      })
      return data
    } catch (error) {
      return new InternalServerErrorException("Internal Server Error")
    }
  }
  async getSeriesCredits(id:string){
    try {
      const {data} = await axios({
        url:`${process.env.TMDB_URL}/tv/${id}/credits?api_key=${process.env.TMDB_API}`,
        method:"get"
      })
      return data
    } catch (error) {
      return new InternalServerErrorException("Internal Server Error")
    }
  }
  async getSeriesDetailCredits(id:string){
    try {
      const data = await this.getSeriesDetail(id);
      const creditsData = await this.getSeriesCredits(id);
      data.creditsData = creditsData
      return data
    } catch (error) {
      return new InternalServerErrorException("Internal Server Error")
    }
  }

  async getSeriesGenres(){
    try {
      const {data} = await axios({
        url:`${process.env.TMDB_URL}/genre/tv/list?api_key=${process.env.TMDB_API}`,
        method:"get"
      })
      return data;
    } catch (error) {
      return new InternalServerErrorException("Internal Server Error")
    }
  }
  findAll() {
    return `This action returns all series`;
  }

  findOne(id: number) {
    return `This action returns a #${id} series`;
  }

  update(id: number, updateSeriesDto: UpdateSeriesDto) {
    return `This action updates a #${id} series`;
  }

  remove(id: number) {
    return `This action removes a #${id} series`;
  }
}
