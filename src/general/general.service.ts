import { Injectable } from '@nestjs/common';
import { CreateGeneralDto } from './dto/create-general.dto';
import { UpdateGeneralDto } from './dto/update-general.dto';
import { InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class GeneralService {
  create(createGeneralDto: CreateGeneralDto) {
    return 'This action adds a new general';
  }
  async searchAll(query:string, page:string){
    try {
      const {data} = await axios({
        url:`${process.env.TMDB_URL}/search/multi?api_key=${process.env.TMDB_API}&language=en-US&query=${query}&page=${page}&include_adult=false`,
        method:"get"
      })
      return data
    } catch (error) {
      return new InternalServerErrorException("Internal Server Error")
    }
  }
  findAll() {
    return `This action returns all general`;
  }

  findOne(id: number) {
    return `This action returns a #${id} general`;
  }

  update(id: number, updateGeneralDto: UpdateGeneralDto) {
    return `This action updates a #${id} general`;
  }

  remove(id: number) {
    return `This action removes a #${id} general`;
  }
}
