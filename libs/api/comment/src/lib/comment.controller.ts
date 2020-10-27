import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiErrors, CurrentUser } from '@post-rest-api/common';
import {
  AuthUserDto,
  CommentDto,
  CreateCommentParamsDto,
} from '@post-rest-api/dtos';
import { CommentService } from './comment.service';

@Controller('comments')
@ApiTags('Comment')
@ApiErrors()
@ApiBearerAuth()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('post/:postId')
  @ApiOkResponse({ type: CommentDto, isArray: true })
  async get(@Param('postId') postId: string): Promise<CommentDto[]> {
    return this.commentService.getCommentsForPost(postId);
  }

  @Get(':id')
  @ApiOkResponse({ type: CommentDto })
  async getById(@Param('id') id: string): Promise<CommentDto> {
    return this.commentService.getComment(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiCreatedResponse({ type: CommentDto })
  async create(
    @CurrentUser() currentUser: AuthUserDto,
    @Body() dto: CreateCommentParamsDto
  ): Promise<CommentDto> {
    return this.commentService.createComment(currentUser.id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: CommentDto })
  async delete(
    @CurrentUser() currentUser: AuthUserDto,
    @Param('id') id: string
  ): Promise<CommentDto> {
    return this.commentService.deleteComment(currentUser.id, id);
  }
}
