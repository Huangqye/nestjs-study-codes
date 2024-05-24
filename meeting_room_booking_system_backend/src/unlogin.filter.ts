import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";

export class UnLoginException {
  // 类属性
  message: string;
  // 用于在创建类的实例时初始化类的属性
  constructor(message?) {
    this.message = message;
  }
}
// 自定义UnLoginException异常
@Catch(UnLoginException)
export class UnLoginFilter implements ExceptionFilter {
  catch(exception: UnLoginException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response
      .json({
        code: HttpStatus.UNAUTHORIZED,
        message: "fail",
        data: exception.message || "用户未登录",
      })
      .end();
  }
}
