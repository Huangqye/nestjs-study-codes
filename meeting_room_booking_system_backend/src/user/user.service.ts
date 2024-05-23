import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { RegisterUserDto } from "./dto/register-user.dto";
import { RedisService } from "src/redis/redis.service";
import { md5 } from "src/utils";

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @Inject(RedisService)
  private redisService: RedisService;

  /**
   * 注册
   * @param user
   * @returns
   */
  async register(user: RegisterUserDto) {
    // 去redis里查用户邮箱
    const captcha = await this.redisService.get(`captcha_${user.email}`);
    // 不存在
    if (!captcha) {
      throw new HttpException("验证码失效", HttpStatus.BAD_REQUEST);
    }
    // 不一样
    if (user.captcha !== captcha) {
      throw new HttpException("验证码不正确", HttpStatus.BAD_REQUEST);
    }
    // 找用户名
    const findUser = await this.userRepository.findOneBy({
      username: user.username,
    });
    // 找到了
    if (findUser) {
      throw new HttpException("用户已存在", HttpStatus.BAD_REQUEST);
    }
    // 新增
    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);
    newUser.email = user.email;
    newUser.nickName = user.nickName;

    try {
      await this.userRepository.save(newUser);
      return "注册成功";
    } catch (e) {
      this.logger.error(e, UserService);
      return "注册失败";
    }
  }
}
