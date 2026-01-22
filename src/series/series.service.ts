import { Inject, Injectable } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import axios from 'axios';
import { InternalServerErrorException } from '@nestjs/common';
import dayjs from "../common/dayjs.util"
import { HelpersService } from 'src/helpers/helpers.service';

@Injectable()
export class SeriesService {
  constructor(
    @Inject("REDIS_CLIENT") private readonly redisClient: any,
    private readonly helpersService: HelpersService
  ){}
  create(createSeriesDto: CreateSeriesDto) {
    return 'This action adds a new series';
  }

  async findPopular(){
    try {
      const seriesCache = await this.redisClient.get("popular_series");
      if(seriesCache){
        return seriesCache
      }else{

        let {data} = await axios({
          method:"get",
          url:`${process.env.TMDB_URL}/tv/popular?api_key=${process.env.TMDB_API}&language=en-US&page=1`
        })
        let secondsUntilMidnight = this.helpersService.timeUntilMidnight(new Date());
        await this.redisClient.set("popular_series", data, {
          ex: secondsUntilMidnight
        })
        return data
      }
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

  async getTopRatedSeries(page:string){
    try {
      const {data} = await axios({
        url:`${process.env.TMDB_URL}/tv/top_rated?api_key=${process.env.TMDB_API}&language=en-US&page=${page}`,
        method:"get"
      })

      return data
    } catch (error) {
      return new InternalServerErrorException("Internal Server Error")
    }
  }

  async getOnTheAirSeries(page:string){
    try {
      const {data} = await axios({
        url:`${process.env.TMDB_URL}/tv/on_the_air?api_key=${process.env.TMDB_API}&language=en-US&page=${page}`,
        method:"get"
      })

      return data
    } catch (error) {
      return new InternalServerErrorException("Internal Server Error")
    }
  }

  async getSeriesWithGenres(page:string, genres : string){
    try {
      
      const {data} = await axios({
        url:`${process.env.TMDB_URL}/discover/tv?api_key=${process.env.TMDB_API}&language=en-US&with_genres=${genres}&page=${+page}&include_adult=false&include_video=false`,
        method:"get"
      })
      return data
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
