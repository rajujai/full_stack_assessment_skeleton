import { PageRequest } from '@dto/page-request.dto';
import { ApiProperty } from '@nestjs/swagger';

export interface PageMetaDtoParameters {
  pageRequest: PageRequest;
  itemCount: number;
}

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly size: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pageRequest, itemCount }: PageMetaDtoParameters) {
    this.page = pageRequest.page;
    this.size = pageRequest.size;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.size);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
